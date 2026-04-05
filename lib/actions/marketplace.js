'use server';

import { createClient } from '@/utils/supabase/server';

// ==========================================
// JOB POSTINGS
// ==========================================

// Get all active job postings
export async function getJobPostings(filters = {}) {
  const supabase = await createClient();
  
  let query = supabase
    .from('job_postings')
    .select(`
      *,
      users!job_postings_company_id_fkey(id, name, avatar_url, company_name)
    `)
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  if (filters.jobType) {
    query = query.eq('job_type', filters.jobType);
  }
  if (filters.experienceLevel) {
    query = query.eq('experience_level', filters.experienceLevel);
  }
  if (filters.isRemote !== undefined) {
    query = query.eq('is_remote', filters.isRemote);
  }
  if (filters.minSalary) {
    query = query.gte('salary_min', filters.minSalary);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching job postings:', error);
    return { data: [], error: error.message };
  }

  return { data: data || [] };
}

// Get a single job posting
export async function getJobPosting(jobId) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('job_postings')
    .select(`
      *,
      users!job_postings_company_id_fkey(id, name, avatar_url, company_name)
    `)
    .eq('id', jobId)
    .single();

  if (error) {
    console.error('Error fetching job posting:', error);
    return { data: null, error: error.message };
  }

  return { data };
}

// Create a job posting (industry only)
export async function createJobPosting(formData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return { error: 'Not authenticated' };

  // Verify user is industry partner
  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'industry' && profile?.role !== 'admin') {
    return { error: 'Only industry partners can post jobs' };
  }

  const { data, error } = await supabase
    .from('job_postings')
    .insert({
      company_id: user.id,
      title: formData.title,
      description: formData.description,
      job_type: formData.jobType || 'full-time',
      location: formData.location,
      is_remote: formData.isRemote || false,
      salary_min: formData.salaryMin,
      salary_max: formData.salaryMax,
      salary_currency: formData.salaryCurrency || 'INR',
      required_roadmaps: formData.requiredRoadmaps || [],
      min_readiness_score: formData.minReadinessScore || 0,
      required_skills: formData.requiredSkills || [],
      experience_level: formData.experienceLevel || 'fresher',
      deadline: formData.deadline,
      status: 'active'
    })
    .select('id')
    .single();

  if (error) {
    console.error('Error creating job posting:', error);
    return { error: error.message };
  }

  return { success: true, data: { jobId: data.id } };
}

// Update job posting status
export async function updateJobStatus(jobId, status) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return { error: 'Not authenticated' };

  const { error } = await supabase
    .from('job_postings')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', jobId)
    .eq('company_id', user.id);

  if (error) {
    console.error('Error updating job status:', error);
    return { error: error.message };
  }

  return { success: true };
}

// Get jobs posted by current industry user
export async function getMyJobPostings() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return { data: [] };

  const { data, error } = await supabase
    .from('job_postings')
    .select('*, applications(count)')
    .eq('company_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching my job postings:', error);
    return { data: [], error: error.message };
  }

  return { data: data || [] };
}

// ==========================================
// TASK OPENINGS (Paid Gigs)
// ==========================================

// Get all open task openings
export async function getTaskOpenings(filters = {}) {
  const supabase = await createClient();
  
  let query = supabase
    .from('task_openings')
    .select(`
      *,
      users!task_openings_company_id_fkey(id, name, avatar_url, company_name)
    `)
    .eq('status', 'open')
    .order('created_at', { ascending: false });

  if (filters.category) {
    query = query.eq('category', filters.category);
  }
  if (filters.minBudget) {
    query = query.gte('budget_min', filters.minBudget);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching task openings:', error);
    return { data: [], error: error.message };
  }

  return { data: data || [] };
}

// Get a single task opening
export async function getTaskOpening(taskId) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('task_openings')
    .select(`
      *,
      users!task_openings_company_id_fkey(id, name, avatar_url, company_name)
    `)
    .eq('id', taskId)
    .single();

  if (error) {
    console.error('Error fetching task opening:', error);
    return { data: null, error: error.message };
  }

  return { data };
}

