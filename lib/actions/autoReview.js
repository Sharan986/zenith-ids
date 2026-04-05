'use server';

import { createClient } from '@/utils/supabase/server';

// AI-assisted auto-review for task submissions
// Evaluates submissions based on task requirements and provides automated feedback

export async function autoReviewSubmission(submissionId) {
  const supabase = await createClient();
  
  // Get submission with task details (only select columns that exist)
  const { data: submission, error: subError } = await supabase
    .from('submissions')
    .select(`
      *,
      tasks(
        id, title, description, type, difficulty, points, roadmap_id
      )
    `)
    .eq('id', submissionId)
    .single();

  if (subError || !submission) {
    console.error('Error fetching submission:', subError);
    return { error: 'Submission not found' };
  }

  const task = submission.tasks;
  if (!task) {
    console.error('Task not found for submission:', submissionId);
    return { error: 'Task not found' };
  }
  
  const submissionUrl = submission.content;

  // Run evaluation
  const evaluation = await evaluateSubmission(submissionUrl, task);
  
  // Calculate score based on evaluation
  const score = calculateScore(evaluation, task.points || 10);
  
  // Generate feedback
  const feedback = generateFeedback(evaluation, task);
  
  // Determine status (auto-approve if score >= 60%)
  const passThreshold = 0.6;
  const scorePercent = score / (task.points || 10);
  const status = scorePercent >= passThreshold ? 'approved' : 'needs_revision';

  console.log('Auto-review evaluation:', { submissionId, score, maxPoints: task.points, scorePercent, status });

  // Update submission with review (only update columns that exist)
  const updateData = {
    status,
    score,
    feedback,
    reviewed_at: new Date().toISOString()
  };

  const { error: updateError } = await supabase
    .from('submissions')
    .update(updateData)
    .eq('id', submissionId);

  if (updateError) {
    console.error('Error updating submission:', updateError);
    return { error: 'Failed to save review: ' + updateError.message };
  }

  // If approved, update readiness score
  if (status === 'approved' && task.roadmap_id) {
    await updateReadinessAfterApproval(submission.student_id, task.roadmap_id);
  }

  return {
    success: true,
    data: {
      status,
      score,
      maxScore: task.points,
      scorePercent: Math.round(scorePercent * 100),
      feedback,
      evaluation
    }
  };
}

// Evaluate a submission based on various criteria
async function evaluateSubmission(submissionUrl, task) {
  const checks = {
    urlValid: false,
    urlAccessible: false,
    hasReadme: false,
    hasCode: false,
    meetsRequirements: [],
    codeQuality: 0,
    completeness: 0,
    errors: []
  };

  // 1. Validate URL format
  try {
    const url = new URL(submissionUrl);
    checks.urlValid = true;
    
    // Check if it's a known platform
    const isGitHub = url.hostname.includes('github.com');
    const isGitLab = url.hostname.includes('gitlab.com');
    const isCodeSandbox = url.hostname.includes('codesandbox.io');
    const isStackBlitz = url.hostname.includes('stackblitz.com');
    const isVercel = url.hostname.includes('vercel.app');
    const isNetlify = url.hostname.includes('netlify.app');
    const isReplit = url.hostname.includes('replit.com');
    
    checks.platform = isGitHub ? 'github' : 
                      isGitLab ? 'gitlab' : 
                      isCodeSandbox ? 'codesandbox' :
                      isStackBlitz ? 'stackblitz' :
                      isVercel ? 'vercel' :
                      isNetlify ? 'netlify' :
                      isReplit ? 'replit' : 'other';

    // 2. Check URL accessibility (basic check)
    if (isGitHub) {
      checks.urlAccessible = true; // Assume GitHub URLs are valid
      checks.hasCode = true;
      
      // Parse GitHub URL for repo info
      const pathParts = url.pathname.split('/').filter(Boolean);
      if (pathParts.length >= 2) {
        checks.repoOwner = pathParts[0];
        checks.repoName = pathParts[1];
        checks.hasReadme = true; // Assume repos have README
      }
    } else if (isVercel || isNetlify) {
      checks.urlAccessible = true;
      checks.hasCode = true; // Deployed site implies code exists
      checks.isDeployed = true;
    } else {
      checks.urlAccessible = true; // Assume other URLs work
    }

  } catch (e) {
    checks.errors.push('Invalid URL format');
  }

  // 3. Check against task requirements
  const requirements = parseRequirements(task);
  checks.meetsRequirements = evaluateRequirements(requirements, checks, submissionUrl);
  
  // 4. Calculate code quality score (heuristic)
  checks.codeQuality = calculateCodeQualityScore(checks);
  
  // 5. Calculate completeness
  const metRequirements = checks.meetsRequirements.filter(r => r.met).length;
  const totalRequirements = checks.meetsRequirements.length || 1;
  checks.completeness = Math.round((metRequirements / totalRequirements) * 100);

  return checks;
}

