'use server';

import { createClient } from '@/utils/supabase/server';

// Get simulator challenges for a roadmap
export async function getSimulatorChallenges(roadmapId) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('simulator_challenges')
    .select('id, title, description, difficulty, category, points, time_limit_minutes, problem_statement, starter_code, hints')
    .eq('roadmap_id', roadmapId)
    .order('difficulty', { ascending: true });

  if (error) {
    console.error('Error fetching challenges:', error);
    return { data: [], error: error.message };
  }
  
  return { data: data || [] };
}

// Get a single challenge with full details (for taking the challenge)
export async function getChallenge(challengeId) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return { error: 'Not authenticated' };

  const { data, error } = await supabase
    .from('simulator_challenges')
    .select('id, title, description, difficulty, category, points, time_limit_minutes, problem_statement, starter_code, test_cases, hints, roadmap_id')
    .eq('id', challengeId)
    .single();

  if (error) {
    console.error('Error fetching challenge:', error);
    return { data: null, error: error.message };
  }

  // Filter out hidden test cases for display
  if (data.test_cases) {
    data.visible_test_cases = data.test_cases.filter(tc => !tc.hidden);
    delete data.test_cases; // Don't expose all test cases
  }

  return { data };
}

// Start a simulator attempt
export async function startSimulatorAttempt(challengeId, roadmapId) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return { error: 'Not authenticated' };

  // Check if there's already an in-progress attempt
  const { data: existing } = await supabase
    .from('simulator_attempts')
    .select('id')
    .eq('user_id', user.id)
    .eq('challenge_id', challengeId)
    .eq('status', 'in_progress')
    .single();

  if (existing) {
    return { data: { attemptId: existing.id }, message: 'Resuming existing attempt' };
  }

  // Create new attempt
  const { data, error } = await supabase
    .from('simulator_attempts')
    .insert({
      user_id: user.id,
      challenge_id: challengeId,
      roadmap_id: roadmapId,
      status: 'in_progress',
      started_at: new Date().toISOString()
    })
    .select('id')
    .single();

  if (error) {
    console.error('Error starting attempt:', error);
    return { error: error.message };
  }

  return { data: { attemptId: data.id } };
}

// Submit simulator attempt
export async function submitSimulatorAttempt(attemptId, code, testResults) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return { error: 'Not authenticated' };

  // Get the attempt and challenge details
  const { data: attempt } = await supabase
    .from('simulator_attempts')
    .select('*, simulator_challenges(points, test_cases)')
    .eq('id', attemptId)
    .eq('user_id', user.id)
    .single();

  if (!attempt) return { error: 'Attempt not found' };

  const challenge = attempt.simulator_challenges;
  const totalTests = challenge.test_cases?.length || 0;
  const testsPassed = testResults.filter(r => r.passed).length;
  
  // Calculate score based on tests passed
  const score = totalTests > 0 
    ? Math.round((testsPassed / totalTests) * challenge.points)
    : 0;

  // Calculate time taken
  const startedAt = new Date(attempt.started_at);
  const timeTakenSeconds = Math.round((Date.now() - startedAt.getTime()) / 1000);

  // Update attempt
  const { error } = await supabase
    .from('simulator_attempts')
    .update({
      code_submitted: code,
      test_results: testResults,
      tests_passed: testsPassed,
      total_tests: totalTests,
      score,
      time_taken_seconds: timeTakenSeconds,
      status: 'completed',
      completed_at: new Date().toISOString()
    })
    .eq('id', attemptId);

  if (error) {
    console.error('Error submitting attempt:', error);
    return { error: error.message };
  }

  // Recalculate readiness score
  await calculateReadinessScore(user.id, attempt.roadmap_id);

  // Revalidate roadmap page to show updated progress
  const { revalidatePath } = await import('next/cache');
  revalidatePath(`/roadmap/${attempt.roadmap_id}`);

  return { 
    success: true, 
    data: { score, testsPassed, totalTests, timeTakenSeconds, roadmapId: attempt.roadmap_id }
  };
}

// Get user's simulator progress for a roadmap
export async function getSimulatorProgress(roadmapId) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return { data: null };

  // Get all completed attempts for this roadmap
  const { data: attempts } = await supabase
    .from('simulator_attempts')
    .select('challenge_id, score, tests_passed, total_tests, status')
    .eq('user_id', user.id)
    .eq('roadmap_id', roadmapId)
    .eq('status', 'completed');

  // Get total challenges for this roadmap
  const { data: challenges } = await supabase
    .from('simulator_challenges')
    .select('id, points')
    .eq('roadmap_id', roadmapId);

  const completedChallengeIds = new Set(attempts?.map(a => a.challenge_id) || []);
  const totalPoints = challenges?.reduce((sum, c) => sum + c.points, 0) || 0;
  const earnedPoints = attempts?.reduce((sum, a) => sum + a.score, 0) || 0;
  
  // Add passed field to attempts
  const attemptsWithPassed = (attempts || []).map(a => ({
    ...a,
    passed: a.tests_passed === a.total_tests && a.total_tests > 0
  }));

  return {
    data: {
      completedCount: completedChallengeIds.size,
      totalCount: challenges?.length || 0,
      earnedPoints,
      totalPoints,
      completedChallengeIds: Array.from(completedChallengeIds),
      attempts: attemptsWithPassed
    }
  };
}