// Create a task opening (industry only)
export async function createTaskOpening(formData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return { error: 'Not authenticated' };

  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'industry' && profile?.role !== 'admin') {
    return { error: 'Only industry partners can post task openings' };
  }

  const { data, error } = await supabase
    .from('task_openings')
    .insert({
      company_id: user.id,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      deliverables: formData.deliverables,
      budget_min: formData.budgetMin,
      budget_max: formData.budgetMax,
      budget_currency: formData.budgetCurrency || 'INR',
      payment_type: formData.paymentType || 'fixed',
      required_roadmaps: formData.requiredRoadmaps || [],
      min_readiness_score: formData.minReadinessScore || 0,
      estimated_hours: formData.estimatedHours,
      deadline: formData.deadline,
      status: 'open'
    })
    .select('id')
    .single();

  if (error) {
    console.error('Error creating task opening:', error);
    return { error: error.message };
  }

  return { success: true, data: { taskId: data.id } };
}

// ==========================================
// APPLICATIONS
// ==========================================

// Apply to a job or task
export async function applyToOpportunity(type, opportunityId, formData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return { error: 'Not authenticated' };

  // Get current readiness score
  let readinessScore = 0;
  const { data: scores } = await supabase
    .from('readiness_scores')
    .select('total_score')
    .eq('user_id', user.id)
    .order('total_score', { ascending: false })
    .limit(1);

  if (scores?.length) {
    readinessScore = scores[0].total_score;
  }

  // Check if already applied
  const existingQuery = supabase
    .from('applications')
    .select('id')
    .eq('user_id', user.id);

  if (type === 'job') {
    existingQuery.eq('job_id', opportunityId);
  } else {
    existingQuery.eq('task_opening_id', opportunityId);
  }

  const { data: existing } = await existingQuery.single();
  if (existing) {
    return { error: 'You have already applied to this opportunity' };
  }

  // Create application
  const applicationData = {
    user_id: user.id,
    cover_letter: formData.coverLetter,
    resume_url: formData.resumeUrl,
    portfolio_url: formData.portfolioUrl,
    readiness_score_snapshot: readinessScore,
    status: 'pending'
  };

  if (type === 'job') {
    applicationData.job_id = opportunityId;
  } else {
    applicationData.task_opening_id = opportunityId;
  }

  const { data, error } = await supabase
    .from('applications')
    .insert(applicationData)
    .select('id')
    .single();

  if (error) {
    console.error('Error creating application:', error);
    return { error: error.message };
  }

  // Update application count
  const countTable = type === 'job' ? 'job_postings' : 'task_openings';
  await supabase.rpc('increment_applications_count', {
    table_name: countTable,
    row_id: opportunityId
  });

  return { success: true, data: { applicationId: data.id } };
}

// Get user's applications
export async function getMyApplications() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return { data: [] };

  const { data, error } = await supabase
    .from('applications')
    .select(`
      *,
      job_postings(id, title, company_id, users!job_postings_company_id_fkey(name, company_name)),
      task_openings(id, title, company_id, users!task_openings_company_id_fkey(name, company_name))
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching applications:', error);
    return { data: [], error: error.message };
  }

  return { data: data || [] };
}

// Get applications for a job/task (industry view)
export async function getApplicationsForOpportunity(type, opportunityId) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return { data: [] };

  let query = supabase
    .from('applications')
    .select(`
      *,
      users(id, name, avatar_url, branch, interests)
    `)
    .order('readiness_score_snapshot', { ascending: false });

  if (type === 'job') {
    query = query.eq('job_id', opportunityId);
  } else {
    query = query.eq('task_opening_id', opportunityId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching applications:', error);
    return { data: [], error: error.message };
  }

  return { data: data || [] };
}

// Update application status (industry action)
export async function updateApplicationStatus(applicationId, status) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return { error: 'Not authenticated' };

  const { error } = await supabase
    .from('applications')
    .update({ 
      status, 
      reviewed_at: new Date().toISOString() 
    })
    .eq('id', applicationId);

  if (error) {
    console.error('Error updating application:', error);
    return { error: error.message };
  }

  return { success: true };
}

// ==========================================
// CANDIDATE SEARCH (for industry)
// ==========================================

// Search candidates by readiness score
export async function searchCandidates(filters = {}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return { data: [] };

  // Verify user is industry or college
  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!['industry', 'college', 'admin'].includes(profile?.role)) {
    return { error: 'Access denied' };
  }

  let query = supabase
    .from('readiness_scores')
    .select(`
      *,
      users(id, name, avatar_url, branch, college, interests),
      roadmaps(id, title)
    `)
    .order('total_score', { ascending: false });

  if (filters.minScore) {
    query = query.gte('total_score', filters.minScore);
  }
  if (filters.roadmapId) {
    query = query.eq('roadmap_id', filters.roadmapId);
  }
  if (filters.limit) {
    query = query.limit(filters.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error searching candidates:', error);
    return { data: [], error: error.message };
  }

  return { data: data || [] };
}
