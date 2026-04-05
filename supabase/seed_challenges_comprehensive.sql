-- ========================================
-- COMPREHENSIVE SIMULATOR CHALLENGES
-- Run each block separately in Supabase
-- ========================================

-- ========================================
-- BLOCK 1: Frontend - JavaScript Fundamentals
-- ========================================

INSERT INTO simulator_challenges (id, roadmap_id, title, description, difficulty, category, points, time_limit_minutes, problem_statement, starter_code, test_cases, hints)
VALUES 
(
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
  '[{"name": "Basic even filter", "input": "[1, 2, 3, 4, 5, 6]", "expected_output": "[2, 4, 6]", "hidden": false}, {"name": "Mixed numbers", "input": "[10, 15, 20, 25]", "expected_output": "[10, 20]", "hidden": false}, {"name": "All odd", "input": "[1, 3, 5, 7]", "expected_output": "[]", "hidden": true}]',
  '["Use the filter() method", "Check if number % 2 === 0"]'
) ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  problem_statement = EXCLUDED.problem_statement,
  test_cases = EXCLUDED.test_cases;

INSERT INTO simulator_challenges (id, roadmap_id, title, description, difficulty, category, points, time_limit_minutes, problem_statement, starter_code, test_cases, hints)
VALUES 
(
  '22222222-0002-4000-8000-000000000001',
  'a1b2c3d4-1111-4444-8888-000000000001',
  'Array Transformation',
  'Map and transform array data',
  'beginner',
  'javascript',
  50,
  15,
  'Write a function `doubleAndSort` that takes an array of numbers, doubles each number, and returns them sorted in ascending order.

Example:
- Input: [3, 1, 4, 1, 5]
- Output: [2, 2, 6, 8, 10]',
  'function doubleAndSort(numbers) {
  // Your code here
}',
  '[{"name": "Basic transform", "input": "[3, 1, 4, 1, 5]", "expected_output": "[2, 2, 6, 8, 10]", "hidden": false}, {"name": "Single element", "input": "[5]", "expected_output": "[10]", "hidden": false}, {"name": "Empty array", "input": "[]", "expected_output": "[]", "hidden": true}]',
  '["Use map() to double values", "Use sort() with a compare function for numbers"]'
) ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title,
  problem_statement = EXCLUDED.problem_statement;

INSERT INTO simulator_challenges (id, roadmap_id, title, description, difficulty, category, points, time_limit_minutes, problem_statement, starter_code, test_cases, hints)
VALUES 
(
  '22222222-0003-4000-8000-000000000001',
  'a1b2c3d4-1111-4444-8888-000000000001',
  'Object Manipulation',
  'Transform and merge objects',
  'intermediate',
  'javascript',
  75,
  20,
  'Write a function `mergeUserData` that takes two objects (user profile and user settings) and returns a merged object with all properties. If both objects have the same key, the settings value should win.

Example:
- Input: {name: "John", age: 25}, {theme: "dark", age: 26}
- Output: {name: "John", age: 26, theme: "dark"}',
  'function mergeUserData(profile, settings) {
  // Your code here
}',
  '[{"name": "Basic merge", "input": "{name: \"John\", age: 25}, {theme: \"dark\"}", "expected_output": "{name: \"John\", age: 25, theme: \"dark\"}", "hidden": false}, {"name": "Override values", "input": "{a: 1}, {a: 2}", "expected_output": "{a: 2}", "hidden": false}, {"name": "Empty objects", "input": "{}, {active: true}", "expected_output": "{active: true}", "hidden": true}]',
  '["Use the spread operator (...)", "Order matters: {...profile, ...settings}"]'
) ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title,
  problem_statement = EXCLUDED.problem_statement;


-- ========================================
-- BLOCK 2: Frontend - Async & DOM
-- ========================================

