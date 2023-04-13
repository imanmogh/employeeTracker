const viewAllEmployeesQuery = `
SELECT 
    employees.id AS "Employee ID", 
    employees.first_name AS "First Name", 
    employees.last_name AS "Last Name", 
    roles.title AS "Job Title", 
    department.department_name AS "Department", 
    roles.salary AS "Salary",
    CONCAT(manager.first_name, " ", manager.last_name) AS "Manager"
FROM employees
    JOIN roles ON employees.role_id = roles.id
    JOIN department ON roles.department_id = department.id
    LEFT JOIN employees AS manager ON employees.manager_id = manager.id
ORDER BY 
    employees.id ASC;`;
 
module.exports = viewAllEmployeesQuery;