var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  password: "password",
  user: "root",
  database: "employee_DB"
});

connection.connect(function(err) {
  if (err) throw err;
});

let initialQ = {
  name: "decide",
  message: "What would you like to do?",
  type: "list",
  choices: ["Add", "View", "Update Employee Role"]
};

let addQ = [
  {
    name: "decide",
    message: "What would you like to add?",
    type: "list",
    choices: ["Employee", "Role", "Department"]
  }
];

let viewQ = [
  {
    name: "decide",
    message: "What would you like to view?",
    type: "list",
    choices: ["Employee", "Role", "Department"]
  }
];

let employeeAddQ = [
  { name: "firstName", type: "input", message: "First name of employee" },
  { name: "lastName", type: "input", message: "Last name of employee" },
  { name: "role_id", type: "list", message: "Role ID of employee" },
  { name: "manager_id", type: "input", message: "Manager ID of employee" }
];

let roleAddQ = [
  { name: "title", type: "input", message: "Title?" },
  { name: "salary", type: "input", message: "Salary?" },
  {
    name: "department_id",
    type: "list",
    message: "Department ID?"
  }
];

let departmentAddQ = [
  { name: "name", type: "input", message: "Name of department" }
];

let updateQ = [
  {
    name: "update",
    type: "list",
    message: "Which emplyee's role would you like to update (by idd)?"
  },
  {
    name: "updated",
    type: "list",
    message: "Which role would you like (by id)?"
  }
];

inquirer.prompt(initialQ).then(choicesInit);

function choicesInit(answer) {
  switch (answer.decide) {
    case "Add":
      inquirer.prompt(addQ).then(function(answer) {
        switch (answer.decide) {
          case "Employee":
            var query = connection.query("Select * from role", function(
              err,
              res
            ) {
              let map1 = res.map(obj => obj.id);
              employeeAddQ[2].choices = map1;
              inquirer.prompt(employeeAddQ).then(addEmployee);
            });
            break;
          case "Role":
            var query = connection.query("Select * from department", function(
              err,
              res
            ) {
              let map2 = res.map(obj => obj.id);
              // console.log(map2);
              roleAddQ[2].choices = map2;
              inquirer.prompt(roleAddQ).then(addRole);
            });
            break;
          case "Department":
            inquirer.prompt(departmentAddQ).then(addDepartment);
            break;
        }
      });
      break;

    case "View":
      show();
      break;

    case "Update Employee Role":
      var query1 = connection.query(
        // "Select employee.idd,role.id from employee left JOIN role on role.id = employee.idd",
        "Select * from employee left outer JOIN role on role.id = employee.idd UNION Select * from employee right outer JOIN role on role.id = employee.idd",

        function(err, res) {
          console.table(res);
          let map1 = res.filter(obj => obj.idd !== null).map(obj => obj.idd);
          updateQ[0].choices = map1;
          let map2 = res.filter(obj => obj.id !== null).map(obj => obj.id);

          updateQ[1].choices = map2;
          // console.log(updateQ);
          inquirer.prompt(updateQ).then(updated);
        }
      );
      break;
  }
}

function addEmployee(answer) {
  var query = connection.query(
    "INSERT INTO employee SET ?",
    {
      first_name: answer.firstName,
      last_name: answer.lastName,
      role_id: answer.role_id,
      manager_id: answer.manager_id
    },
    function(err, res) {
      // console.log(res);
    }
  );
  inquirer.prompt(initialQ).then(choicesInit);
}

function addRole(answer) {
  var query = connection.query(
    "INSERT INTO role SET ?",
    {
      title: answer.title,
      salary: answer.salary,
      department_id: answer.department_id
    },
    function(err, res) {
      // console.log(res);
    }
  );
  inquirer.prompt(initialQ).then(choicesInit);
}

function addDepartment(answer) {
  var query = connection.query(
    "INSERT INTO department SET ?",
    {
      department_name: answer.name
    },
    function(err, res) {
      // console.log(res);
    }
  );
  inquirer.prompt(initialQ).then(choicesInit);
}

function show() {
  var query = connection.query(
    " SELECT first_name,last_name, manager_id, title,salary, department.department_name   FROM employee  INNER JOIN role ON role.id = employee.role_id INNER JOIN department ON role.department_id = department.id",
    function(err, res) {
      console.table(res);
      inquirer.prompt(initialQ).then(choicesInit);
    }
  );
}

function update() {
  var query = connection.query("Select * from role", function(err, res) {
    let map1 = res.map(obj => obj.id);
    updatedQ[0].choices = map1;
    // console.log(res);
  });
}

function updated(answer) {
  // console.log(answer);
  var query = connection.query(
    "UPDATE employee SET ? WHERE ?",
    [{ role_id: answer.updated }, { idd: answer.update }],
    function(err, res) {
      inquirer.prompt(initialQ).then(choicesInit);
      // console.log(res);
    }
  );
}
