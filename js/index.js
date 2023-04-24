const inquirer = require('inquirer');
const db = require('../config/connection')


const viewAllDeptQuery = require('./deptQuery');
const viewAllRolesQuery = require('./rolesQuery');
const viewAllEmployeesQuery = require('./employeeQuery');

const optionsList = [
  {
    type: 'list',
    name: 'optionsList',
    message: 'What would you like to do?',
    choices: [
      'View Departments',
      'View Roles',
      'View Employees',
      'Add Department',
      'Add Role',
      'Add Employee',
      'Update Employee Role',
      'Delete Employee',
      'End'
    ]
  },
];

const options = async () => {
  await inquirer.prompt(optionsList).then((answers) => {
    console.log('Answer:', answers.optionsList);
    const answer = answers.optionsList;
    switch (answer) {

      case 'View Departments':
        viewDepartments();
        break;

      case 'View Roles':
        viewRoles();
        break;

      case 'View Employees':
        viewEmployees();
        break;

      case 'Add Department':
        addDepartment();
        break;

      case 'Add Role':
        addRole();
        console.log('I want to add a role.');
        break;

      case 'Add Employee':
        addEmployee();
        console.log('I want to add an employee.');
        break;

      case 'Update Employee Role':
        updateEmployeeRole();
        console.log('I want to update an employee role.');
        break;


      case 'Delete Employee':
        deleteEmployee();
        console.log('I want to delete an employee');
        break;

      default:
        db.end();
        finished();
        process.exit();
    }
  });
};

const viewDepartments = async () => {
  const data = await new Promise((resolve, reject) => {
    db.query(viewAllDeptQuery, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    });
  });
  console.log('');
  console.table(data);
  options();
};