INSERT INTO simulator_challenges (id, roadmap_id, title, description, difficulty, category, points, time_limit_minutes, problem_statement, starter_code, test_cases, hints)
VALUES 
(
  '22222222-0004-4000-8000-000000000001',
  'a1b2c3d4-1111-4444-8888-000000000001',
  'Promise Chain',
  'Handle async operations with promises',
  'intermediate',
  'javascript',
  100,
  25,
  'Write a function `fetchUserWithPosts` that:
1. Calls getUser(id) which returns a Promise with user data
2. Then calls getPosts(userId) which returns a Promise with posts array
3. Returns an object combining both: { user, posts }

Handle errors by returning { error: "Failed to fetch" }',
  'const getUser = (id) => Promise.resolve({ id, name: "User " + id });
const getPosts = (userId) => Promise.resolve([{ title: "Post 1" }, { title: "Post 2" }]);

async function fetchUserWithPosts(id) {
  // Your code here
}',
  '[{"name": "Success case", "input": "1", "expected_output": "{user: {id: 1, name: \"User 1\"}, posts: [{title: \"Post 1\"}, {title: \"Post 2\"}]}", "hidden": false}, {"name": "Different user", "input": "5", "expected_output": "{user: {id: 5, name: \"User 5\"}, posts: [...]}", "hidden": true}]',
  '["Use async/await for cleaner code", "Wrap in try/catch for error handling"]'
) ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title,
  problem_statement = EXCLUDED.problem_statement;

INSERT INTO simulator_challenges (id, roadmap_id, title, description, difficulty, category, points, time_limit_minutes, problem_statement, starter_code, test_cases, hints)
VALUES 
(
  '22222222-0005-4000-8000-000000000001',
  'a1b2c3d4-1111-4444-8888-000000000001',
  'Debounce Function',
  'Implement a classic debounce utility',
  'advanced',
  'javascript',
  150,
  30,
  'Implement a `debounce` function that delays invoking the provided function until after `wait` milliseconds have elapsed since the last time it was invoked.

The debounced function should:
1. Delay execution by `wait` ms
2. Reset the timer if called again before `wait` ms
3. Return a function that can be called multiple times

Example:
const debouncedLog = debounce(console.log, 1000);
debouncedLog("a"); // waits...
debouncedLog("b"); // resets timer, waits...
// After 1000ms, logs "b" (only the last call)',
  'function debounce(func, wait) {
  // Your code here
  // Return a new function that debounces
}',
  '[{"name": "Returns function", "input": "typeof debounce(() => {}, 100)", "expected_output": "function", "hidden": false}, {"name": "Delays execution", "input": "debounce behavior test", "expected_output": "delayed", "hidden": true}]',
  '["Use setTimeout and clearTimeout", "Store the timeout ID in a closure", "Return a new function that manages the timer"]'
) ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title,
  problem_statement = EXCLUDED.problem_statement;

INSERT INTO simulator_challenges (id, roadmap_id, title, description, difficulty, category, points, time_limit_minutes, problem_statement, starter_code, test_cases, hints)
VALUES 
(
  '22222222-0006-4000-8000-000000000001',
  'a1b2c3d4-1111-4444-8888-000000000001',
  'Deep Clone Object',
  'Create a deep copy of nested objects',
  'intermediate',
  'javascript',
  100,
  25,
  'Implement `deepClone` that creates a deep copy of an object. The clone should:
1. Copy all nested objects and arrays
2. Not share references with the original
3. Handle nested structures of any depth

Note: You can assume the object only contains plain objects, arrays, and primitives (no functions, dates, etc).

Example:
const original = { a: 1, b: { c: 2 } };
const clone = deepClone(original);
clone.b.c = 999;
console.log(original.b.c); // Still 2!',
  'function deepClone(obj) {
  // Your code here
}',
  '[{"name": "Shallow object", "input": "{a: 1}", "expected_output": "{a: 1}", "hidden": false}, {"name": "Nested object", "input": "{a: {b: 2}}", "expected_output": "{a: {b: 2}}", "hidden": false}, {"name": "With arrays", "input": "{items: [1, 2, {x: 3}]}", "expected_output": "{items: [1, 2, {x: 3}]}", "hidden": true}]',
  '["Check if value is an array with Array.isArray()", "Use recursion for nested objects", "Handle both objects and arrays"]'
) ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title,
  problem_statement = EXCLUDED.problem_statement;


-- ========================================
-- BLOCK 3: Frontend - React Patterns
-- ========================================

