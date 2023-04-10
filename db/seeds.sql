INSERT INTO department (id, department_name)
VALUES (1, "Accounting"),
       (2, "Marketing"),
       (3, "IT"),
       (4, "HR");

INSERT INTO roles (id, title, salary, department_id)
VALUES (1, "Accounting Manager", 95000, 1),
       (2, "Director of Marketing", 70000, 2),
       (3, "IT Specialist", 112000, 3),
       (4, "Web Developer", 125000, 3),
       (5, "Recruiter", 60000, 4),
       (6, "Employee Relation Manager", 85000, 4),
       (7, "Quality Assurance Tester", 90000, 3),
       (8, "Accountant", 80000, 1),
       (9, "Business analyst", 75000, 1);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Bob", "Kollen", 1, 1),
       (2, "Keith", "Ruben", 2, 2),
       (3, "Spencer", "Ellie", 3, NULL),
       (4, "Robin", "Brew", 4, NULL),
       (5, "Trey", "Rhine", 5, NULL),
       (6, "Jake", "Ruben", 6, 3),
       (7, "Frank", "Sanchez", 7, NULL),
       (8, "Paul", "Mayor", 8, NULL),
       (9, "Trent", "Weaver", 9, NULL);
       