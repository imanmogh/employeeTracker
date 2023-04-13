const viewAllRolesQuery = `
SELECT roles.id AS "Role ID", roles.title AS "Job Title",
    department.department_name AS "Department", salary AS "Salary"
FROM roles
INNER JOIN department ON roles.department_id = department.id
ORDER BY roles.id ASC`;
    
module.exports = viewAllRolesQuery;