-- ========================================
-- SIMULATOR CHALLENGES SEED DATA
-- Run in Supabase SQL Editor after schema
-- ========================================

-- ========================================
-- BLOCK 1: Frontend Developer Challenges
-- ========================================

INSERT INTO simulator_challenges (id, roadmap_id, title, description, difficulty, category, points, time_limit_minutes, problem_statement, starter_code, test_cases, hints)
VALUES (
  '22222222-0001-4000-8000-000000000001',
  'a1b2c3d4-1111-4444-8888-000000000001',
  'Array Filter Challenge',
  'Filter an array based on conditions',
  'beginner',
  'javascript',
  50,
  15,
  'Write a function `filterEven` that takes an array of numbers and returns a new array containing only the even numbers.

Example:
- Input: [1, 2, 3, 4, 5, 6]
- Output: [2, 4, 6]',
  'function filterEven(numbers) {
  // Your code here
}',
  '[{"input": "[1, 2, 3, 4, 5, 6]", "expected_output": "[2, 4, 6]", "hidden": false}, {"input": "[10, 15, 20, 25]", "expected_output": "[10, 20]", "hidden": false}, {"input": "[1, 3, 5, 7]", "expected_output": "[]", "hidden": true}]',
  '["Use the filter() method", "Check if number % 2 === 0"]'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO simulator_challenges (id, roadmap_id, title, description, difficulty, category, points, time_limit_minutes, problem_statement, starter_code, test_cases, hints)
VALUES (
  '22222222-0002-4000-8000-000000000001',
  'a1b2c3d4-1111-4444-8888-000000000001',
  'Object Manipulation',
  'Transform and merge objects',
  'intermediate',
  'javascript',
  75,
  20,
  'Write a function `mergeUserData` that takes two objects (user profile and user settings) and returns a merged object with all properties.

Example:
- Input: {name: "John", age: 25}, {theme: "dark", notifications: true}
- Output: {name: "John", age: 25, theme: "dark", notifications: true}',
  'function mergeUserData(profile, settings) {
  // Your code here
}',
  '[{"input": "{name: \"John\", age: 25}, {theme: \"dark\"}", "expected_output": "{name: \"John\", age: 25, theme: \"dark\"}", "hidden": false}, {"input": "{}, {active: true}", "expected_output": "{active: true}", "hidden": true}]',
  '["Use the spread operator (...)", "Object.assign() also works"]'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO simulator_challenges (id, roadmap_id, title, description, difficulty, category, points, time_limit_minutes, problem_statement, starter_code, test_cases, hints)
VALUES (
  '22222222-0003-4000-8000-000000000001',
  'a1b2c3d4-1111-4444-8888-000000000001',
  'Async Data Fetcher',
  'Handle async operations correctly',
  'intermediate',
  'javascript',
  100,
  25,
  'Write an async function `fetchUserPosts` that:
1. Takes a userId
2. Simulates fetching user data (use the provided mockFetch)
3. Returns an object with {user, posts} or throws an error if user not found

The mockFetch function is provided for you.',
  'const mockFetch = (userId) => {
  const users = {1: {name: "Alice"}, 2: {name: "Bob"}};
  const posts = {1: ["Post A", "Post B"], 2: ["Post C"]};
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (users[userId]) {
        resolve({user: users[userId], posts: posts[userId]});
      } else {
        reject(new Error("User not found"));
      }
    }, 100);
  });
};

async function fetchUserPosts(userId) {
  // Your code here
}',
  '[{"input": "1", "expected_output": "{user: {name: \"Alice\"}, posts: [\"Post A\", \"Post B\"]}", "hidden": false}, {"input": "2", "expected_output": "{user: {name: \"Bob\"}, posts: [\"Post C\"]}", "hidden": false}, {"input": "99", "expected_output": "Error: User not found", "hidden": true}]',
  '["Use try/catch for error handling", "Use await with mockFetch"]'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO simulator_challenges (id, roadmap_id, title, description, difficulty, category, points, time_limit_minutes, problem_statement, starter_code, test_cases, hints)