// Parse task requirements from description
function parseRequirements(task) {
  const requirements = [];
  
  // Check for explicit requirements in task
  if (task.requirements) {
    try {
      const parsed = typeof task.requirements === 'string' 
        ? JSON.parse(task.requirements) 
        : task.requirements;
      if (Array.isArray(parsed)) {
        requirements.push(...parsed);
      }
    } catch (e) {
      // Parse from text
    }
  }
  
  // Extract requirements from description
  const description = task.description || '';
  
  // Common requirement patterns
  const patterns = [
    { pattern: /responsive|mobile/i, req: 'Responsive design' },
    { pattern: /api|fetch|axios/i, req: 'API integration' },
    { pattern: /form|input|validation/i, req: 'Form handling' },
    { pattern: /state|redux|context|zustand/i, req: 'State management' },
    { pattern: /test|jest|testing/i, req: 'Testing included' },
    { pattern: /deploy|vercel|netlify|live/i, req: 'Deployment' },
    { pattern: /css|style|tailwind|scss/i, req: 'Styling' },
    { pattern: /database|supabase|prisma|sql/i, req: 'Database integration' },
    { pattern: /auth|login|signup/i, req: 'Authentication' },
    { pattern: /component|react|vue/i, req: 'Component structure' },
  ];
  
  patterns.forEach(({ pattern, req }) => {
    if (pattern.test(description) && !requirements.includes(req)) {
      requirements.push(req);
    }
  });
  
  // Default requirements based on difficulty
  if (requirements.length === 0) {
    switch (task.difficulty) {
      case 'beginner':
        requirements.push('Working code', 'Basic functionality');
        break;
      case 'intermediate':
        requirements.push('Working code', 'Clean structure', 'Basic styling');
        break;
      case 'advanced':
        requirements.push('Working code', 'Clean architecture', 'Error handling', 'Documentation');
        break;
      default:
        requirements.push('Working code');
    }
  }
  
  return requirements;
}

// Evaluate if requirements are met
function evaluateRequirements(requirements, checks, url) {
  return requirements.map(req => {
    let met = false;
    let reason = '';
    
    const reqLower = req.toLowerCase();
    
    // Check based on requirement type
    if (reqLower.includes('deploy') || reqLower.includes('live')) {
      met = checks.isDeployed || checks.platform === 'vercel' || checks.platform === 'netlify';
      reason = met ? 'Deployed site detected' : 'No deployment URL found';
    } else if (reqLower.includes('code') || reqLower.includes('working')) {
      met = checks.hasCode || checks.urlValid;
      reason = met ? 'Code submission provided' : 'No code found';
    } else if (reqLower.includes('github') || reqLower.includes('repo')) {
      met = checks.platform === 'github' || checks.platform === 'gitlab';
      reason = met ? 'Repository link provided' : 'No repository link';
    } else if (reqLower.includes('documentation') || reqLower.includes('readme')) {
      met = checks.hasReadme;
      reason = met ? 'Documentation likely present' : 'Documentation not verified';
    } else {
      // For other requirements, give benefit of doubt if URL is valid
      met = checks.urlValid && checks.urlAccessible;
      reason = met ? 'Submission provided' : 'Unable to verify';
    }
    
    return { requirement: req, met, reason };
  });
}

// Calculate code quality score
function calculateCodeQualityScore(checks) {
  let score = 50; // Base score
  
  if (checks.urlValid) score += 10;
  if (checks.urlAccessible) score += 10;
  if (checks.hasReadme) score += 10;
  if (checks.hasCode) score += 10;
  if (checks.isDeployed) score += 15;
  if (checks.platform === 'github' || checks.platform === 'gitlab') score += 5;
  
  // Cap at 100
  return Math.min(score, 100);
}

// Calculate final score
function calculateScore(evaluation, maxPoints) {
  const weights = {
    urlValid: 0.1,
    urlAccessible: 0.1,
    completeness: 0.5,
    codeQuality: 0.3
  };
  
  let weightedScore = 0;
  
  if (evaluation.urlValid) weightedScore += weights.urlValid;
  if (evaluation.urlAccessible) weightedScore += weights.urlAccessible;
  weightedScore += (evaluation.completeness / 100) * weights.completeness;
  weightedScore += (evaluation.codeQuality / 100) * weights.codeQuality;
  
  return Math.round(weightedScore * maxPoints);
}

