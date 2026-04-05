'use server';

import { createClient } from '@/utils/supabase/server';

export async function getRoadmaps() {
  const supabase = await createClient();
  const { data: roadmaps, error } = await supabase
    .from('roadmaps')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching roadmaps:', error);
    return { data: [], error: error.message };
  }
  return { data: roadmaps || [] };
}

export async function getMyRoadmap() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from('users')
    .select('current_roadmap_id')
    .eq('id', user.id)
    .single();

  if (!profile?.current_roadmap_id) return null;

  const { data: roadmap, error } = await supabase
    .from('roadmaps')
    .select('*')
    .eq('id', profile.current_roadmap_id)
    .single();

  if (error) return { error: error.message, data: null };
  return { data: roadmap };
}

export async function assignRoadmap(roadmapId) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated' };

  const { error } = await supabase
    .from('users')
    .update({ current_roadmap_id: roadmapId })
    .eq('id', user.id);

  if (error) return { error: error.message };
  
  // Revalidate cache to ensure dashboard shows updated roadmap
  const { revalidatePath } = await import('next/cache');
  revalidatePath('/dashboard/student');
  
  return { success: true };
}