VALUES (
  '22222222-0004-4000-8000-000000000001',
  'a1b2c3d4-1111-4444-8888-000000000001',
  'React Component Logic',
  'Implement component state logic',
  'advanced',
  'react',
  150,
  30,
  'Write a custom React hook `useCounter` that:
1. Accepts an initial value (default 0)
2. Returns: [count, increment, decrement, reset]
3. increment/decrement change count by 1
4. reset returns to initial value

Example usage:
const [count, increment, decrement, reset] = useCounter(10);',
  'function useCounter(initialValue = 0) {
  // Your code here
  // Return [count, increment, decrement, reset]
}',
  '[{"input": "useCounter(0) -> increment() -> count", "expected_output": "1", "hidden": false}, {"input": "useCounter(10) -> decrement() -> count", "expected_output": "9", "hidden": false}, {"input": "useCounter(5) -> increment() -> increment() -> reset() -> count", "expected_output": "5", "hidden": true}]',
  '["Use useState hook", "Return an array with 4 elements", "Each function should update the state"]'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO simulator_challenges (id, roadmap_id, title, description, difficulty, category, points, time_limit_minutes, problem_statement, starter_code, test_cases, hints)
VALUES (
  '22222222-0005-4000-8000-000000000001',
  'a1b2c3d4-1111-4444-8888-000000000001',
  'Debug the Code',
  'Find and fix bugs in existing code',
  'intermediate',
  'debugging',
  75,
  20,
  'The following function should calculate the total price with discount, but it has bugs. Find and fix them.

Expected behavior:
- Apply discount percentage to total
- Round to 2 decimal places
- Return 0 if items array is empty',
  '// Fix the bugs in this code
function calculateTotal(items, discountPercent) {
  let total = 0;
  for (let i = 0; i <= items.length; i++) {
    total += items[i].price * items[i].quantity;
  }
  const discount = total * discountPercent;
  return total - discount;
}

// Example: calculateTotal([{price: 10, quantity: 2}], 0.1) should return 18.00',
  '[{"input": "[{price: 10, quantity: 2}], 0.1", "expected_output": "18.00", "hidden": false}, {"input": "[], 0.2", "expected_output": "0", "hidden": false}, {"input": "[{price: 100, quantity: 1}, {price: 50, quantity: 2}], 0.25", "expected_output": "150.00", "hidden": true}]',
  '["Check the loop condition", "Handle empty array case", "Use toFixed(2) for rounding"]'
) ON CONFLICT (id) DO NOTHING;


-- ========================================
-- BLOCK 2: Data Analyst Challenges
-- ========================================