// Calculate and update readiness score
export async function calculateReadinessScore(userId, roadmapId) {
  const supabase = await createClient();

  // Get task completion data
  const { data: tasks } = await supabase
    .from('tasks')
    .select('id, points')
    .eq('roadmap_id', roadmapId);

  const { data: submissions } = await supabase
    .from('submissions')
    .select('task_id, score, status')
    .eq('user_id', userId)
    .eq('status', 'approved');

  // Get simulator data
  const { data: challenges } = await supabase
    .from('simulator_challenges')
    .select('id, points')
    .eq('roadmap_id', roadmapId);

  const { data: attempts } = await supabase
    .from('simulator_attempts')
    .select('challenge_id, score')
    .eq('user_id', userId)
    .eq('roadmap_id', roadmapId)
    .eq('status', 'completed');

  // Calculate scores
  const tasksTotal = tasks?.length || 0;
  const tasksCompleted = new Set(submissions?.map(s => s.task_id)).size;
  const taskScore = tasksTotal > 0 ? Math.round((tasksCompleted / tasksTotal) * 50) : 0;

  const simulatorTotal = challenges?.length || 0;
  const simulatorCompleted = new Set(attempts?.map(a => a.challenge_id)).size;
  const maxSimulatorPoints = challenges?.reduce((sum, c) => sum + c.points, 0) || 0;
  const earnedSimulatorPoints = attempts?.reduce((sum, a) => sum + a.score, 0) || 0;
  const simulatorScore = maxSimulatorPoints > 0 
    ? Math.round((earnedSimulatorPoints / maxSimulatorPoints) * 30) 
    : 0;

  // Calculate quality score from review ratings
  const totalTaskPoints = tasks?.reduce((sum, t) => sum + t.points, 0) || 0;
  const earnedTaskPoints = submissions?.reduce((sum, s) => sum + (s.score || 0), 0) || 0;
  const avgRating = totalTaskPoints > 0 ? (earnedTaskPoints / totalTaskPoints) * 5 : 0;
  const qualityScore = Math.round((avgRating / 5) * 20);

  const totalScore = taskScore + simulatorScore + qualityScore;

  // Analyze weak areas by skill
  // TODO: Implement skill-based analysis

  // Upsert readiness score
  const { error } = await supabase
    .from('readiness_scores')
    .upsert({
      user_id: userId,
      roadmap_id: roadmapId,
      task_score: taskScore,
      simulator_score: simulatorScore,
      quality_score: qualityScore,
      total_score: totalScore,
      tasks_completed: tasksCompleted,
      tasks_total: tasksTotal,
      simulator_challenges_completed: simulatorCompleted,
      simulator_challenges_total: simulatorTotal,
      avg_review_rating: avgRating.toFixed(2),
      last_calculated_at: new Date().toISOString()
    }, {
      onConflict: 'user_id,roadmap_id'
    });

  if (error) {
    console.error('Error updating readiness score:', error);
    return { error: error.message };
  }

  return { success: true, data: { totalScore, taskScore, simulatorScore, qualityScore } };
}

// Get readiness score for a user
export async function getReadinessScore(userId, roadmapId) {
  const supabase = await createClient();
  
  // If no userId, get current user's score
  let targetUserId = userId;
  if (!userId) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { data: null };
    targetUserId = user.id;
  }

  const { data, error } = await supabase
    .from('readiness_scores')
    .select('*')
    .eq('user_id', targetUserId)
    .eq('roadmap_id', roadmapId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching readiness score:', error);
    return { data: null, error: error.message };
  }

  // Format the response
  if (data) {
    return {
      data: {
        score: data.total_score,
        taskScore: data.task_score,
        simulatorScore: data.simulator_score,
        qualityScore: data.quality_score,
        tasksCompleted: data.tasks_completed,
        tasksTotal: data.tasks_total,
        challengesCompleted: data.simulator_challenges_completed,
        challengesTotal: data.simulator_challenges_total
      }
    };
  }

  return { data: null };
}

// Get all readiness scores for a user (across roadmaps)
export async function getAllReadinessScores(userId) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('readiness_scores')
    .select(`
      *,
      roadmaps(id, title)
    `)
    .eq('user_id', userId)
    .order('total_score', { ascending: false });

  if (error) {
    console.error('Error fetching readiness scores:', error);
    return { data: [], error: error.message };
  }

  return { data: data || [] };
}

// Get top students by readiness score (for leaderboard)
export async function getReadinessLeaderboard(roadmapId, limit = 20) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('readiness_scores')
    .select(`
      total_score,
      task_score,
      simulator_score,
      quality_score,
      users(id, name, avatar_url)
    `)
    .eq('roadmap_id', roadmapId)
    .order('total_score', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching leaderboard:', error);
    return { data: [], error: error.message };
  }

  return { data: data || [] };
}
