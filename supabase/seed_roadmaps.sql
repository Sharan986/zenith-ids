-- ========================================
-- BLOCK 1: Insert Roadmaps
-- Run this first
-- ========================================

INSERT INTO roadmaps (id, title, description)
VALUES (
  'a1b2c3d4-1111-4444-8888-000000000001',
  'Frontend Developer',
  'Master modern web development with HTML, CSS, JavaScript, and React.'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO roadmaps (id, title, description)
VALUES (
  'a1b2c3d4-2222-4444-8888-000000000002',
  'Data Analyst',
  'Learn to analyze data, build visualizations, and derive insights.'
) ON CONFLICT (id) DO NOTHING;


-- ========================================
-- BLOCK 2: Insert Frontend Skills
-- Run after Block 1
-- ========================================

INSERT INTO skills (id, roadmap_id, name) 
VALUES ('11111111-0001-4000-8000-000000000001', 'a1b2c3d4-1111-4444-8888-000000000001', 'HTML & CSS');

INSERT INTO skills (id, roadmap_id, name) 
VALUES ('11111111-0002-4000-8000-000000000001', 'a1b2c3d4-1111-4444-8888-000000000001', 'JavaScript ES6+');

INSERT INTO skills (id, roadmap_id, name) 
VALUES ('11111111-0003-4000-8000-000000000001', 'a1b2c3d4-1111-4444-8888-000000000001', 'React Fundamentals');

INSERT INTO skills (id, roadmap_id, name) 
VALUES ('11111111-0004-4000-8000-000000000001', 'a1b2c3d4-1111-4444-8888-000000000001', 'State Management');

INSERT INTO skills (id, roadmap_id, name) 
VALUES ('11111111-0005-4000-8000-000000000001', 'a1b2c3d4-1111-4444-8888-000000000001', 'Testing');

INSERT INTO skills (id, roadmap_id, name) 
VALUES ('11111111-0006-4000-8000-000000000001', 'a1b2c3d4-1111-4444-8888-000000000001', 'Next.js');


-- ========================================
-- BLOCK 3: Insert Data Analyst Skills
-- Run after Block 2
-- ========================================

INSERT INTO skills (id, roadmap_id, name) 
VALUES ('22222222-0001-4000-8000-000000000002', 'a1b2c3d4-2222-4444-8888-000000000002', 'SQL Fundamentals');

INSERT INTO skills (id, roadmap_id, name) 
VALUES ('22222222-0002-4000-8000-000000000002', 'a1b2c3d4-2222-4444-8888-000000000002', 'Python for Data');

INSERT INTO skills (id, roadmap_id, name) 
VALUES ('22222222-0003-4000-8000-000000000002', 'a1b2c3d4-2222-4444-8888-000000000002', 'Data Visualization');

INSERT INTO skills (id, roadmap_id, name) 
VALUES ('22222222-0004-4000-8000-000000000002', 'a1b2c3d4-2222-4444-8888-000000000002', 'Statistical Analysis');

INSERT INTO skills (id, roadmap_id, name) 
VALUES ('22222222-0005-4000-8000-000000000002', 'a1b2c3d4-2222-4444-8888-000000000002', 'Dashboard Building');


-- ========================================
-- BLOCK 4: Insert Frontend Tasks
-- Run after Block 3
-- ========================================

INSERT INTO tasks (title, description, type, difficulty, points, roadmap_id, skill_id) 
VALUES ('Build a Portfolio Page', 'Create a responsive portfolio page', 'platform', 'beginner', 15, 'a1b2c3d4-1111-4444-8888-000000000001', '11111111-0001-4000-8000-000000000001');

INSERT INTO tasks (title, description, type, difficulty, points, roadmap_id, skill_id) 
VALUES ('Clone a Landing Page', 'Recreate a modern SaaS landing page', 'platform', 'beginner', 20, 'a1b2c3d4-1111-4444-8888-000000000001', '11111111-0001-4000-8000-000000000001');

INSERT INTO tasks (title, description, type, difficulty, points, roadmap_id, skill_id) 
VALUES ('Build a Todo App', 'Create a todo app with localStorage', 'platform', 'beginner', 20, 'a1b2c3d4-1111-4444-8888-000000000001', '11111111-0002-4000-8000-000000000001');

INSERT INTO tasks (title, description, type, difficulty, points, roadmap_id, skill_id) 
VALUES ('Async API Fetcher', 'Build a weather app using fetch API', 'platform', 'intermediate', 25, 'a1b2c3d4-1111-4444-8888-000000000001', '11111111-0002-4000-8000-000000000001');

INSERT INTO tasks (title, description, type, difficulty, points, roadmap_id, skill_id) 
VALUES ('React Component Library', 'Build reusable components', 'platform', 'intermediate', 30, 'a1b2c3d4-1111-4444-8888-000000000001', '11111111-0003-4000-8000-000000000001');

INSERT INTO tasks (title, description, type, difficulty, points, roadmap_id, skill_id) 
VALUES ('Build a Dashboard', 'Create a data dashboard', 'industry', 'intermediate', 35, 'a1b2c3d4-1111-4444-8888-000000000001', '11111111-0003-4000-8000-000000000001');

INSERT INTO tasks (title, description, type, difficulty, points, roadmap_id, skill_id) 
VALUES ('Shopping Cart', 'Build a cart with state management', 'platform', 'intermediate', 30, 'a1b2c3d4-1111-4444-8888-000000000001', '11111111-0004-4000-8000-000000000001');

INSERT INTO tasks (title, description, type, difficulty, points, roadmap_id, skill_id) 
VALUES ('Test a Component', 'Write unit tests for a form', 'platform', 'intermediate', 25, 'a1b2c3d4-1111-4444-8888-000000000001', '11111111-0005-4000-8000-000000000001');

INSERT INTO tasks (title, description, type, difficulty, points, roadmap_id, skill_id) 
VALUES ('Full Stack Blog', 'Build a blog with Next.js', 'industry', 'advanced', 50, 'a1b2c3d4-1111-4444-8888-000000000001', '11111111-0006-4000-8000-000000000001');

INSERT INTO tasks (title, description, type, difficulty, points, roadmap_id, skill_id) 
VALUES ('E-commerce Site', 'Build an e-commerce site', 'industry', 'advanced', 60, 'a1b2c3d4-1111-4444-8888-000000000001', '11111111-0006-4000-8000-000000000001');


-- ========================================
-- BLOCK 5: Insert Data Analyst Tasks
-- Run after Block 4
-- ========================================

INSERT INTO tasks (title, description, type, difficulty, points, roadmap_id, skill_id) 
VALUES ('SQL Query Challenge', 'Write complex queries', 'platform', 'beginner', 15, 'a1b2c3d4-2222-4444-8888-000000000002', '22222222-0001-4000-8000-000000000002');

INSERT INTO tasks (title, description, type, difficulty, points, roadmap_id, skill_id) 
VALUES ('Database Design', 'Design a normalized schema', 'platform', 'intermediate', 25, 'a1b2c3d4-2222-4444-8888-000000000002', '22222222-0001-4000-8000-000000000002');

INSERT INTO tasks (title, description, type, difficulty, points, roadmap_id, skill_id) 
VALUES ('Data Cleaning Pipeline', 'Clean a messy CSV dataset', 'platform', 'beginner', 20, 'a1b2c3d4-2222-4444-8888-000000000002', '22222222-0002-4000-8000-000000000002');

INSERT INTO tasks (title, description, type, difficulty, points, roadmap_id, skill_id) 
VALUES ('Pandas Analysis', 'Analyze sales data', 'platform', 'intermediate', 30, 'a1b2c3d4-2222-4444-8888-000000000002', '22222222-0002-4000-8000-000000000002');

INSERT INTO tasks (title, description, type, difficulty, points, roadmap_id, skill_id) 
VALUES ('Create Infographic', 'Build multi-chart visualization', 'platform', 'intermediate', 25, 'a1b2c3d4-2222-4444-8888-000000000002', '22222222-0003-4000-8000-000000000002');

INSERT INTO tasks (title, description, type, difficulty, points, roadmap_id, skill_id) 
VALUES ('Interactive Charts', 'Build charts with Plotly', 'platform', 'intermediate', 30, 'a1b2c3d4-2222-4444-8888-000000000002', '22222222-0003-4000-8000-000000000002');

INSERT INTO tasks (title, description, type, difficulty, points, roadmap_id, skill_id) 
VALUES ('A/B Test Analysis', 'Analyze A/B test results', 'industry', 'intermediate', 35, 'a1b2c3d4-2222-4444-8888-000000000002', '22222222-0004-4000-8000-000000000002');

INSERT INTO tasks (title, description, type, difficulty, points, roadmap_id, skill_id) 
VALUES ('Sales Dashboard', 'Build an interactive dashboard', 'industry', 'advanced', 50, 'a1b2c3d4-2222-4444-8888-000000000002', '22222222-0005-4000-8000-000000000002');

INSERT INTO tasks (title, description, type, difficulty, points, roadmap_id, skill_id) 
VALUES ('Executive Report', 'Create automated weekly report', 'industry', 'advanced', 45, 'a1b2c3d4-2222-4444-8888-000000000002', '22222222-0005-4000-8000-000000000002');


-- ========================================
-- BLOCK 6: Verify (optional)
-- ========================================

SELECT 'Roadmaps' as table_name, COUNT(*) as count FROM roadmaps
UNION ALL SELECT 'Skills', COUNT(*) FROM skills
UNION ALL SELECT 'Tasks', COUNT(*) FROM tasks;
