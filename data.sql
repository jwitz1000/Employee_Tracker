DROP DATABASE IF EXISTS employee_DB;
CREATE database employee_DB;
USE employee_DB;
CREATE TABLE employee
(
  idd INT
  AUTO_INCREMENT,
  first_name VARCHAR
  (30),
  last_name VARCHAR
  (30),
  role_id Int NOT NULL,
  manager_id int,
  PRIMARY KEY
  (idd)
);
  CREATE TABLE department
  (
    id INT
    AUTO_INCREMENT,
  department_name VARCHAR
    (30),
  PRIMARY KEY
    (id)
);

    CREATE TABLE role
    (
      id INT
      AUTO_INCREMENT,
  title VARCHAR
      (30),
  salary decimal
      (10,4),
  department_id INT,
  PRIMARY KEY
      (id)
);

      -- INSERT INTO employee
      --   (first_name,last_name, role_id,manager_id)
      -- VALUES( "Arman", "Riahi", 1, 5);


      -- INSERT INTO employee
      --   (first_name,last_name, role_id,manager_id)
      -- VALUES( "Sheldon", "Foz", 3, 5);

      -- INSERT INTO employee
      --   (first_name,last_name, role_id,manager_id)
      -- VALUES( "Ralph", "Lauren", 2, 6);


      -- INSERT INTO role
      --   (title, salary, department_id)
      -- VALUES( "Engineer", 100, 1);

      -- INSERT INTO role
      --   (title, salary, department_id)
      -- VALUES( "Salesmen", 90, 2);

      -- INSERT INTO role
      --   (title, salary, department_id)
      -- VALUES( "Custodian", 10, 2);

      -- INSERT INTO department
      --   (department_name)
      -- VALUES( "Developement");

      -- INSERT INTO department
      --   (department_name)
      -- VALUES( "Sales");

