const mysql = require('mysql2');
const inquirer = require('inquirer')
// require('console.table');
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Jackfrost1%',
  database: 'employees',
});

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    mainMenu();
});

const mainMenu = () => {
    inquirer.prompt(questions).then(({choice}) => {
        if(choice === "View all Employees") {
            readEmployees()
        } else if(choice === "View all Departments") {
            readDepartments()
        } else if(choice === "Exit"){
            connection.end()
        } else if(choice === "Add Departments"){
            addDept()
        }
    })
}

const readEmployees = () => {
    let sqlString = `
    SELECT first_name, last_name, salary, title, dept_name, manager_id
    FROM employees
    JOIN roles
    ON role_id = roles.id
    JOIN departments
    ON department_id = departments.id`

    connection.query(sqlString, (err, res) => {
    if (err) throw err;
    console.log("\n")
    console.table(res);
    console.log("\n")
    mainMenu()
  });
};

const readDepartments = () => {
    let sqlString = `
    SELECT dept_name
    FROM departments`

    connection.query(sqlString, (err, res) => {
        if(err) throw err;
        console.log("\n")
        console.table(res);
        console.log("\n")
        mainMenu()
    })
}

const addDept = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "newDept",
            message: "Enter the name of the new department:"
        }
    ]).then(({newDept}) => {
        const sqlString = `
        INSERT INTO departments (dept_name)
        VALUES (?)`

        connection.query(sqlString, [newDept], (err, res) => {
            if(err) throw err;
            mainMenu();
        })
    })
}

const questions = [
    {
        name: "choice",
        type: "list",
        message: "What do?",
        choices: ["View all Departments",
        "View all Roles",
        "View all Employees",
        "Add Departments",
        "Exit"]
    },
]