INSERT INTO simulator_challenges (id, roadmap_id, title, description, difficulty, category, points, time_limit_minutes, problem_statement, starter_code, test_cases, hints)
VALUES (
  '22222222-0001-4000-8000-000000000002',
  'a1b2c3d4-2222-4444-8888-000000000002',
  'SQL Query Builder',
  'Write SQL queries for data analysis',
  'beginner',
  'sql',
  50,
  15,
  'Write a SQL query that:
1. Selects name and salary from the "employees" table
2. Filters for employees with salary > 50000
3. Orders by salary descending
4. Limits to top 10 results',
  '-- Write your SQL query here
SELECT ',
  '[{"input": "query validation", "expected_output": "SELECT name, salary FROM employees WHERE salary > 50000 ORDER BY salary DESC LIMIT 10", "hidden": false}]',
  '["Use WHERE for filtering", "ORDER BY column DESC", "LIMIT n for top results"]'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO simulator_challenges (id, roadmap_id, title, description, difficulty, category, points, time_limit_minutes, problem_statement, starter_code, test_cases, hints)
VALUES (
  '22222222-0002-4000-8000-000000000002',
  'a1b2c3d4-2222-4444-8888-000000000002',
  'Data Aggregation',
  'Calculate statistics from data',
  'intermediate',
  'python',
  75,
  20,
  'Write a function `analyze_sales` that takes a list of sale dictionaries and returns:
{
  "total": sum of all amounts,
  "average": average sale amount,
  "max": highest sale,
  "min": lowest sale,
  "count": number of sales
}

Each sale has: {"product": str, "amount": float}',
  'def analyze_sales(sales):
    # Your code here
    pass

# Example:
# sales = [{"product": "A", "amount": 100}, {"product": "B", "amount": 200}]
# Result: {"total": 300, "average": 150, "max": 200, "min": 100, "count": 2}',
  '[{"input": "[{amount: 100}, {amount: 200}]", "expected_output": "{total: 300, average: 150, max: 200, min: 100, count: 2}", "hidden": false}, {"input": "[]", "expected_output": "{total: 0, average: 0, max: 0, min: 0, count: 0}", "hidden": true}]',
  '["Handle empty list case", "Use sum(), max(), min() functions", "Calculate average as total/count"]'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO simulator_challenges (id, roadmap_id, title, description, difficulty, category, points, time_limit_minutes, problem_statement, starter_code, test_cases, hints)
VALUES (
  '22222222-0003-4000-8000-000000000002',
  'a1b2c3d4-2222-4444-8888-000000000002',
  'Data Cleaning',
  'Clean and transform messy data',
  'intermediate',
  'python',
  100,
  25,
  'Write a function `clean_data` that:
1. Removes rows with null/None values
2. Converts all string values to lowercase
3. Removes duplicate rows
4. Returns the cleaned list of dictionaries',
  'def clean_data(data):
    # Your code here
    # data is a list of dictionaries
    pass

# Example input:
# [{"name": "JOHN", "city": "NYC"}, {"name": None, "city": "LA"}, {"name": "john", "city": "nyc"}]
# Expected output:
# [{"name": "john", "city": "nyc"}]',
  '[{"input": "example_data", "expected_output": "cleaned_data", "hidden": false}]',
  '["Check for None values with if v is not None", "Use .lower() for strings", "Convert to tuple for deduplication"]'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO simulator_challenges (id, roadmap_id, title, description, difficulty, category, points, time_limit_minutes, problem_statement, starter_code, test_cases, hints)
VALUES (
  '22222222-0004-4000-8000-000000000002',
  'a1b2c3d4-2222-4444-8888-000000000002',
  'Statistical Analysis',
  'Calculate statistical measures',
  'advanced',
  'statistics',
  150,
  30,
  'Write a function `calculate_statistics` that takes a list of numbers and returns:
{
  "mean": arithmetic mean,
  "median": middle value,
  "mode": most frequent value,
  "std_dev": standard deviation
}

Do NOT use external libraries - implement the calculations manually.',
  'def calculate_statistics(numbers):
    # Implement without using numpy/scipy
    # Your code here
    pass',
  '[{"input": "[1, 2, 2, 3, 4]", "expected_output": "{mean: 2.4, median: 2, mode: 2, std_dev: 1.02}", "hidden": false}, {"input": "[10, 20, 30]", "expected_output": "{mean: 20, median: 20, mode: null, std_dev: 8.16}", "hidden": true}]',
  '["Mean = sum/count", "Sort for median", "Use Counter for mode", "Std dev = sqrt(variance)"]'
) ON CONFLICT (id) DO NOTHING;


-- ========================================
-- BLOCK 3: Verify challenges
-- ========================================

SELECT 
  r.title as roadmap,
  COUNT(sc.id) as challenges,
  SUM(sc.points) as total_points
FROM roadmaps r
LEFT JOIN simulator_challenges sc ON sc.roadmap_id = r.id
GROUP BY r.id, r.title;
