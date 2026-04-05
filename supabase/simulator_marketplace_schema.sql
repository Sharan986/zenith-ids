-- ========================================
-- INDUSTRY SIMULATOR & MARKETPLACE SCHEMA
-- Run in Supabase SQL Editor
-- ========================================

-- ========================================
-- BLOCK 1: Simulator Challenges Table
-- ========================================

CREATE TABLE IF NOT EXISTS simulator_challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  roadmap_id UUID REFERENCES roadmaps(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')) DEFAULT 'intermediate',
  category TEXT, -- e.g., 'algorithms', 'debugging', 'system-design'
  points INT DEFAULT 100,
  time_limit_minutes INT DEFAULT 30,
  -- Challenge content
  problem_statement TEXT NOT NULL,
  starter_code TEXT,
  test_cases JSONB, -- [{input: "", expected_output: "", hidden: false}]
  hints JSONB, -- ["hint1", "hint2"]
  solution TEXT, -- Reference solution (hidden from students)
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE simulator_challenges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view challenges" ON simulator_challenges
  FOR SELECT USING (true);

CREATE POLICY "Industry can create challenges" ON simulator_challenges
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('industry', 'admin'))
  );


-- ========================================
-- BLOCK 2: Simulator Attempts Table
-- ========================================

CREATE TABLE IF NOT EXISTS simulator_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  challenge_id UUID REFERENCES simulator_challenges(id) ON DELETE CASCADE,
  roadmap_id UUID REFERENCES roadmaps(id) ON DELETE CASCADE,
  -- Attempt details
  code_submitted TEXT,
  test_results JSONB, -- [{test_id: 1, passed: true, output: ""}]
  tests_passed INT DEFAULT 0,
  total_tests INT DEFAULT 0,
  score INT DEFAULT 0,
  time_taken_seconds INT,
  -- Status
  status TEXT CHECK (status IN ('in_progress', 'completed', 'timeout')) DEFAULT 'in_progress',
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE simulator_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own attempts" ON simulator_attempts
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create attempts" ON simulator_attempts
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own attempts" ON simulator_attempts
  FOR UPDATE USING (user_id = auth.uid());


-- ========================================
-- BLOCK 3: Readiness Scores Table
-- ========================================

CREATE TABLE IF NOT EXISTS readiness_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  roadmap_id UUID REFERENCES roadmaps(id) ON DELETE CASCADE,
  -- Score breakdown
  task_score INT DEFAULT 0, -- Out of 50
  simulator_score INT DEFAULT 0, -- Out of 30
  quality_score INT DEFAULT 0, -- Out of 20
  total_score INT DEFAULT 0, -- Out of 100
  -- Performance details
  tasks_completed INT DEFAULT 0,
  tasks_total INT DEFAULT 0,
  simulator_challenges_completed INT DEFAULT 0,
  simulator_challenges_total INT DEFAULT 0,
  avg_review_rating DECIMAL(3,2) DEFAULT 0,
  -- Weak areas analysis
  weak_areas JSONB, -- [{skill: "testing", score: 45, recommendation: "..."}]
  strong_areas JSONB, -- [{skill: "react", score: 92}]
  -- Timestamps
  last_calculated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, roadmap_id)
);

ALTER TABLE readiness_scores ENABLE ROW LEVEL SECURITY;

-- Students can view their own scores
CREATE POLICY "Users can view own scores" ON readiness_scores
  FOR SELECT USING (user_id = auth.uid());

-- Industry and colleges can view all scores (for hiring)
CREATE POLICY "Industry can view all scores" ON readiness_scores
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('industry', 'college', 'admin'))
  );

-- System can insert/update (via server actions)
CREATE POLICY "System can manage scores" ON readiness_scores
  FOR ALL USING (true);


-- ========================================
-- BLOCK 4: Job Postings Table
-- ========================================

CREATE TABLE IF NOT EXISTS job_postings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES users(id) ON DELETE CASCADE, -- Industry partner
  -- Job details
  title TEXT NOT NULL,
  description TEXT,
  job_type TEXT CHECK (job_type IN ('full-time', 'part-time', 'internship', 'contract')) DEFAULT 'full-time',
  location TEXT,
  is_remote BOOLEAN DEFAULT false,
  salary_min INT,
  salary_max INT,
  salary_currency TEXT DEFAULT 'INR',
  -- Requirements
  required_roadmaps UUID[], -- Roadmaps the candidate should have completed
  min_readiness_score INT DEFAULT 0, -- Minimum readiness score required
  required_skills TEXT[], -- Additional skill tags
  experience_level TEXT CHECK (experience_level IN ('fresher', 'junior', 'mid', 'senior')) DEFAULT 'fresher',
  -- Status
  status TEXT CHECK (status IN ('draft', 'active', 'paused', 'closed')) DEFAULT 'active',
  applications_count INT DEFAULT 0,
  -- Timestamps
  deadline TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE job_postings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active jobs" ON job_postings
  FOR SELECT USING (status = 'active');

