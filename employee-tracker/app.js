
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

// Function to query the database and view all departments
const viewDepartments = async () => {
  try {
    const res = await pool.query('SELECT * FROM department'); // Execute a SQL query
    console.table(res.rows); // Log the results
  } catch (err) {
    console.error('Error executing query', err.stack); // Handle errors
  } finally {
    mainMenu(); // Return to main menu after viewing departments
  }
};

// Function to query the database and view all roles
const viewRoles = async () => {
  try {
    const res = await pool.query('SELECT * FROM role'); // Execute a SQL query
    console.table(res.rows); // Log the results
  } catch (err) {
    console.error('Error executing query', err.stack); // Handle errors
  } finally {
    mainMenu(); // Return to main menu after viewing roles
  }
};

// Function to query the database and view all employees
const viewEmployees = async () => {
  try {
    const res = await pool.query('SELECT * FROM employee'); // Execute a SQL query
    console.table(res.rows); // Log the results
  } catch (err) {
    console.error('Error executing query', err.stack); // Handle errors
  } finally {
    mainMenu(); // Return to main menu after viewing employees
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
  } finally {
    mainMenu(); // Return to main menu after adding a department
  }
};

// Function to add a role
const addRole = async () => {
  const roleDetails = await prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the role title:',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the role salary:',
    },
    {
      type: 'input',
      name: 'department_id',
      message: 'Enter the department ID for this role (numeric ID):',
    },
  ]);

  try {
    await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', 
    [roleDetails.title, roleDetails.salary, roleDetails.department_id]);
    console.log('Role added successfully!');
  } catch (err) {
    console.error('Error executing query', err.stack);
  } finally {
    mainMenu(); // Return to main menu after adding a role
  }
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
      name: 'role_name',
      message: 'Enter the employee role name:',
    },
    {
      type: 'input',
      name: 'manager_id',
      message: 'Enter the employee manager ID (or leave blank if none):',
    },
  ]);

  try {
    // Fetch the role_id based on the role name
    const roleResult = await pool.query('SELECT id FROM role WHERE title = $1', [employeeDetails.role_name]);
    
    if (roleResult.rows.length === 0) {
      console.log('Role not found. Please ensure the role name is correct.');
      return mainMenu(); // Return to main menu if role not found
    }

    const role_id = roleResult.rows[0].id;

    // Insert the employee using the fetched role_id
    await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', 
    [employeeDetails.first_name, employeeDetails.last_name, role_id, employeeDetails.manager_id || null]);
    
    console.log('Employee added successfully!');
  } catch (err) {
    console.error('Error executing query', err.stack);
  } finally {
    mainMenu(); // Return to main menu after adding an employee
  }
};

// Function to update an employee's role
const updateEmployeeRole = async () => {
  const roleUpdateDetails = await prompt([
    {
      type: 'input',
      name: 'employee_id',
      message: 'Enter the ID of the employee whose role you want to update:',
    },
    {
      type: 'input',
      name: 'new_role_name',
      message: 'Enter the new role name for the employee:',
    },
  ]);

  const { employee_id, new_role_name } = roleUpdateDetails;

  // Validate inputs
  if (!employee_id || !new_role_name) {
    console.log("Both employee ID and new role name must be provided.");
    return; // Exit the function if inputs are invalid
  }

  try {
    // Fetch the role_id based on the new role name
    const roleResult = await pool.query('SELECT id FROM role WHERE title = $1', [new_role_name]);
    
    if (roleResult.rows.length === 0) {
      console.log('Role not found. Please ensure the role name is correct.');
      return; // Exit the function if the role is not found
    }

    const new_role_id = roleResult.rows[0].id;

    // Call a function to update the employee role in the database
    await updateRoleInDatabase(employee_id, new_role_id);
    console.log('Employee role updated successfully!');
  } catch (err) {
    console.error('Error executing query', err.stack);
  }
};


// Start the application
mainMenu();