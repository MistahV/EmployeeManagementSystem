drop table if exists employees;
create database if not exists employees;

use employees;

create table departments (
    id int auto_increment primary key,
    dept_name VARCHAR(30)
);

create table roles (
    id int auto_increment primary key,
    title VARCHAR(30),
    salary DECIMAL(10,2),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(id)
)

create table employees (
    id int auto_increment primary key,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL
)
