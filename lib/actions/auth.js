'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function signUp(formData) {
  const supabase = await createClient();

  const email = formData.get('email');
  const password = formData.get('password');
  const name = formData.get('name');
  const role = formData.get('role');

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name, role },
    },
  });

  if (error) {
    // Try upsert fallback for existing users
    if (error.message?.includes('already registered')) {
      return { error: 'This email is already registered. Please log in.' };
    }
    return { error: error.message };
  }

  // Insert into users table as fallback (trigger should handle this)
  if (data?.user) {
    await supabase.from('users').upsert({
      id: data.user.id,
      email,
      name,
      role,
    }, { onConflict: 'id' });
  }

  return { success: true, role };
}

export async function signIn(formData) {
  const supabase = await createClient();

  const email = formData.get('email');
  const password = formData.get('password');

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  // Get user role
  const role = data.user?.user_metadata?.role || 'student';
  return { success: true, role };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/');
}

export async function getCurrentUser() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) return null;

  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  return {
    ...user,
    profile: profile || {
      id: user.id,
      email: user.email,
      name: user.user_metadata?.name || 'User',
      role: user.user_metadata?.role || 'student',
      subscription_tier: 'free',
    },
  };
}

export async function updateProfile(formData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated' };

  const updates = {
    name: formData.get('name'),
    branch: formData.get('branch'),
    interests: formData.get('interests')?.split(',').map(s => s.trim()).filter(Boolean) || [],
  };

  const { error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', user.id);

  if (error) return { error: error.message };
  return { success: true };
}

export async function updateOnboarding({ branch, interests, currentRoadmapId, orgName }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated' };

  const updates = {};
  if (branch) updates.branch = branch;
  if (interests) updates.interests = interests;
  if (currentRoadmapId) updates.current_roadmap_id = currentRoadmapId;
  if (orgName) updates.name = orgName;

  const { error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', user.id);

  if (error) return { error: error.message };
  return { success: true };
}

export async function upgradeToPro() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated' };

  const { error } = await supabase
    .from('users')
    .update({ subscription_tier: 'pro' })
    .eq('id', user.id);

  if (error) return { error: error.message };
  return { success: true };
}