CREATE POLICY "Industry can manage own jobs" ON job_postings
  FOR ALL USING (company_id = auth.uid());


-- ========================================
-- BLOCK 5: Task Openings Table (Paid Tasks)
-- ========================================

CREATE TABLE IF NOT EXISTS task_openings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES users(id) ON DELETE CASCADE,
  -- Task details
  title TEXT NOT NULL,
  description TEXT,
  category TEXT, -- frontend, backend, data, etc.
  deliverables TEXT, -- What the student needs to submit
  -- Compensation
  budget_min INT,
  budget_max INT,
  budget_currency TEXT DEFAULT 'INR',
  payment_type TEXT CHECK (payment_type IN ('fixed', 'hourly')) DEFAULT 'fixed',
  -- Requirements
  required_roadmaps UUID[],
  min_readiness_score INT DEFAULT 0,
  estimated_hours INT,
  deadline TIMESTAMPTZ,
  -- Status
  status TEXT CHECK (status IN ('open', 'in_progress', 'completed', 'cancelled')) DEFAULT 'open',
  assigned_to UUID REFERENCES users(id),
  applications_count INT DEFAULT 0,
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE task_openings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view open tasks" ON task_openings
  FOR SELECT USING (status IN ('open', 'in_progress'));

CREATE POLICY "Industry can manage own tasks" ON task_openings
  FOR ALL USING (company_id = auth.uid());


-- ========================================
-- BLOCK 6: Applications Table
-- ========================================

CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  -- Can apply to either a job or a task opening
  job_id UUID REFERENCES job_postings(id) ON DELETE CASCADE,
  task_opening_id UUID REFERENCES task_openings(id) ON DELETE CASCADE,
  -- Application details
  cover_letter TEXT,
  resume_url TEXT,
  portfolio_url TEXT,
  -- Snapshot of readiness at time of application
  readiness_score_snapshot INT,
  -- Status
  status TEXT CHECK (status IN ('pending', 'reviewed', 'shortlisted', 'rejected', 'hired')) DEFAULT 'pending',
  -- Timestamps
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  -- Ensure applying to either job OR task, not both
  CHECK (
    (job_id IS NOT NULL AND task_opening_id IS NULL) OR
    (job_id IS NULL AND task_opening_id IS NOT NULL)
  )
);

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own applications" ON applications
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create applications" ON applications
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Industry can view applications to their posts" ON applications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM job_postings WHERE id = applications.job_id AND company_id = auth.uid()
    ) OR EXISTS (
      SELECT 1 FROM task_openings WHERE id = applications.task_opening_id AND company_id = auth.uid()
    )
  );

CREATE POLICY "Industry can update application status" ON applications
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM job_postings WHERE id = applications.job_id AND company_id = auth.uid()
    ) OR EXISTS (
      SELECT 1 FROM task_openings WHERE id = applications.task_opening_id AND company_id = auth.uid()
    )
  );


-- ========================================
-- BLOCK 7: Indexes for Performance
-- ========================================

CREATE INDEX IF NOT EXISTS idx_simulator_challenges_roadmap ON simulator_challenges(roadmap_id);
CREATE INDEX IF NOT EXISTS idx_simulator_attempts_user ON simulator_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_simulator_attempts_challenge ON simulator_attempts(challenge_id);
CREATE INDEX IF NOT EXISTS idx_readiness_scores_user ON readiness_scores(user_id);
CREATE INDEX IF NOT EXISTS idx_readiness_scores_roadmap ON readiness_scores(roadmap_id);
CREATE INDEX IF NOT EXISTS idx_readiness_scores_total ON readiness_scores(total_score DESC);
CREATE INDEX IF NOT EXISTS idx_job_postings_status ON job_postings(status);
CREATE INDEX IF NOT EXISTS idx_job_postings_company ON job_postings(company_id);
CREATE INDEX IF NOT EXISTS idx_task_openings_status ON task_openings(status);
CREATE INDEX IF NOT EXISTS idx_applications_user ON applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_job ON applications(job_id);
CREATE INDEX IF NOT EXISTS idx_applications_task ON applications(task_opening_id);
