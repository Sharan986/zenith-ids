-- ========================================
-- AUTO-REVIEW SCHEMA UPDATES
-- Run in Supabase SQL Editor
-- ========================================

-- Add auto_review_enabled to tasks (default true for platform tasks)
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS auto_review_enabled BOOLEAN DEFAULT true;

-- Add requirements JSON field to tasks for structured requirements
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS requirements JSONB;

-- Add test_criteria for code evaluation
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS test_criteria JSONB;

-- Add review metadata to submissions
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS reviewed_by TEXT;
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS review_details JSONB;

-- Add needs_revision status (for AI reviews that need human follow-up)
-- Note: This assumes status is a text/varchar field. If it's an enum, you'll need to alter the enum.

-- Update existing platform tasks to enable auto-review
UPDATE tasks SET auto_review_enabled = true WHERE type = 'platform';

-- Update existing industry tasks to disable auto-review (human review preferred)
UPDATE tasks SET auto_review_enabled = false WHERE type = 'industry';

-- Create index for finding pending auto-reviewable submissions
CREATE INDEX IF NOT EXISTS idx_submissions_pending_auto 
ON submissions(status, task_id) 
WHERE status = 'pending';

-- Verify changes
SELECT 
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'tasks' 
  AND column_name IN ('auto_review_enabled', 'requirements', 'test_criteria');

SELECT 
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'submissions' 
  AND column_name IN ('reviewed_by', 'review_details');