INSERT INTO simulator_challenges (id, roadmap_id, title, description, difficulty, category, points, time_limit_minutes, problem_statement, starter_code, test_cases, hints)
VALUES 
(
  '22222222-0007-4000-8000-000000000001',
  'a1b2c3d4-1111-4444-8888-000000000001',
  'useCounter Hook',
  'Build a custom React hook',
  'intermediate',
  'react',
  100,
  25,
  'Create a custom hook `useCounter` that manages a counter state.

The hook should:
1. Accept an optional initialValue (default: 0)
2. Return an object with:
   - count: current value
   - increment: function to add 1
   - decrement: function to subtract 1
   - reset: function to return to initial value
   - setCount: function to set any value

Example:
const { count, increment, decrement, reset } = useCounter(10);',
  'function useCounter(initialValue = 0) {
  // Use React.useState here
  // Return { count, increment, decrement, reset, setCount }
}',
  '[{"name": "Initial value", "input": "useCounter(5).count", "expected_output": "5", "hidden": false}, {"name": "Increment", "input": "useCounter(0) -> increment -> count", "expected_output": "1", "hidden": false}, {"name": "Reset", "input": "useCounter(10) -> increment -> reset -> count", "expected_output": "10", "hidden": true}]',
  '["Use useState for the count", "Each function should update state", "reset should use the initialValue, not 0"]'
) ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title,
  problem_statement = EXCLUDED.problem_statement;

INSERT INTO simulator_challenges (id, roadmap_id, title, description, difficulty, category, points, time_limit_minutes, problem_statement, starter_code, test_cases, hints)
VALUES 
(
  '22222222-0008-4000-8000-000000000001',
  'a1b2c3d4-1111-4444-8888-000000000001',
  'useLocalStorage Hook',
  'Persist state to localStorage',
  'advanced',
  'react',
  150,
  30,
  'Create a hook `useLocalStorage` that syncs state with localStorage.

Requirements:
1. Accept a key and initialValue
2. Initialize from localStorage if exists, else use initialValue
3. Update localStorage whenever state changes
4. Return [value, setValue] like useState
5. Handle JSON serialization/parsing

Example:
const [name, setName] = useLocalStorage("userName", "Guest");
setName("John"); // Also saves to localStorage',
  'function useLocalStorage(key, initialValue) {
  // Initialize state from localStorage or initialValue
  // Sync changes back to localStorage
  // Return [value, setValue]
}',
  '[{"name": "Returns array", "input": "Array.isArray(useLocalStorage(\"test\", 1))", "expected_output": "true", "hidden": false}, {"name": "Uses initial value", "input": "useLocalStorage(\"newKey\", \"default\")[0]", "expected_output": "\"default\"", "hidden": false}]',
  '["Use useState with lazy initialization", "Use useEffect to sync to localStorage", "Wrap JSON.parse in try/catch"]'
) ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title,
  problem_statement = EXCLUDED.problem_statement;

INSERT INTO simulator_challenges (id, roadmap_id, title, description, difficulty, category, points, time_limit_minutes, problem_statement, starter_code, test_cases, hints)
VALUES 
(
  '22222222-0009-4000-8000-000000000001',
  'a1b2c3d4-1111-4444-8888-000000000001',
  'Memoized Filter',
  'Optimize with useMemo',
  'advanced',
  'react',
  125,
  25,
  'You have a list of products and a search term. Implement `useFilteredProducts` that:

1. Takes products array and searchTerm string
2. Returns filtered products where name includes searchTerm (case-insensitive)
3. Uses useMemo to avoid unnecessary re-filtering
4. Only recomputes when products or searchTerm change

This simulates a common performance optimization pattern.',
  'function useFilteredProducts(products, searchTerm) {
  // Use useMemo to memoize the filtered result
  // Filter products where name includes searchTerm (case-insensitive)
}

// Example products:
// [{ id: 1, name: "iPhone" }, { id: 2, name: "iPad" }]
// searchTerm: "phone"
// Result: [{ id: 1, name: "iPhone" }]',
  '[{"name": "Filters correctly", "input": "[{name: \"Apple\"}, {name: \"Banana\"}], \"app\"", "expected_output": "[{name: \"Apple\"}]", "hidden": false}, {"name": "Case insensitive", "input": "[{name: \"TEST\"}], \"test\"", "expected_output": "[{name: \"TEST\"}]", "hidden": true}]',
  '["Use useMemo with [products, searchTerm] as dependencies", "Use toLowerCase() for case-insensitive matching", "Use filter() and includes()"]'
) ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title,
  problem_statement = EXCLUDED.problem_statement;


-- ========================================
-- BLOCK 4: Frontend - Algorithms & Problem Solving
-- ========================================

