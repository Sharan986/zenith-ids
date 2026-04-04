'use server';

import { createClient } from '@/utils/supabase/server';

export async function getDashboardStats() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated', data: null };

  const role = user.user_metadata?.role || 'student';

  if (role === 'student') {
    const { data: submissions } = await supabase
      .from('submissions')
      .select('status, score, tasks(points)')
      .eq('student_id', user.id);

    const completed = submissions?.filter(s => s.status === 'approved') || [];
    const pending = submissions?.filter(s => s.status === 'pending') || [];
    const totalScore = completed.reduce((sum, s) => sum + (s.score || 0), 0);

    const { count: availableCount } = await supabase
      .from('tasks')
      .select('*', { count: 'exact', head: true });

    return {
      data: {
        totalScore,
        tasksCompleted: completed.length,
        tasksPending: pending.length,
        tasksAvailable: availableCount || 0,
      }
    };
  }

  if (role === 'industry') {
    const { data: myTasks } = await supabase
      .from('tasks')
      .select('id')
      .eq('created_by', user.id);

    const taskIds = myTasks?.map(t => t.id) || [];

    let pendingReviews = 0;
    if (taskIds.length > 0) {
      const { count } = await supabase
        .from('submissions')
        .select('*', { count: 'exact', head: true })
        .in('task_id', taskIds)
        .eq('status', 'pending');
      pendingReviews = count || 0;
    }

    const { count: totalStudents } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'student');

    return {
      data: {
        myTasks: myTasks?.length || 0,
        pendingReviews,
        totalStudents: totalStudents || 0,
      }
    };
  }

  if (role === 'college') {
    const { count: totalStudents } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'student');

    return {
      data: {
        totalStudents: totalStudents || 0,
      }
    };
  }

  return { data: {} };
}

export async function getStudentScore(userId) {
  const supabase = await createClient();
  const { data: submissions } = await supabase
    .from('submissions')
    .select('score, status')
    .eq('student_id', userId)
    .eq('status', 'approved');

  const totalScore = submissions?.reduce((sum, s) => sum + (s.score || 0), 0) || 0;
  return { data: { totalScore, tasksCompleted: submissions?.length || 0 } };
}

export async function getStudentLeaderboard() {
  const supabase = await createClient();

  const { data: students } = await supabase
    .from('users')
    .select('id, name, email, branch, interests')
    .eq('role', 'student');

  if (!students?.length) return { data: [] };

  const leaderboard = await Promise.all(
    students.map(async (student) => {
      const { data: submissions } = await supabase
        .from('submissions')
        .select('score, status')
        .eq('student_id', student.id)
        .eq('status', 'approved');

      const totalScore = submissions?.reduce((sum, s) => sum + (s.score || 0), 0) || 0;
      const tasksCompleted = submissions?.length || 0;

      return { ...student, totalScore, tasksCompleted };
    })
  );

  return { data: leaderboard.sort((a, b) => b.totalScore - a.totalScore) };
}

export async function getStudentProfile(userId) {
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from('users')
    .select('*, roadmaps(title)')
    .eq('id', userId)
    .single();

  const { data: submissions } = await supabase
    .from('submissions')
    .select('*, tasks(title, type, difficulty, points)')
    .eq('student_id', userId)
    .order('created_at', { ascending: false });

  const completed = submissions?.filter(s => s.status === 'approved') || [];
  const totalScore = completed.reduce((sum, s) => sum + (s.score || 0), 0);

  return {
    data: {
      ...profile,
      submissions: submissions || [],
      totalScore,
      tasksCompleted: completed.length,
    }
  };
}

export async function getPublicStudentProfile(userId) {
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from('users')
    .select('id, name, email, branch, interests, subscription_tier, current_roadmap_id, roadmaps(title)')
    .eq('id', userId)
    .single();

  if (!profile) return { error: 'Student not found', data: null };

  const { data: submissions } = await supabase
    .from('submissions')
    .select('*, tasks(title, type, difficulty, points)')
    .eq('student_id', userId)
    .order('created_at', { ascending: false });

  const completed = submissions?.filter(s => s.status === 'approved') || [];
  const pending = submissions?.filter(s => s.status === 'pending') || [];
  const totalScore = completed.reduce((sum, s) => sum + (s.score || 0), 0);

  return {
    data: {
      ...profile,
      completedSubmissions: completed,
      pendingSubmissions: pending,
      totalScore,
      tasksCompleted: completed.length,
    }
  };
}