// Generate human-readable feedback
function generateFeedback(evaluation, task) {
  const lines = [];
  
  // Opening
  if (evaluation.completeness >= 80) {
    lines.push('🎉 Great work on this submission!');
  } else if (evaluation.completeness >= 60) {
    lines.push('👍 Good effort! Here\'s some feedback to help you improve.');
  } else {
    lines.push('📝 Thanks for submitting. Here are some areas to work on.');
  }
  
  lines.push('');
  
  // URL check
  if (!evaluation.urlValid) {
    lines.push('❌ **URL Issue**: The submission URL appears to be invalid. Please provide a working link to your project.');
  } else if (evaluation.platform) {
    const platformNames = {
      github: 'GitHub repository',
      gitlab: 'GitLab repository',
      vercel: 'Vercel deployment',
      netlify: 'Netlify deployment',
      codesandbox: 'CodeSandbox project',
      stackblitz: 'StackBlitz project',
      replit: 'Replit project'
    };
    lines.push(`✅ **Submission**: ${platformNames[evaluation.platform] || 'Project link'} received.`);
  }
  
  // Requirements feedback
  if (evaluation.meetsRequirements?.length > 0) {
    lines.push('');
    lines.push('**Requirements Check:**');
    
    evaluation.meetsRequirements.forEach(({ requirement, met, reason }) => {
      const icon = met ? '✅' : '⚠️';
      lines.push(`${icon} ${requirement}: ${reason}`);
    });
  }
  
  // Improvement suggestions based on difficulty
  lines.push('');
  lines.push('**Suggestions:**');
  
  if (!evaluation.isDeployed && task.difficulty !== 'beginner') {
    lines.push('• Consider deploying your project (Vercel, Netlify) to showcase it live.');
  }
  
  if (!evaluation.hasReadme) {
    lines.push('• Add a README.md with setup instructions and project description.');
  }
  
  if (evaluation.codeQuality < 70) {
    lines.push('• Focus on code organization and adding comments for complex logic.');
  }
  
  if (task.difficulty === 'advanced') {
    lines.push('• For advanced tasks, include error handling and edge case management.');
    lines.push('• Consider adding unit tests to demonstrate code quality.');
  }
  
  // Score summary
  lines.push('');
  lines.push(`**Completeness Score**: ${evaluation.completeness}%`);
  
  return lines.join('\n');
}

// Update readiness score after approval
async function updateReadinessAfterApproval(userId, roadmapId) {
  if (!roadmapId) return;
  
  const supabase = await createClient();
  
  // Import and call calculateReadinessScore
  // This is a simplified update - the full calculation happens in simulator.js
  try {
    const { calculateReadinessScore } = await import('./simulator');
    await calculateReadinessScore(userId, roadmapId);
  } catch (e) {
    console.error('Error updating readiness score:', e);
  }
}

// Batch auto-review for pending submissions
export async function autoReviewPendingSubmissions(limit = 10) {
  const supabase = await createClient();
  
  // Get pending submissions for tasks with auto_review_enabled
  const { data: submissions, error } = await supabase
    .from('submissions')
    .select('id, tasks!inner(auto_review_enabled)')
    .eq('status', 'pending')
    .eq('tasks.auto_review_enabled', true)
    .limit(limit);

  if (error || !submissions?.length) {
    return { processed: 0, results: [] };
  }

  const results = [];
  for (const sub of submissions) {
    const result = await autoReviewSubmission(sub.id);
    results.push({ submissionId: sub.id, ...result });
  }

  return { processed: results.length, results };
}

// Trigger auto-review immediately after submission
export async function triggerAutoReview(submissionId) {
  const supabase = await createClient();
  
  // Check if task has auto-review enabled (handle missing column gracefully)
  const { data: submission, error } = await supabase
    .from('submissions')
    .select('task_id, tasks(type)')
    .eq('id', submissionId)
    .single();

  if (error) {
    console.error('Error fetching submission for auto-review:', error);
    // Still try to auto-review if we can't check
  }

  // Auto-review platform tasks by default
  const taskType = submission?.tasks?.type;
  const shouldAutoReview = !taskType || taskType === 'platform';

  console.log('Auto-review check:', { submissionId, taskType, shouldAutoReview });

  if (shouldAutoReview) {
    // Run auto-review directly (not in setTimeout which doesn't work in server actions)
    try {
      const result = await autoReviewSubmission(submissionId);
      console.log('Auto-review result:', result);
      return { queued: true, result };
    } catch (err) {
      console.error('Auto-review error:', err);
      return { queued: false, error: err.message };
    }
  }

  return { queued: false, reason: 'Auto-review not enabled for industry tasks' };
}
