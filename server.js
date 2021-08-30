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
    inquirer.prompt(question).then(({choice}) => {
        if(choice === "View all Employees") {
            readEmployees()
        } else if(choice === "View all Departments") {
            readDepartments()
        } else if(choice === "View all Roles") {
            readRoles()
        }  else if(choice === "Add Departments"){
            addDept()
        } else if(choice === "Add Roles"){
            addRole()
        } else if(choice === "Add Employees"){
            addEmployee()
        } else if(choice === "Exit"){
            connection.end()
        }
    });
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

const readRoles = () => {
    let sqlString = `
    SELECT title, salary, department_id
    FROM roles
    JOIN departments
    ON department_id = departments.id`

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

const addRole = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "newRole",
            message: "Enter the name of the new role:"
        },
        {
            type: "input",
            name: "newRoleSalary",
            message: "Enter the annual salary amount for the new role:"
        },
        {
            type: "input",
            name: "newRoleID",
            message: "Enter the department ID for the new role:"
        }
    ]).then(({newRole, newRoleSalary, newRoleID}) => {
        const sqlString = `
        INSERT INTO roles (title, salary, department_id)
        VALUES (?,?,?)`

        connection.query(sqlString, [newRole, newRoleSalary,newRoleID], (err, res) => {
            if(err) throw err;
            mainMenu();
        })
    })
}

const addEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "newEmployeeFirst",
            message: "Enter the FIRST name of the new employee:"
        },
        {
            type: "input",
            name: "newEmployeeLast",
            message: "Enter the LAST name of the new employee:"
        },
        {
            type: "input",
            name: "newEmployeeRoleID",
            message: "Enter the corresponding role ID for the new employee:"
        },
        {
            type: "input",
            name: "newEmployeeManager",
            message: "Enter the corresponding manager ID for the new employee (just press _____ if none):"
        }
    ]).then(({newEmployeeFirst, newEmployeeLast, newEmployeeRoleID, newEmployeeManager}) => {
        const sqlString = `
        INSERT INTO employees (first_name, last_name, role_id, manager_id)
        VALUES (?,?,?,?)`

        connection.query(sqlString, [newEmployeeFirst, newEmployeeLast, newEmployeeRoleID, newEmployeeManager], (err, res) => {
            if(err) throw err;
            mainMenu();
        })
    })
}




const question = [
    {
        name: "choice",
        type: "list",
        message: "What would you like to do?",
        choices: ["View all Departments",
        "View all Roles",
        "View all Employees",
        "Add Departments",
        "Add Roles",
        "Add Employees",
        "Exit"]
    },
]