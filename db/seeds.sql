USE employees;

INSERT INTO departments(dept_name)
VALUES ("Sales"),
("HR"),
("Marketing"),
("RnD");

INSERT INTO roles (title, salary, department_id)
VALUES("Salesperson", 49000.00, 1),
("Hiring Manager", 85000.00, 2),
("Marketing Specialist", 100000.00, 3),
("Genius Scientist", 13000.00, 4);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES("John", "Johnson", 3, NULL),
("Rick", "Ronson", 1, 1),
("Bob", "Smith", 2, NULL),
("Ludwig", "Beethoven", 4, 3);