INSERT INTO simulator_challenges (id, roadmap_id, title, description, difficulty, category, points, time_limit_minutes, problem_statement, starter_code, test_cases, hints)
VALUES 
(
  '22222222-0010-4000-8000-000000000001',
  'a1b2c3d4-1111-4444-8888-000000000001',
  'Flatten Nested Array',
  'Recursively flatten arrays',
  'intermediate',
  'algorithms',
  100,
  20,
  'Write a function `flatten` that takes a deeply nested array and returns a single flat array with all values.

Example:
- Input: [1, [2, [3, 4], 5], 6]
- Output: [1, 2, 3, 4, 5, 6]

Do NOT use Array.flat() - implement it yourself!',
  'function flatten(arr) {
  // Your code here - no using .flat()!
}',
  '[{"name": "One level", "input": "[1, [2, 3], 4]", "expected_output": "[1, 2, 3, 4]", "hidden": false}, {"name": "Deep nesting", "input": "[1, [2, [3, [4]]]]", "expected_output": "[1, 2, 3, 4]", "hidden": false}, {"name": "Already flat", "input": "[1, 2, 3]", "expected_output": "[1, 2, 3]", "hidden": true}]',
  '["Use recursion", "Check Array.isArray() for each element", "Use concat or spread to combine results"]'
) ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title,
  problem_statement = EXCLUDED.problem_statement;

INSERT INTO simulator_challenges (id, roadmap_id, title, description, difficulty, category, points, time_limit_minutes, problem_statement, starter_code, test_cases, hints)
VALUES 
(
  '22222222-0011-4000-8000-000000000001',
  'a1b2c3d4-1111-4444-8888-000000000001',
  'Group By Property',
  'Group array items by a key',
  'intermediate',
  'algorithms',
  100,
  20,
  'Write a function `groupBy` that groups an array of objects by a specified property.

Example:
const people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 25 }
];
groupBy(people, "age");
// Returns:
// {
//   25: [{ name: "Alice", age: 25 }, { name: "Charlie", age: 25 }],
//   30: [{ name: "Bob", age: 30 }]
// }',
  'function groupBy(array, property) {
  // Your code here
}',
  '[{"name": "Group by age", "input": "[{age: 20}, {age: 30}, {age: 20}], \"age\"", "expected_output": "{20: [{age: 20}, {age: 20}], 30: [{age: 30}]}", "hidden": false}, {"name": "Single group", "input": "[{type: \"a\"}, {type: \"a\"}], \"type\"", "expected_output": "{a: [...]}", "hidden": true}]',
  '["Use reduce() to build the groups object", "Initialize each group as an empty array", "Push items into their group"]'
) ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title,
  problem_statement = EXCLUDED.problem_statement;

INSERT INTO simulator_challenges (id, roadmap_id, title, description, difficulty, category, points, time_limit_minutes, problem_statement, starter_code, test_cases, hints)
VALUES 
(
  '22222222-0012-4000-8000-000000000001',
  'a1b2c3d4-1111-4444-8888-000000000001',
  'Find Duplicates',
  'Identify duplicate values efficiently',
  'beginner',
  'algorithms',
  50,
  15,
  'Write a function `findDuplicates` that returns an array of values that appear more than once in the input array.

Example:
- Input: [1, 2, 3, 2, 4, 3, 5]
- Output: [2, 3]

The output should only include each duplicate once, in the order they first appear as duplicates.',
  'function findDuplicates(arr) {
  // Your code here
}',
  '[{"name": "Basic duplicates", "input": "[1, 2, 2, 3, 3, 4]", "expected_output": "[2, 3]", "hidden": false}, {"name": "No duplicates", "input": "[1, 2, 3]", "expected_output": "[]", "hidden": false}, {"name": "All same", "input": "[5, 5, 5, 5]", "expected_output": "[5]", "hidden": true}]',
  '["Use an object or Map to count occurrences", "Or use filter with indexOf vs lastIndexOf", "Make sure each duplicate appears only once in output"]'
) ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title,
  problem_statement = EXCLUDED.problem_statement;

