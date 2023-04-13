const mysql2 = require('mysql2');
require('dotenv').config();

// connect to database
const db = mysql2.createConnection(
  {
    host: process.env.DB_HOST_NAME,
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

//  export database
module.exports = db;