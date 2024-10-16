const { prompt } = require('inquirer'); // Correct import for Inquirer
const pool = require('./db'); // Adjust path as necessary

const mainMenu = () => {
  prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ],
    },
  ])
  .then((answer) => {
    switch (answer.action) {
      case 'View all departments':
        viewDepartments();
        break;
      case 'View all roles':
        viewRoles();
        break;
      case 'View all employees':
        viewEmployees();
        break;
      case 'Add a department':
        addDepartment();
        break;
      case 'Add a role':
        addRole();
        break;
      case 'Add an employee':
        addEmployee();
        break;
      case 'Update an employee role':
        updateEmployeeRole();
        break;
      case 'Exit':
        process.exit();
    }
  });
};

// Function to query the database
const viewDepartments = async () => {
  try {
    const res = await pool.query('SELECT * FROM department'); // Execute a SQL query
    console.log(res.rows); // Log the results
  } catch (err) {
    console.error('Error executing query', err.stack); // Handle errors
  }
};

// Function to query the database and view all roles
const viewRoles = async () => {
  try {
    const res = await pool.query('SELECT * FROM role'); // Execute a SQL query
    console.log(res.rows); // Log the results
  } catch (err) {
    console.error('Error executing query', err.stack); // Handle errors
  }
};


// Function to query the database and view all employees
const viewEmployees = async () => {
  try {
    const res = await pool.query('SELECT * FROM employee'); // Execute a SQL query
    console.log(res.rows); // Log the results
  } catch (err) {
    console.error('Error executing query', err.stack); // Handle errors
  }
};

// Function to add a department
const addDepartment = async () => {
  const departmentDetails = await prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the department name:',
    },
  ]);

  try {
    await pool.query('INSERT INTO department (name) VALUES ($1)', [departmentDetails.name]);
    console.log('Department added successfully!');
  } catch (err) {
    console.error('Error executing query', err.stack);
  }
};

// Function to add a role
const addRole =  async () => {
  const roleDetails = await prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the role name',
    },
  ]);

  try {
    const res = await pool.query('INSERT INTO role (title) VALUES ($1)', [roleDetails.name]);
  console.log('Role added successfully!');
  } catch (err) {
    console.error('Error executing query', err.stack);
  }
// You can prompt for role details and add the role similarly
};

// Function to add an employee
const addEmployee = async () => {
  const employeeDetails = await prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'Enter the employee first name:',
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'Enter the employee last name:',
    },
    {
      type: 'input',
      name: 'role_id',
      message: 'Enter the employee role ID:',
    },
    {
      type: 'input',
      name: 'manager_id',
      message: 'Enter the employee manager ID (or leave blank if none):',
    },
  ]);

  try {
    await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', 
    [employeeDetails.first_name, employeeDetails.last_name, employeeDetails.role_id, employeeDetails.manager_id || null]);
    console.log('Employee added successfully!');
  } catch (err) {
    console.error('Error executing query', err.stack);
  }
};

// Start the application
mainMenu();