const viewRoles = async () => {
  const data = await new Promise((resolve, reject) => {
    db.query(viewAllRolesQuery, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
  console.log('');
  console.table(data);
  options();
};

const viewEmployees = async () => {
  const data = await new Promise((resolve, reject) => {
    db.query(viewAllEmployeesQuery, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    });
  });
  console.log('');
  console.table(data);
  options();
};

const addDepartment = async () => {
  await inquirer.prompt([
    {
      type: 'input',
      message: 'Which Department would you like to Add?',
      name: 'depts',
    },
  ])
    .then((answers) => {
      const department = answers.depts;
      const sql = `INSERT INTO department (department_name) VALUES ('${department}')`;
      db.query(sql, function (err, results) {
        if (err) {
          console.log(err);
        } else {
          console.log('');
          options();
        }
      });
    });
};

const addRole = () => {
  db.query(`SELECT id, department_name FROM department`,
    async function (err, results) {
      if (err) {
      } else {

        let deptArray = results.map((obj) => {
          return { value: obj.id, name: obj.department_name };
        });
        await inquirer.prompt([
          {
            type: 'input',
            name: 'roleTitle',
            message: 'What Role would you like to add?',
          },
          {
            type: 'input',
            name: 'roleSalary',
            message: 'What is the salary of the Role?',
          },
          {
            type: 'list',
            name: 'roleDept',
            message: 'What is the Department for the Role?',
            choices: deptArray,
          },
        ])
          .then((answers) => {
            const title = answers.roleTitle;
            const salary = answers.roleSalary;
            const department = answers.roleDept;
            db.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${title}', ${salary}, ${department})`,
              function (err, results) {
                if (err) {
                  console.log(err);
                } else {
                  console.log('');
                  options();
                }
              });
          });
      }
    })
}

const addEmployee = () => {
  db.query(
    `SELECT id, title FROM roles`,
    async function (err, results) {
      if (err) {
        console.log(err);
      } else {
        let roleQueryArray = results.map((obj) => {
          return { value: obj.id, name: obj.title };
        });
        const queryEmployees = `SELECT id, first_name, last_name FROM employees ORDER BY id ASC`;
        db.query(queryEmployees, async function (err, results) {
          if (err) {
            console.log(err);
          } else {
            let employeeQueryArray = results.map((obj) => {
              return {
                value: obj.id,
                name: obj.first_name + ' ' + obj.last_name,
              };
            });
            employeeQueryArray.push({ value: 'NULL', name: 'None' });
            await inquirer
              .prompt([
                {
                  type: 'input',
                  name: 'firstName',
                  message: 'What is the employee\'s first name?',
                },
                {
                  type: 'input',
                  name: 'lastName',
                  message: 'What is the employee\'s last name?',
                },
                {
                  type: 'list',
                  name: 'employeeRole',
                  message: 'What is the employee\'s role?',
                  choices: roleQueryArray,
                },
                {
                  type: 'list',
                  name: 'manager',
                  message: 'Who is the employees Manager',
                  choices: employeeQueryArray,
                },
              ])
              .then((answers) => {
                const first = answers.firstName;
                const last = answers.lastName;
                const role = answers.employeeRole;
                const manager = answers.manager;
                const addEmployeeQuery = `
                  INSERT INTO employees (first_name, last_name, role_id, manager_id)
                  VALUES ('${first}', '${last}', ${role}, ${manager})`;
                db.query(addEmployeeQuery, async function (err, results) {
                  if (err) {
                    console.log(err);
                  }
                });
                console.log('');
                options();
              });
          }
        });
      }
    }
  );
};

const updateEmployeeRole = () => {
  db.query(
    `SELECT id, employees.first_name, employees.last_name FROM employees`,
    async function (err, results) {
      if (err) {
        console.log(err);
      } else {
        let employeeQueryArray = results.map((obj) => {
          return {
            value: obj.id,
            name: obj.first_name + ' ' + obj.last_name,
          };
        });
        db.query(`SELECT id, title FROM roles`,
          async (err, results) => {
            if (err) {
              console.log(err);
            } else {
              let roleQueryArray = results.map((obj) => {
                return {
                  value: obj.id,
                  name: obj.title,
                };
              });
              await inquirer
                .prompt([
                  {
                    type: 'list',
                    name: 'employeeName',
                    message: `Which employee's role do you want to update?`,
                    choices: employeeQueryArray,
                  },
                  {
                    type: 'list',
                    name: 'roleName',
                    message:
                      'Which role do you want to assign the selected employee?',
                    choices: roleQueryArray,
                  },
                ])
                .then((answers) => {
                  const id = answers.employeeName;
                  const roleId = answers.roleName;
                  db.query(
                    `UPDATE employees SET role_id = ${roleId} WHERE id = ${id}`,
                    (err, results) => {
                      if (err) {
                        console.log(err);
                      }
                      console.log('');
                      options();
                    }
                  );
                });
            }
          });
      }
    }
  );
};

const deleteEmployee = () => {
  let query = "SELECT employees.id, employees.first_name, employees.last_name FROM employees;";
  db.query(query, function (err, res) {
    if (err) throw err;
    for (i = 0; i < res.length; i++) {
      res[i].employee = res[i].first_name + " " + res[i].last_name;
      delete res[i].first_name;
      delete res[i].last_name;
    };
    console.table(res);
    let employeeList = res;
    let addEmpPrompt = [
      {
        name: "select_employee",
        type: "list",
        message: "Terminate employee",
        choices: function () {
          employees = [];
          for (i = 0; i < employeeList.length; i++) {
            employees.push(employeeList[i].id + ": " + employeeList[i].employee);
          };
          employees.unshift("0: Exit");
          return employees;
        }
      },
      {
        name: "confirm",
        type: "list",
        message: function (answers) {
          return "Are you sure you want to TERMINATE " + answers.select_employee.split(": ")[1];
        },
        choices: ["Yes", "No"],
        when: function (answers) {
          return answers.select_employee !== "0: Exit";
        }
      }
    ];
    inquirer.prompt(addEmpPrompt)
      .then(function (answer) {
        if (answer.select_employee == "0: Exit") {
          options();
        } else if (answer.confirm == "No") {
          deleteEmployee();
        } else {
          let query = "DELETE FROM employees WHERE employees.id =" + answer.select_employee.split(": ")[0];
          db.query(query, function (err, res) {
            if (err) throw err;
          });
          let addagainPrompt = [
            {
              name: "again",
              type: "list",
              message: "Would you like to remove another employee?",
              choices: ["Yes", "Exit"]
            }
          ];
          inquirer.prompt(addagainPrompt)
            .then(function (answer) {

              let query = "SELECT employees.id, employees.first_name, employees.last_name FROM employees;";
              db.query(query, function (err, res) {
                if (err) throw err;
                for (i = 0; i < res.length; i++) {
                  res[i].employee = res[i].first_name + " " + res[i].last_name;
                  delete res[i].first_name;
                  delete res[i].last_name;
                };
                if (answer.again == "Yes") {
                  deleteEmployee();
                } else if (answer.again == "Exit") {

                  console.table(res);
                  options();
                };
              });
            });
        };
      });
  });
};


const finished = () => {
  console.log('finished');
}

module.exports = options;