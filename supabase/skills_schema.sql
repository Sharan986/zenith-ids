-- Skills table for interactive roadmaps
-- Run this in Supabase SQL Editor

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  roadmap_id UUID NOT NULL REFERENCES roadmaps(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  -- Position for React Flow visualization
  position_x FLOAT DEFAULT 0,
  position_y FLOAT DEFAULT 0,
  -- Order in the roadmap (for edges)
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add skill_id to tasks table (if not exists)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'tasks' AND column_name = 'skill_id'
  ) THEN
    ALTER TABLE tasks ADD COLUMN skill_id UUID REFERENCES skills(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Enable RLS
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- RLS Policies for skills
CREATE POLICY "Anyone can view skills" ON skills
  FOR SELECT USING (true);

CREATE POLICY "Industry users can create skills" ON skills
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('industry', 'admin')
    )
  );

CREATE POLICY "Owners can update skills" ON skills
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('industry', 'admin')
    )
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_skills_roadmap ON skills(roadmap_id);
CREATE INDEX IF NOT EXISTS idx_tasks_skill ON tasks(skill_id);
