'use server';

import { createClient } from '@/utils/supabase/server';

// Get a roadmap with its skills for React Flow visualization
export async function getRoadmapWithSkills(roadmapId) {
  const supabase = await createClient();
  
  // Get roadmap details
  const { data: roadmap, error: roadmapError } = await supabase
    .from('roadmaps')
    .select('*')
    .eq('id', roadmapId)
    .single();

  if (roadmapError) {
    return { error: roadmapError.message, data: null };
  }

  // Get skills for this roadmap
  const { data: skills, error: skillsError } = await supabase
    .from('skills')
    .select('*')
    .eq('roadmap_id', roadmapId)
    .order('order_index', { ascending: true });

  if (skillsError) {
    // If skills table doesn't exist yet, fallback to curriculum from roadmap
    const fallbackSkills = (roadmap.curriculum || []).map((name, index) => ({
      id: `skill-${index}`,
      name: typeof name === 'string' ? name : name.name || name,
      description: '',
      position_x: 250,
      position_y: 100 + (index * 120),
      order_index: index
    }));
    
    return { 
      data: { 
        roadmap, 
        skills: fallbackSkills,
        usingFallback: true 
      } 
    };
  }

  return { data: { roadmap, skills, usingFallback: false } };
}

// Get tasks for a specific skill
export async function getTasksBySkill(skillId) {
  const supabase = await createClient();
  
  const { data: tasks, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('skill_id', skillId)
    .order('created_at', { ascending: true });

  if (error) {
    return { error: error.message, data: [] };
  }

  return { data: tasks || [] };
}

// Get tasks for a roadmap (when skills don't have task links)
export async function getTasksByRoadmap(roadmapId) {
  const supabase = await createClient();
  
  const { data: tasks, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('roadmap_id', roadmapId)
    .order('created_at', { ascending: true });

  if (error) {
    return { error: error.message, data: [] };
  }

  return { data: tasks || [] };
}

// Get user's progress on a roadmap (submissions)
export async function getUserRoadmapProgress(roadmapId) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { error: 'Not authenticated', data: null };
  }

  // Get all tasks for this roadmap
  const { data: tasks } = await supabase
    .from('tasks')
    .select('id, skill_id, points')
    .eq('roadmap_id', roadmapId);

  if (!tasks || tasks.length === 0) {
    return { data: { submissions: [], completedSkills: [], totalScore: 0, totalPoints: 0 } };
  }

  const taskIds = tasks.map(t => t.id);

  // Get user's submissions for these tasks
  const { data: submissions, error } = await supabase
    .from('submissions')
    .select('*')
    .eq('student_id', user.id)
    .in('task_id', taskIds);

  if (error) {
    return { error: error.message, data: null };
  }

  // Calculate completed skills (all tasks for a skill are approved)
  const skillTaskMap = {};
  tasks.forEach(t => {
    if (t.skill_id) {
      if (!skillTaskMap[t.skill_id]) skillTaskMap[t.skill_id] = [];
      skillTaskMap[t.skill_id].push(t.id);
    }
  });

  const submissionMap = {};
  submissions?.forEach(s => {
    submissionMap[s.task_id] = s;
  });

  const completedSkills = [];
  const inProgressSkills = [];
  
  Object.entries(skillTaskMap).forEach(([skillId, taskIds]) => {
    const allApproved = taskIds.every(tid => submissionMap[tid]?.status === 'approved');
    const anySubmitted = taskIds.some(tid => submissionMap[tid]);
    
    if (allApproved) {
      completedSkills.push(skillId);
    } else if (anySubmitted) {
      inProgressSkills.push(skillId);
    }
  });

  // Calculate total score
  const totalScore = (submissions || [])
    .filter(s => s.status === 'approved')
    .reduce((sum, s) => sum + (s.score || 0), 0);

  const totalPoints = tasks.reduce((sum, t) => sum + (t.points || 0), 0);

  return { 
    data: { 
      submissions: submissions || [], 
      completedSkills, 
      inProgressSkills,
      totalScore,
      totalPoints,
      submissionMap
    } 
  };
}

// Submit work for a task (from roadmap view)
export async function submitTaskWork(taskId, content) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { error: 'Not authenticated', success: false };
  }

  // Check if already submitted
  const { data: existing } = await supabase
    .from('submissions')
    .select('id')
    .eq('task_id', taskId)
    .eq('student_id', user.id)
    .single();

  if (existing) {
    return { error: 'Already submitted this task', success: false };
  }

  const { data, error } = await supabase
    .from('submissions')
    .insert({
      task_id: taskId,
      student_id: user.id,
      content,
      status: 'pending',
      score: 0
    })
    .select()
    .single();

  if (error) {
    return { error: error.message, success: false };
  }

  // Trigger AI auto-review for platform tasks (await it so the review happens)
  let reviewResult = null;
  if (data?.id) {
    try {
      const { triggerAutoReview } = await import('./autoReview');
      reviewResult = await triggerAutoReview(data.id);
      console.log('Auto-review triggered:', reviewResult);
    } catch (err) {
      console.error('Auto-review failed:', err);
    }
  }

  // Return updated status if auto-reviewed
  const finalStatus = reviewResult?.result?.data?.status || 'pending';
  const message = finalStatus === 'approved' 
    ? '✅ Submitted and approved!' 
    : finalStatus === 'needs_revision'
    ? '📝 Submitted! Some improvements needed.'
    : 'Submitted! Review in progress...';

  return { success: true, data: { ...data, status: finalStatus }, message };
}

// Get user's total score across all roadmaps
export async function getUserTotalScore() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { error: 'Not authenticated', data: 0 };
  }

  const { data: submissions, error } = await supabase
    .from('submissions')
    .select('score')
    .eq('student_id', user.id)
    .eq('status', 'approved');

  if (error) {
    return { error: error.message, data: 0 };
  }

  const totalScore = (submissions || []).reduce((sum, s) => sum + (s.score || 0), 0);
  return { data: totalScore };
}

// Create a skill (for roadmap creators)
export async function createSkill({ roadmapId, name, description, positionX, positionY, orderIndex }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { error: 'Not authenticated', success: false };
  }

  const { data, error } = await supabase
    .from('skills')
    .insert({
      roadmap_id: roadmapId,
      name,
      description,
      position_x: positionX || 250,
      position_y: positionY || 100,
      order_index: orderIndex || 0
    })
    .select()
    .single();

  if (error) {
    return { error: error.message, success: false };
  }

  return { success: true, data };
}

// Get all roadmaps with skill counts
export async function getRoadmapsWithSkillCounts() {
  const supabase = await createClient();
  
  const { data: roadmaps, error } = await supabase
    .from('roadmaps')
    .select(`
      *,
      skills(count)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    return { error: error.message, data: [] };
  }

  return { data: roadmaps || [] };
}
