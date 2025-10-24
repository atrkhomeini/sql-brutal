import React, { useState } from 'react';
import { CheckCircle, XCircle, ChevronRight, RotateCcw, Award } from 'lucide-react';

const SQLPractice = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [completedQuestions, setCompletedQuestions] = useState(new Set());
  const [difficulty, setDifficulty] = useState('beginner');
  const [darkMode, setDarkMode] = useState(false);

  const questions = {
    beginner: [
      {
        id: 1,
        question: "Select all columns from the 'employees' table",
        schema: "employees (id, name, department, salary, hire_date)",
        hint: "Use SELECT and * to get all columns",
        solution: "SELECT * FROM employees;",
        explanation: "The asterisk (*) selects all columns from the table."
      },
      {
        id: 2,
        question: "Find all employees in the 'Sales' department",
        schema: "employees (id, name, department, salary, hire_date)",
        hint: "Use WHERE clause to filter by department",
        solution: "SELECT * FROM employees WHERE department = 'Sales';",
        explanation: "WHERE filters rows based on conditions. String values need quotes."
      },
      {
        id: 3,
        question: "Get the names of employees earning more than 50000",
        schema: "employees (id, name, department, salary, hire_date)",
        hint: "Use WHERE with a comparison operator (>)",
        solution: "SELECT name FROM employees WHERE salary > 50000;",
        explanation: "You can combine column selection with WHERE conditions."
      },
      {
        id: 4,
        question: "Count the total number of employees",
        schema: "employees (id, name, department, salary, hire_date)",
        hint: "Use the COUNT() aggregate function",
        solution: "SELECT COUNT(*) FROM employees;",
        explanation: "COUNT(*) returns the number of rows in the table."
      },
      {
        id: 5,
        question: "Find the average salary of all employees",
        schema: "employees (id, name, department, salary, hire_date)",
        hint: "Use the AVG() function",
        solution: "SELECT AVG(salary) FROM employees;",
        explanation: "AVG() calculates the average of numeric values."
      },
      {
        id: 6,
        question: "Select distinct departments from employees",
        schema: "employees (id, name, department, salary, hire_date)",
        hint: "Use DISTINCT keyword",
        solution: "SELECT DISTINCT department FROM employees;",
        explanation: "DISTINCT removes duplicate values from the result set."
      },
      {
        id: 7,
        question: "Get employees ordered by salary in descending order",
        schema: "employees (id, name, department, salary, hire_date)",
        hint: "Use ORDER BY with DESC",
        solution: "SELECT * FROM employees ORDER BY salary DESC;",
        explanation: "ORDER BY sorts results. DESC means descending, ASC is ascending (default)."
      },
      {
        id: 8,
        question: "Find employees with names starting with 'J'",
        schema: "employees (id, name, department, salary, hire_date)",
        hint: "Use LIKE with wildcard %",
        solution: "SELECT * FROM employees WHERE name LIKE 'J%';",
        explanation: "LIKE is used for pattern matching. % matches any sequence of characters."
      },
      {
        id: 9,
        question: "Get the top 5 highest paid employees",
        schema: "employees (id, name, department, salary, hire_date)",
        hint: "Combine ORDER BY with LIMIT",
        solution: "SELECT * FROM employees ORDER BY salary DESC LIMIT 5;",
        explanation: "LIMIT restricts the number of rows returned."
      },
      {
        id: 10,
        question: "Find employees earning between 40000 and 60000",
        schema: "employees (id, name, department, salary, hire_date)",
        hint: "Use BETWEEN operator",
        solution: "SELECT * FROM employees WHERE salary BETWEEN 40000 AND 60000;",
        explanation: "BETWEEN is inclusive and checks if a value is within a range."
      },
      {
        id: 11,
        question: "Count non-null values in the department column",
        schema: "employees (id, name, department, salary, hire_date)",
        hint: "Use COUNT with column name",
        solution: "SELECT COUNT(department) FROM employees;",
        explanation: "COUNT(column) counts non-null values in that column."
      },
      {
        id: 12,
        question: "Find the minimum salary in the company",
        schema: "employees (id, name, department, salary, hire_date)",
        hint: "Use MIN() function",
        solution: "SELECT MIN(salary) FROM employees;",
        explanation: "MIN() returns the smallest value in a column."
      },
      {
        id: 13,
        question: "Get employees in Sales OR Marketing departments",
        schema: "employees (id, name, department, salary, hire_date)",
        hint: "Use IN operator or OR",
        solution: "SELECT * FROM employees WHERE department IN ('Sales', 'Marketing');",
        explanation: "IN checks if a value matches any value in a list."
      },
      {
        id: 14,
        question: "Find employees whose name contains 'son'",
        schema: "employees (id, name, department, salary, hire_date)",
        hint: "Use LIKE with % on both sides",
        solution: "SELECT * FROM employees WHERE name LIKE '%son%';",
        explanation: "%son% matches 'son' anywhere in the string."
      },
      {
        id: 15,
        question: "Get total salary expenditure for the company",
        schema: "employees (id, name, department, salary, hire_date)",
        hint: "Use SUM() function",
        solution: "SELECT SUM(salary) FROM employees;",
        explanation: "SUM() adds up all values in a numeric column."
      },
      {
        id: 16,
        question: "Find employees NOT in the IT department",
        schema: "employees (id, name, department, salary, hire_date)",
        hint: "Use NOT or != operator",
        solution: "SELECT * FROM employees WHERE department != 'IT';",
        explanation: "!= or <> checks for inequality. You can also use NOT."
      },
      {
        id: 17,
        question: "Select employee names and salaries, rename salary column to 'Annual_Pay'",
        schema: "employees (id, name, department, salary, hire_date)",
        hint: "Use AS for column aliasing",
        solution: "SELECT name, salary AS Annual_Pay FROM employees;",
        explanation: "AS creates an alias for a column in the result set."
      },
      {
        id: 18,
        question: "Find employees with NULL department values",
        schema: "employees (id, name, department, salary, hire_date)",
        hint: "Use IS NULL",
        solution: "SELECT * FROM employees WHERE department IS NULL;",
        explanation: "IS NULL checks for null values. Never use = NULL."
      }
    ],
    intermediate: [
      {
        id: 19,
        question: "Count employees in each department",
        schema: "employees (id, name, department, salary, hire_date)",
        hint: "Use GROUP BY with COUNT()",
        solution: "SELECT department, COUNT(*) FROM employees GROUP BY department;",
        explanation: "GROUP BY groups rows with the same values into summary rows."
      },
      {
        id: 20,
        question: "Find the highest salary in each department",
        schema: "employees (id, name, department, salary, hire_date)",
        hint: "Combine MAX() with GROUP BY",
        solution: "SELECT department, MAX(salary) FROM employees GROUP BY department;",
        explanation: "MAX() finds the maximum value in each group."
      },
      {
        id: 21,
        question: "Get departments with more than 5 employees",
        schema: "employees (id, name, department, salary, hire_date)",
        hint: "Use GROUP BY with HAVING clause",
        solution: "SELECT department, COUNT(*) FROM employees GROUP BY department HAVING COUNT(*) > 5;",
        explanation: "HAVING filters groups after GROUP BY (WHERE filters before grouping)."
      },
      {
        id: 22,
        question: "Join employees with their department details",
        schema: "employees (id, name, dept_id, salary) | departments (dept_id, dept_name, location)",
        hint: "Use INNER JOIN on dept_id",
        solution: "SELECT e.name, d.dept_name, d.location FROM employees e INNER JOIN departments d ON e.dept_id = d.dept_id;",
        explanation: "INNER JOIN combines rows from two tables based on a related column."
      },
      {
        id: 23,
        question: "Find employees hired in the last year, ordered by hire date",
        schema: "employees (id, name, department, salary, hire_date)",
        hint: "Use WHERE with date comparison and ORDER BY",
        solution: "SELECT * FROM employees WHERE hire_date >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR) ORDER BY hire_date DESC;",
        explanation: "Date functions help filter by time periods. ORDER BY sorts results."
      },
      {
        id: 24,
        question: "Calculate average salary by department, show only departments with avg > 55000",
        schema: "employees (id, name, department, salary, hire_date)",
        hint: "Use AVG with GROUP BY and HAVING",
        solution: "SELECT department, AVG(salary) FROM employees GROUP BY department HAVING AVG(salary) > 55000;",
        explanation: "HAVING can filter on aggregated values like AVG()."
      },
      {
        id: 25,
        question: "Get all customers and their orders (including customers with no orders)",
        schema: "customers (customer_id, name, email) | orders (order_id, customer_id, amount, order_date)",
        hint: "Use LEFT JOIN",
        solution: "SELECT c.name, o.order_id, o.amount FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id;",
        explanation: "LEFT JOIN returns all rows from the left table, even if no match in right table."
      },
      {
        id: 26,
        question: "Find departments with total salary expenditure over 200000",
        schema: "employees (id, name, department, salary, hire_date)",
        hint: "Use SUM with GROUP BY and HAVING",
        solution: "SELECT department, SUM(salary) FROM employees GROUP BY department HAVING SUM(salary) > 200000;",
        explanation: "You can use HAVING with any aggregate function including SUM()."
      },
      {
        id: 27,
        question: "Get product names and their category names",
        schema: "products (product_id, product_name, category_id, price) | categories (category_id, category_name)",
        hint: "Use INNER JOIN on category_id",
        solution: "SELECT p.product_name, c.category_name FROM products p INNER JOIN categories c ON p.category_id = c.category_id;",
        explanation: "Joins are essential for combining related data from multiple tables."
      },
      {
        id: 28,
        question: "Find employees earning more than the average company salary",
        schema: "employees (id, name, department, salary, hire_date)",
        hint: "Use a subquery with AVG()",
        solution: "SELECT name, salary FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);",
        explanation: "Subqueries can calculate values to use in WHERE conditions."
      },
      {
        id: 29,
        question: "Count orders per customer, show customer name",
        schema: "customers (customer_id, name, email) | orders (order_id, customer_id, amount, order_date)",
        hint: "Join tables then GROUP BY customer",
        solution: "SELECT c.name, COUNT(o.order_id) FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id GROUP BY c.customer_id, c.name;",
        explanation: "Combine JOIN with GROUP BY to aggregate data across tables."
      },
      {
        id: 30,
        question: "Get year from hire_date and count employees hired each year",
        schema: "employees (id, name, department, salary, hire_date)",
        hint: "Use YEAR() function with GROUP BY",
        solution: "SELECT YEAR(hire_date) as hire_year, COUNT(*) FROM employees GROUP BY YEAR(hire_date);",
        explanation: "Date functions like YEAR() extract parts of dates for grouping."
      },
      {
        id: 31,
        question: "Find customers who have never placed an order",
        schema: "customers (customer_id, name, email) | orders (order_id, customer_id, amount, order_date)",
        hint: "Use LEFT JOIN with WHERE NULL",
        solution: "SELECT c.name FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id WHERE o.order_id IS NULL;",
        explanation: "LEFT JOIN + IS NULL finds records in one table without matches in another."
      },
      {
        id: 32,
        question: "Get the total sales amount per month",
        schema: "orders (order_id, customer_id, amount, order_date)",
        hint: "Use MONTH() and YEAR() with SUM and GROUP BY",
        solution: "SELECT YEAR(order_date), MONTH(order_date), SUM(amount) FROM orders GROUP BY YEAR(order_date), MONTH(order_date);",
        explanation: "Group by multiple date components to aggregate by time periods."
      },
      {
        id: 33,
        question: "Find employees with salary greater than their department minimum",
        schema: "employees (id, name, department, salary, hire_date)",
        hint: "Use correlated subquery with MIN()",
        solution: "SELECT name, department, salary FROM employees e1 WHERE salary > (SELECT MIN(salary) FROM employees e2 WHERE e2.department = e1.department);",
        explanation: "Correlated subqueries reference the outer query for row-by-row comparison."
      },
      {
        id: 34,
        question: "Get products with price higher than average price in their category",
        schema: "products (product_id, product_name, category_id, price)",
        hint: "Use correlated subquery with AVG()",
        solution: "SELECT product_name, category_id, price FROM products p1 WHERE price > (SELECT AVG(price) FROM products p2 WHERE p2.category_id = p1.category_id);",
        explanation: "Compare each row to its group average using correlated subquery."
      },
      {
        id: 35,
        question: "List departments and average salary, ordered by average salary descending",
        schema: "employees (id, name, department, salary, hire_date)",
        hint: "Use GROUP BY with ORDER BY on aggregate",
        solution: "SELECT department, AVG(salary) as avg_salary FROM employees GROUP BY department ORDER BY avg_salary DESC;",
        explanation: "You can order by aggregated columns using their alias."
      },
      {
        id: 36,
        question: "Find the most recent order for each customer",
        schema: "orders (order_id, customer_id, amount, order_date)",
        hint: "Use subquery with MAX(order_date)",
        solution: "SELECT customer_id, MAX(order_date) as last_order FROM orders GROUP BY customer_id;",
        explanation: "MAX() with dates finds the most recent date in each group."
      }
    ],
    advanced: [
      {
        id: 37,
        question: "Find employees earning above their department's average salary",
        schema: "employees (id, name, department, salary, hire_date)",
        hint: "Use a correlated subquery to calculate average per department",
        solution: "SELECT e1.name, e1.department, e1.salary FROM employees e1 WHERE e1.salary > (SELECT AVG(e2.salary) FROM employees e2 WHERE e2.department = e1.department);",
        explanation: "Correlated subquery compares each employee to their department's average."
      },
      {
        id: 38,
        question: "Rank employees by salary within each department",
        schema: "employees (id, name, department, salary, hire_date)",
        hint: "Use RANK() window function with PARTITION BY",
        solution: "SELECT name, department, salary, RANK() OVER (PARTITION BY department ORDER BY salary DESC) as rank FROM employees;",
        explanation: "Window functions perform calculations across related rows without grouping."
      },
      {
        id: 39,
        question: "Find the second highest salary in each department",
        schema: "employees (id, name, department, salary, hire_date)",
        hint: "Use DENSE_RANK() or a subquery approach",
        solution: "SELECT department, salary FROM (SELECT department, salary, DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) as rnk FROM employees) t WHERE rnk = 2;",
        explanation: "DENSE_RANK() assigns ranks without gaps, useful for finding nth values."
      },
      {
        id: 40,
        question: "Calculate running total of salaries ordered by hire date",
        schema: "employees (id, name, department, salary, hire_date)",
        hint: "Use SUM() as a window function",
        solution: "SELECT name, hire_date, salary, SUM(salary) OVER (ORDER BY hire_date) as running_total FROM employees;",
        explanation: "Window functions can calculate cumulative values without collapsing rows."
      },
      {
        id: 41,
        question: "Find employees who earn more than all employees in the IT department",
        schema: "employees (id, name, department, salary, hire_date)",
        hint: "Use subquery with ALL keyword or MAX()",
        solution: "SELECT name, department, salary FROM employees WHERE salary > (SELECT MAX(salary) FROM employees WHERE department = 'IT');",
        explanation: "Subqueries can be used to find values relative to other subsets of data."
      },
      {
        id: 42,
        question: "Calculate the difference between each employee's salary and department average",
        schema: "employees (id, name, department, salary, hire_date)",
        hint: "Use AVG() as window function",
        solution: "SELECT name, department, salary, salary - AVG(salary) OVER (PARTITION BY department) as diff_from_avg FROM employees;",
        explanation: "Window functions can reference aggregate values in calculations."
      },
      {
        id: 43,
        question: "Find the top 3 highest paid employees in each department",
        schema: "employees (id, name, department, salary, hire_date)",
        hint: "Use ROW_NUMBER() with PARTITION BY and filter",
        solution: "SELECT * FROM (SELECT name, department, salary, ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) as rn FROM employees) t WHERE rn <= 3;",
        explanation: "ROW_NUMBER assigns unique sequential numbers within partitions."
      },
      {
        id: 44,
        question: "Calculate month-over-month sales growth percentage",
        schema: "sales (sale_id, sale_date, amount)",
        hint: "Use LAG() window function to get previous month",
        solution: "SELECT YEAR(sale_date), MONTH(sale_date), SUM(amount) as total, (SUM(amount) - LAG(SUM(amount)) OVER (ORDER BY YEAR(sale_date), MONTH(sale_date))) / LAG(SUM(amount)) OVER (ORDER BY YEAR(sale_date), MONTH(sale_date)) * 100 as growth_pct FROM sales GROUP BY YEAR(sale_date), MONTH(sale_date);",
        explanation: "LAG() accesses data from a previous row for comparison."
      },
      {
        id: 45,
        question: "Find employees hired within 30 days after another employee in the same department",
        schema: "employees (id, name, department, salary, hire_date)",
        hint: "Self join with date comparison",
        solution: "SELECT e1.name, e1.department, e1.hire_date, e2.name as hired_after, e2.hire_date FROM employees e1 JOIN employees e2 ON e1.department = e2.department AND e1.hire_date > e2.hire_date AND e1.hire_date <= DATE_ADD(e2.hire_date, INTERVAL 30 DAY);",
        explanation: "Self joins compare rows within the same table."
      },
      {
        id: 46,
        question: "Get customer lifetime value (total orders amount) with percentile ranking",
        schema: "orders (order_id, customer_id, amount, order_date)",
        hint: "Use PERCENT_RANK() window function",
        solution: "SELECT customer_id, SUM(amount) as lifetime_value, PERCENT_RANK() OVER (ORDER BY SUM(amount)) as percentile FROM orders GROUP BY customer_id;",
        explanation: "PERCENT_RANK() shows the relative rank as a percentage (0 to 1)."
      },
      {
        id: 47,
        question: "Find products that have never been ordered",
        schema: "products (product_id, product_name, price) | order_items (item_id, order_id, product_id, quantity)",
        hint: "Use LEFT JOIN or NOT EXISTS",
        solution: "SELECT p.product_name FROM products p LEFT JOIN order_items oi ON p.product_id = oi.product_id WHERE oi.product_id IS NULL;",
        explanation: "Find orphaned records by checking for NULL after LEFT JOIN."
      },
      {
        id: 48,
        question: "Calculate the moving average of sales over the last 3 months",
        schema: "monthly_sales (year, month, total_sales)",
        hint: "Use AVG() with ROWS BETWEEN window frame",
        solution: "SELECT year, month, total_sales, AVG(total_sales) OVER (ORDER BY year, month ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) as moving_avg FROM monthly_sales;",
        explanation: "Window frames define which rows to include in window calculations."
      },
      {
        id: 49,
        question: "Find employees whose salary is in the top 10% of their department",
        schema: "employees (id, name, department, salary, hire_date)",
        hint: "Use NTILE(10) window function",
        solution: "SELECT * FROM (SELECT name, department, salary, NTILE(10) OVER (PARTITION BY department ORDER BY salary DESC) as decile FROM employees) t WHERE decile = 1;",
        explanation: "NTILE(n) divides rows into n groups of similar size."
      },
      {
        id: 50,
        question: "Get the first and last hire date in each department",
        schema: "employees (id, name, department, salary, hire_date)",
        hint: "Use FIRST_VALUE and LAST_VALUE window functions",
        solution: "SELECT DISTINCT department, FIRST_VALUE(hire_date) OVER (PARTITION BY department ORDER BY hire_date) as first_hire, LAST_VALUE(hire_date) OVER (PARTITION BY department ORDER BY hire_date ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) as last_hire FROM employees;",
        explanation: "FIRST_VALUE and LAST_VALUE get the first/last value in a window frame."
      },
      {
        id: 51,
        question: "Find gaps in order IDs (missing order numbers)",
        schema: "orders (order_id, customer_id, amount, order_date)",
        hint: "Use LEAD() to compare consecutive order_ids",
        solution: "SELECT order_id, LEAD(order_id) OVER (ORDER BY order_id) as next_id FROM orders WHERE LEAD(order_id) OVER (ORDER BY order_id) - order_id > 1;",
        explanation: "LEAD() accesses the next row's value for sequential analysis."
      },
      {
        id: 52,
        question: "Calculate year-to-date sales cumulative total",
        schema: "sales (sale_id, sale_date, amount)",
        hint: "Use SUM() window with frame from start of year",
        solution: "SELECT sale_date, amount, SUM(amount) OVER (PARTITION BY YEAR(sale_date) ORDER BY sale_date) as ytd_total FROM sales;",
        explanation: "Partition by year and order by date for year-to-date calculations."
      },
      {
        id: 53,
        question: "Find duplicate employee records (same name and department)",
        schema: "employees (id, name, department, salary, hire_date)",
        hint: "Use GROUP BY with HAVING COUNT > 1",
        solution: "SELECT name, department, COUNT(*) FROM employees GROUP BY name, department HAVING COUNT(*) > 1;",
        explanation: "Group by multiple columns to find duplicate combinations."
      },
      {
        id: 54,
        question: "Get the median salary for each department",
        schema: "employees (id, name, department, salary, hire_date)",
        hint: "Use PERCENTILE_CONT or ROW_NUMBER approach",
        solution: "SELECT department, AVG(salary) as median FROM (SELECT department, salary, ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary) as rn, COUNT(*) OVER (PARTITION BY department) as cnt FROM employees) t WHERE rn IN (FLOOR((cnt + 1) / 2), CEIL((cnt + 1) / 2)) GROUP BY department;",
        explanation: "Median requires finding middle value(s) using row numbers."
      }
    ]
  };

  const currentQuestions = questions[difficulty];
  const currentQ = currentQuestions[currentQuestion];
  const progress = (completedQuestions.size / currentQuestions.length) * 100;

  const checkAnswer = () => {
    const normalized = userAnswer.trim().toLowerCase().replace(/\s+/g, ' ');
    const solutionNormalized = currentQ.solution.toLowerCase().replace(/\s+/g, ' ');
    
    if (normalized.includes(solutionNormalized.slice(0, -1))) {
      setFeedback('correct');
      setCompletedQuestions(new Set([...completedQuestions, currentQ.id]));
    } else {
      setFeedback('incorrect');
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setUserAnswer('');
      setShowHint(false);
      setShowSolution(false);
      setFeedback(null);
    }
  };

  const resetProgress = () => {
    setCurrentQuestion(0);
    setUserAnswer('');
    setShowHint(false);
    setShowSolution(false);
    setFeedback(null);
    setCompletedQuestions(new Set());
  };

  const changeDifficulty = (level) => {
    setDifficulty(level);
    resetProgress();
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'} p-4 transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl p-6 mb-6 transition-colors duration-300`}>
          <div className="flex items-center justify-between mb-4">
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-indigo-400' : 'text-indigo-700'}`}>SQL Interview Prep</h1>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-700'} hover:opacity-80 transition`}
                title="Toggle dark mode"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
              <Award className="text-yellow-500" size={32} />
            </div>
          </div>
          
          <div className="flex gap-2 mb-4">
            {['beginner', 'intermediate', 'advanced'].map(level => (
              <button
                key={level}
                onClick={() => changeDifficulty(level)}
                className={`px-4 py-2 rounded-lg font-medium capitalize transition ${
                  difficulty === level
                    ? 'bg-indigo-600 text-white'
                    : darkMode 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {level}
              </button>
            ))}
          </div>

          <div className="mb-4">
            <div className={`flex justify-between text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
              <span>Progress: {completedQuestions.size}/{currentQuestions.length} completed</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl p-6 transition-colors duration-300`}>
          <div className="mb-4">
            <div className="flex justify-between items-start mb-2">
              <h2 className={`text-xl font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                Question {currentQuestion + 1} of {currentQuestions.length}
              </h2>
              {completedQuestions.has(currentQ.id) && (
                <CheckCircle className="text-green-500" size={24} />
              )}
            </div>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>{currentQ.question}</p>
            <div className={`${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-100'} p-3 rounded text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} font-mono border`}>
              Schema: {currentQ.schema}
            </div>
          </div>

          <div className="mb-4">
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Your SQL Query:
            </label>
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className={`w-full h-32 p-3 border rounded-lg font-mono text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${
                darkMode 
                  ? 'bg-gray-900 border-gray-700 text-gray-200 placeholder-gray-500' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              placeholder="Type your SQL query here..."
            />
          </div>

          {feedback && (
            <div
              className={`mb-4 p-4 rounded-lg flex items-start gap-3 ${
                feedback === 'correct'
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
              }`}
            >
              {feedback === 'correct' ? (
                <>
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-semibold text-green-800">Correct!</p>
                    <p className="text-green-700 text-sm">{currentQ.explanation}</p>
                  </div>
                </>
              ) : (
                <>
                  <XCircle className="text-red-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-semibold text-red-800">Not quite right. Try again!</p>
                    <p className="text-red-700 text-sm">Check your syntax and logic.</p>
                  </div>
                </>
              )}
            </div>
          )}

          <div className="flex gap-3 mb-4">
            <button
              onClick={checkAnswer}
              className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              Check Answer
            </button>
            <button
              onClick={() => setShowHint(!showHint)}
              className="px-6 py-3 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 transition"
            >
              {showHint ? 'Hide' : 'Show'} Hint
            </button>
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition"
            >
              {showSolution ? 'Hide' : 'Show'} Solution
            </button>
          </div>

          {showHint && (
            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="font-semibold text-yellow-800 mb-1">Hint:</p>
              <p className="text-yellow-700">{currentQ.hint}</p>
            </div>
          )}

          {showSolution && (
            <div className={`mb-4 p-4 ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'} border rounded-lg`}>
              <p className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'} mb-2`}>Solution:</p>
              <pre className={`${darkMode ? 'bg-gray-950' : 'bg-gray-800'} text-green-400 p-3 rounded text-sm overflow-x-auto`}>
                {currentQ.solution}
              </pre>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-700'} text-sm mt-2`}>{currentQ.explanation}</p>
            </div>
          )}

          <div className="flex gap-3">
            {currentQuestion < currentQuestions.length - 1 ? (
              <button
                onClick={nextQuestion}
                className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition flex items-center justify-center gap-2"
              >
                Next Question <ChevronRight size={20} />
              </button>
            ) : (
              <button
                onClick={resetProgress}
                className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition flex items-center justify-center gap-2"
              >
                <RotateCcw size={20} /> Start Over
              </button>
            )}
          </div>
        </div>

        <div className={`mt-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl p-6 transition-colors duration-300`}>
          <h3 className={`text-lg font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'} mb-3`}>Interview Tips:</h3>
          <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 font-bold">•</span>
              <span>Always start by understanding the schema and relationships</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 font-bold">•</span>
              <span>Think about edge cases (NULL values, empty results)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 font-bold">•</span>
              <span>Explain your thought process as you write queries</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 font-bold">•</span>
              <span>Know the difference between WHERE and HAVING</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 font-bold">•</span>
              <span>Practice window functions - they're common in interviews</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SQLPractice;