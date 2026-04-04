'use server';

import { createClient } from '@/utils/supabase/server';

export async function getTasks() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('tasks')
    .select('*, roadmaps(title)')
    .order('created_at', { ascending: false });

  if (error) return { error: error.message, data: [] };
  return { data: data || [] };
}

export async function getMyRoadmapTasks() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated', data: [] };

  const { data: profile } = await supabase
    .from('users')
    .select('current_roadmap_id')
    .eq('id', user.id)
    .single();

  if (!profile?.current_roadmap_id) return { data: [] };

  const { data, error } = await supabase
    .from('tasks')
    .select('*, roadmaps(title)')
    .eq('roadmap_id', profile.current_roadmap_id)
    .order('created_at', { ascending: false });

  if (error) return { error: error.message, data: [] };
  return { data: data || [] };
}

export async function createTask(formData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated' };

  const task = {
    title: formData.get('title'),
    description: formData.get('description'),
    type: formData.get('type') || 'platform',
    difficulty: formData.get('difficulty') || 'beginner',
    points: parseInt(formData.get('points') || '10'),
    roadmap_id: formData.get('roadmap_id') || null,
    created_by: user.id,
  };

  const { data, error } = await supabase
    .from('tasks')
    .insert(task)
    .select()
    .single();

  if (error) return { error: error.message };
  return { success: true, data };
}
