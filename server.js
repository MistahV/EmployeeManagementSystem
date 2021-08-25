const mysql = require('mysql');
require('console.table');
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Jackfrost1%',
  database: 'employees',
});

const readEmployees = () => {
    connection.query('SELECT * FROM employees', (err, res) => {
    if (err) throw err;
    console.table(res);
    connection.end();
  });
};
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    readEmployees();
});