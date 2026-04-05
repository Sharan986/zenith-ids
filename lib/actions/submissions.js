'use server';

import { createClient } from '@/utils/supabase/server';
import { triggerAutoReview } from './autoReview';

export async function submitTask(formData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated' };

  const submission = {
    task_id: formData.get('task_id'),
    student_id: user.id,
    content: formData.get('content'),
    status: 'pending',
  };

  const { data, error } = await supabase
    .from('submissions')
    .insert(submission)
    .select()
    .single();

  if (error) return { error: error.message };
  
  // Trigger AI auto-review for platform tasks
  if (data?.id) {
    triggerAutoReview(data.id).catch(console.error);
  }
  
  return { success: true, data };
}

export async function getMySubmissions() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated', data: [] };

  const { data, error } = await supabase
    .from('submissions')
    .select('*, tasks(title, type, difficulty, points)')
    .eq('student_id', user.id)
    .order('created_at', { ascending: false });

  if (error) return { error: error.message, data: [] };
  return { data: data || [] };
}

export async function getSubmissionsForReview({ status = 'pending' } = {}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated', data: [] };

  // Get tasks created by this industry user
  const { data: myTasks } = await supabase
    .from('tasks')
    .select('id')
    .eq('created_by', user.id);

  if (!myTasks?.length) return { data: [] };

  const taskIds = myTasks.map(t => t.id);

  const { data, error } = await supabase
    .from('submissions')
    .select('*, tasks(title, type, difficulty, points), users!submissions_student_id_fkey(name, email, branch)')
    .in('task_id', taskIds)
    .eq('status', status)
    .order('created_at', { ascending: false });

  if (error) return { error: error.message, data: [] };
  return { data: data || [] };
}

export async function reviewSubmission(id, formData) {
  const supabase = await createClient();

  const updates = {
    status: formData.get('status'),
    score: parseInt(formData.get('score') || '0'),
    feedback: formData.get('feedback') || null,
    reviewed_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from('submissions')
    .update(updates)
    .eq('id', id);

  if (error) return { error: error.message };
  return { success: true };
}
