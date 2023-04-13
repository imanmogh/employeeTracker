SELECT id AS "Department ID", department_name AS "Department" 
FROM department;

SELECT roles.id AS "Role ID", roles.title AS "Job Title", department.department_name AS "Department", salary AS "Salary"
FROM roles
INNER JOIN department ON roles.department_id = department.id
ORDER BY roles.id ASC

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
    employees.id ASC;

INSERT INTO department (department_name) 
VALUES ('Field Ops')

INSERT INTO roles (title, salary, department_id) 
VALUES ('Coordinator', 75000, 2);


SELECT id, title FROM roles


SELECT id, first_name, last_name FROM employees ORDER BY id ASC

SELECT id, employees.first_name, employees.last_name FROM employees

SELECT employees.id, employees.first_name, employees.last_name FROM employees;

INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES ('Lauren', 'Mountains', 7, 'null')

UPDATE employees
SET role_id = 5
WHERE id = 9

SELECT employees.first_name AS 'First Name', 
employees.last_name AS 'Last Name' 
FROM employees

SELECT title AS 'Job Title' FROM roles

SELECT id as "Employee ID", CONCAT(employees.first_name, " ", employees.last_name) AS "Name"
FROM employees

SELECT CONCAT(manager.first_name, " ", manager.last_name) AS "Manager"
FROM employees
    JOIN employees AS manager ON employees.manager_id = manager.id
ORDER BY 
    manager.last_name ASC;