INSERT INTO simulator_challenges (id, roadmap_id, title, description, difficulty, category, points, time_limit_minutes, problem_statement, starter_code, test_cases, hints)
VALUES 
(
  '22222222-0013-4000-8000-000000000001',
  'a1b2c3d4-1111-4444-8888-000000000001',
  'Palindrome Checker',
  'Check string palindromes',
  'beginner',
  'algorithms',
  50,
  15,
  'Write a function `isPalindrome` that checks if a string is a palindrome.

Rules:
- Ignore case (\"Racecar\" is a palindrome)
- Ignore non-alphanumeric characters (\"A man, a plan, a canal: Panama\" is a palindrome)

Examples:
- "racecar" → true
- "hello" → false
- "A Santa at NASA" → true',
  'function isPalindrome(str) {
  // Your code here
}',
  '[{"name": "Simple palindrome", "input": "\"racecar\"", "expected_output": "true", "hidden": false}, {"name": "Not palindrome", "input": "\"hello\"", "expected_output": "false", "hidden": false}, {"name": "With spaces", "input": "\"nurses run\"", "expected_output": "true", "hidden": true}]',
  '["Remove non-alphanumeric with regex: /[^a-z0-9]/gi", "Convert to lowercase", "Compare with reversed string"]'
) ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title,
  problem_statement = EXCLUDED.problem_statement;


-- ========================================
-- BLOCK 5: Data Analyst - SQL Challenges  
-- ========================================

INSERT INTO simulator_challenges (id, roadmap_id, title, description, difficulty, category, points, time_limit_minutes, problem_statement, starter_code, test_cases, hints)
VALUES 
(
  '22222222-0001-4000-8000-000000000002',
  'a1b2c3d4-2222-4444-8888-000000000002',
  'Basic SELECT Query',
  'Filter and sort data with SQL',
  'beginner',
  'sql',
  50,
  15,
  'Write a SQL query that:
1. Selects name and salary from the "employees" table
2. Filters for employees with salary > 50000
3. Orders by salary descending
4. Limits to top 10 results

Expected query structure:
SELECT ... FROM ... WHERE ... ORDER BY ... LIMIT ...',
  '-- Write your SQL query here
SELECT ',
  '[{"name": "Correct query", "input": "query validation", "expected_output": "SELECT name, salary FROM employees WHERE salary > 50000 ORDER BY salary DESC LIMIT 10", "hidden": false}]',
  '["Use WHERE for filtering", "ORDER BY column DESC for descending", "LIMIT n for top results"]'
) ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title,
  problem_statement = EXCLUDED.problem_statement;

INSERT INTO simulator_challenges (id, roadmap_id, title, description, difficulty, category, points, time_limit_minutes, problem_statement, starter_code, test_cases, hints)
VALUES 
(
  '22222222-0002-4000-8000-000000000002',
  'a1b2c3d4-2222-4444-8888-000000000002',
  'JOIN Operations',
  'Combine data from multiple tables',
  'intermediate',
  'sql',
  100,
  25,
  'Given tables:
- orders (id, customer_id, amount, created_at)
- customers (id, name, email)

Write a query to:
1. Get customer name, email, and total order amount
2. Group by customer
3. Only include customers with total orders > 1000
4. Order by total amount descending',
  '-- Tables: orders (id, customer_id, amount, created_at)
--         customers (id, name, email)
-- Write your query:
SELECT ',
  '[{"name": "Join query", "input": "query validation", "expected_output": "SELECT c.name, c.email, SUM(o.amount) as total FROM customers c JOIN orders o ON c.id = o.customer_id GROUP BY c.id, c.name, c.email HAVING SUM(o.amount) > 1000 ORDER BY total DESC", "hidden": false}]',
  '["Use JOIN to connect tables", "GROUP BY for aggregation", "HAVING filters after GROUP BY (not WHERE)", "SUM() for total amount"]'
) ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title,
  problem_statement = EXCLUDED.problem_statement;

INSERT INTO simulator_challenges (id, roadmap_id, title, description, difficulty, category, points, time_limit_minutes, problem_statement, starter_code, test_cases, hints)
VALUES 
(
  '22222222-0003-4000-8000-000000000002',
  'a1b2c3d4-2222-4444-8888-000000000002',
  'Subqueries & CTEs',
  'Write complex nested queries',
  'advanced',
  'sql',
  150,
  30,
  'Find employees who earn more than the average salary of their department.

Tables:
- employees (id, name, salary, department_id)
- departments (id, name)

Return: employee name, salary, department name, department average salary

Use a CTE (WITH clause) or subquery to calculate department averages.',
  '-- Tables: employees (id, name, salary, department_id)
--         departments (id, name)

WITH dept_avg AS (
  -- Calculate average salary per department here
)
SELECT 
  -- Join and filter employees above their dept average
',
  '[{"name": "CTE query", "input": "query validation", "expected_output": "WITH dept_avg AS (SELECT department_id, AVG(salary) as avg_salary FROM employees GROUP BY department_id) SELECT e.name, e.salary, d.name as dept, da.avg_salary FROM employees e JOIN departments d ON e.department_id = d.id JOIN dept_avg da ON e.department_id = da.department_id WHERE e.salary > da.avg_salary", "hidden": false}]',
  '["Use CTE (WITH) to calculate dept averages first", "Join the CTE back to employees", "Compare individual salary to department average"]'
) ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title,
  problem_statement = EXCLUDED.problem_statement;

INSERT INTO simulator_challenges (id, roadmap_id, title, description, difficulty, category, points, time_limit_minutes, problem_statement, starter_code, test_cases, hints)
VALUES 
(
  '22222222-0004-4000-8000-000000000002',
  'a1b2c3d4-2222-4444-8888-000000000002',
  'Window Functions',
  'Ranking and running totals',
  'advanced',
  'sql',
  150,
  30,
  'Using the sales table (id, salesperson, amount, sale_date), write a query that shows:

1. Salesperson name
2. Sale amount
3. Running total for that salesperson (ordered by date)
4. Rank within their own sales (highest first)
5. Rank across ALL sales (highest first)

Use window functions: SUM() OVER, RANK() OVER, ROW_NUMBER() OVER',
  '-- Table: sales (id, salesperson, amount, sale_date)

SELECT 
  salesperson,
  amount,
  -- Add: running_total, personal_rank, overall_rank
',
  '[{"name": "Window functions", "input": "query validation", "expected_output": "SELECT salesperson, amount, SUM(amount) OVER (PARTITION BY salesperson ORDER BY sale_date) as running_total, RANK() OVER (PARTITION BY salesperson ORDER BY amount DESC) as personal_rank, RANK() OVER (ORDER BY amount DESC) as overall_rank FROM sales", "hidden": false}]',
  '["PARTITION BY groups the window", "ORDER BY within OVER() sets the window order", "Running total: SUM() OVER (PARTITION BY x ORDER BY date)", "Rank: RANK() OVER (ORDER BY amount DESC)"]'
) ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title,
  problem_statement = EXCLUDED.problem_statement;


-- ========================================
-- BLOCK 6: Data Analyst - Python Analysis
-- ========================================

INSERT INTO simulator_challenges (id, roadmap_id, title, description, difficulty, category, points, time_limit_minutes, problem_statement, starter_code, test_cases, hints)
VALUES 
(
  '22222222-0005-4000-8000-000000000002',
  'a1b2c3d4-2222-4444-8888-000000000002',
  'Data Aggregation',
  'Calculate statistics from data',
  'intermediate',
  'python',
  75,
  20,
  'Write a function `analyze_sales` that takes a list of sale dictionaries and returns statistics.

Each sale has: {"product": str, "amount": float, "quantity": int}

Return a dictionary with:
- total: sum of all amounts
- average: average sale amount  
- max_sale: highest single sale amount
- min_sale: lowest single sale amount
- count: number of sales
- total_items: sum of all quantities

Handle empty list by returning all zeros.',
  'def analyze_sales(sales):
    if not sales:
        return {"total": 0, "average": 0, "max_sale": 0, "min_sale": 0, "count": 0, "total_items": 0}
    
    # Your code here
    pass',
  '[{"name": "Basic stats", "input": "[{\"amount\": 100, \"quantity\": 2}, {\"amount\": 200, \"quantity\": 3}]", "expected_output": "{\"total\": 300, \"average\": 150, \"max_sale\": 200, \"min_sale\": 100, \"count\": 2, \"total_items\": 5}", "hidden": false}, {"name": "Empty list", "input": "[]", "expected_output": "{\"total\": 0, ...}", "hidden": true}]',
  '["Use sum() with a generator for totals", "max() and min() for extremes", "len() for count", "average = total / count"]'
) ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title,
  problem_statement = EXCLUDED.problem_statement;

INSERT INTO simulator_challenges (id, roadmap_id, title, description, difficulty, category, points, time_limit_minutes, problem_statement, starter_code, test_cases, hints)
VALUES 
(
  '22222222-0006-4000-8000-000000000002',
  'a1b2c3d4-2222-4444-8888-000000000002',
  'Data Cleaning Pipeline',
  'Clean messy real-world data',
  'intermediate',
  'python',
  100,
  25,
  'Write a function `clean_data` that cleans a list of user records.

Each record is a dict that may have issues:
- Missing values (None)
- Extra whitespace in strings
- Inconsistent casing
- Duplicate records

Your function should:
1. Remove records with any None values
2. Strip whitespace from all string values  
3. Convert all strings to lowercase
4. Remove duplicate records (same values after cleaning)
5. Return the cleaned list',
  'def clean_data(records):
    """
    Clean a list of user record dictionaries.
    
    Example input:
    [
        {"name": "  JOHN  ", "city": "NYC"},
        {"name": "john", "city": "nyc"},  # duplicate after cleaning
        {"name": None, "city": "LA"}  # has None, remove
    ]
    
    Expected output:
    [{"name": "john", "city": "nyc"}]
    """
    # Your code here
    pass',
  '[{"name": "Clean and dedupe", "input": "[{\"name\": \"JOHN\", \"city\": \"NYC\"}, {\"name\": \"john\", \"city\": \"nyc\"}]", "expected_output": "[{\"name\": \"john\", \"city\": \"nyc\"}]", "hidden": false}]',
  '["Check for None with: if None in record.values()", "Use .strip().lower() for strings", "Convert dict to tuple of items for deduplication with set"]'
) ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title,
  problem_statement = EXCLUDED.problem_statement;

INSERT INTO simulator_challenges (id, roadmap_id, title, description, difficulty, category, points, time_limit_minutes, problem_statement, starter_code, test_cases, hints)
VALUES 
(
  '22222222-0007-4000-8000-000000000002',
  'a1b2c3d4-2222-4444-8888-000000000002',
  'Statistical Analysis',
  'Calculate statistical measures manually',
  'advanced',
  'python',
  150,
  30,
  'Write `calculate_statistics` that computes stats WITHOUT using numpy/scipy.

Input: list of numbers
Output: dictionary with:
- mean: arithmetic average
- median: middle value (average of two middle if even length)
- mode: most frequent value (None if no repeats)
- variance: population variance
- std_dev: standard deviation (sqrt of variance)
- range: max - min

Round all floats to 2 decimal places.',
  'def calculate_statistics(numbers):
    """
    Calculate statistics manually (no numpy/scipy).
    
    Example:
    calculate_statistics([1, 2, 2, 3, 4])
    Returns: {
        "mean": 2.4,
        "median": 2,
        "mode": 2,
        "variance": 1.04,
        "std_dev": 1.02,
        "range": 3
    }
    """
    if not numbers:
        return None
    
    # Your code here
    pass',
  '[{"name": "Basic stats", "input": "[1, 2, 2, 3, 4]", "expected_output": "{\"mean\": 2.4, \"median\": 2, \"mode\": 2, \"std_dev\": 1.02, ...}", "hidden": false}, {"name": "Even length", "input": "[1, 2, 3, 4]", "expected_output": "{\"median\": 2.5, ...}", "hidden": true}]',
  '["Mean = sum / len", "Sort list for median", "Use collections.Counter for mode", "Variance = sum((x - mean)^2) / n", "std_dev = variance ** 0.5"]'
) ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title,
  problem_statement = EXCLUDED.problem_statement;

INSERT INTO simulator_challenges (id, roadmap_id, title, description, difficulty, category, points, time_limit_minutes, problem_statement, starter_code, test_cases, hints)
VALUES 
(
  '22222222-0008-4000-8000-000000000002',
  'a1b2c3d4-2222-4444-8888-000000000002',
  'Time Series Analysis',
  'Analyze trends over time',
  'advanced',
  'python',
  150,
  35,
  'Write `analyze_time_series` for daily sales data.

Input: list of {"date": "YYYY-MM-DD", "amount": float}
Output: dictionary with:
- total: sum of all amounts
- daily_average: average per day
- best_day: {"date": ..., "amount": ...}
- worst_day: {"date": ..., "amount": ...}
- trend: "increasing", "decreasing", or "stable"
  (compare first half average to second half average)
- weekly_totals: dict of {week_number: total}

Assume dates are sorted chronologically.',
  'def analyze_time_series(data):
    """
    Analyze time series sales data.
    
    Example input:
    [
        {"date": "2024-01-01", "amount": 100},
        {"date": "2024-01-02", "amount": 150},
        {"date": "2024-01-03", "amount": 200}
    ]
    """
    if not data:
        return None
        
    # Your code here
    pass',
  '[{"name": "Trend analysis", "input": "[{\"date\": \"2024-01-01\", \"amount\": 100}, {\"date\": \"2024-01-02\", \"amount\": 200}]", "expected_output": "{\"trend\": \"increasing\", ...}", "hidden": false}]',
  '["Split data in half to determine trend", "Use datetime.strptime to parse dates", "isocalendar() gives week number", "Compare averages: if second > first * 1.05, increasing"]'
) ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title,
  problem_statement = EXCLUDED.problem_statement;


-- ========================================
-- BLOCK 7: Data Analyst - Visualization & Reporting
-- ========================================

INSERT INTO simulator_challenges (id, roadmap_id, title, description, difficulty, category, points, time_limit_minutes, problem_statement, starter_code, test_cases, hints)
VALUES 
(
  '22222222-0009-4000-8000-000000000002',
  'a1b2c3d4-2222-4444-8888-000000000002',
  'Data Transformation',
  'Reshape data for visualization',
  'intermediate',
  'python',
  100,
  25,
  'Write `pivot_data` to transform row data into a pivot table format.

Input:
- data: list of {"category": str, "month": str, "value": float}  
- rows: field to use for row labels
- cols: field to use for column headers
- values: field to aggregate

Output: dict with:
- headers: list of unique column values
- rows: list of {"label": row_value, "values": [aggregated values per column]}

Example: Pivot sales by product (rows) and month (columns), summing amounts.',
  'def pivot_data(data, rows, cols, values):
    """
    Create a pivot table from flat data.
    
    Example:
    data = [
        {"product": "A", "month": "Jan", "sales": 100},
        {"product": "A", "month": "Feb", "sales": 150},
        {"product": "B", "month": "Jan", "sales": 200}
    ]
    pivot_data(data, rows="product", cols="month", values="sales")
    
    Returns:
    {
        "headers": ["Jan", "Feb"],
        "rows": [
            {"label": "A", "values": [100, 150]},
            {"label": "B", "values": [200, 0]}
        ]
    }
    """
    # Your code here
    pass',
  '[{"name": "Basic pivot", "input": "[{\"cat\": \"A\", \"month\": \"Jan\", \"val\": 10}], \"cat\", \"month\", \"val\"", "expected_output": "{\"headers\": [\"Jan\"], \"rows\": [{\"label\": \"A\", \"values\": [10]}]}", "hidden": false}]',
  '["First, get unique row and column values", "Build a nested dict: data[row][col] = sum", "Convert to the output format", "Use 0 for missing combinations"]'
) ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title,
  problem_statement = EXCLUDED.problem_statement;

INSERT INTO simulator_challenges (id, roadmap_id, title, description, difficulty, category, points, time_limit_minutes, problem_statement, starter_code, test_cases, hints)
VALUES 
(
  '22222222-0010-4000-8000-000000000002',
  'a1b2c3d4-2222-4444-8888-000000000002',
  'Report Generator',
  'Generate formatted reports',
  'advanced',
  'python',
  125,
  30,
  'Write `generate_report` that creates a text summary report from data.

Input: dict with:
- title: report title
- period: {"start": date, "end": date}
- metrics: list of {"name": str, "value": float, "change": float}
- top_items: list of {"name": str, "value": float}

Output: formatted string report with:
- Header with title and period
- Metrics section with values and ▲/▼ for positive/negative change
- Top performers list
- Footer with generation timestamp

Make it readable and professional!',
  'from datetime import datetime

def generate_report(data):
    """
    Generate a formatted text report.
    
    Example output:
    ════════════════════════════════════
    SALES REPORT
    Period: Jan 1 - Jan 31, 2024
    ════════════════════════════════════
    
    KEY METRICS
    ───────────────────────────────────
    Revenue: $125,000 ▲ +15.5%
    Orders: 1,234 ▼ -3.2%
    
    TOP PERFORMERS
    ───────────────────────────────────
    1. Product A - $45,000
    2. Product B - $32,000
    
    Generated: 2024-01-31 14:30:00
    ════════════════════════════════════
    """
    # Your code here
    pass',
  '[{"name": "Report format", "input": "{\"title\": \"Test\", ...}", "expected_output": "formatted report string", "hidden": false}]',
  '["Use string formatting or f-strings", "▲ for positive change, ▼ for negative", "Format numbers with commas: \"{:,}\".format(n)", "datetime.now() for timestamp"]'
) ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title,
  problem_statement = EXCLUDED.problem_statement;


-- ========================================
-- VERIFY: Count challenges per roadmap
-- ========================================

SELECT 
  r.title as roadmap,
  COUNT(sc.id) as challenges,
  SUM(sc.points) as total_points,
  STRING_AGG(DISTINCT sc.category, ', ') as categories
FROM roadmaps r
LEFT JOIN simulator_challenges sc ON sc.roadmap_id = r.id
GROUP BY r.id, r.title
ORDER BY r.title;
