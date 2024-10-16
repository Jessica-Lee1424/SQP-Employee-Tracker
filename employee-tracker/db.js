// db.js
const { Pool } = require('pg'); // Correctly import Pool from the pg package
require('dotenv').config()

// Create a new pool instance for connecting to the PostgreSQL database
const pool = new Pool({
  user: 'postgres', // Replace with your PostgreSQL username
  host: 'localhost', // Database server host
  database: 'employee_directory', // Replace with your database name
  password: process.env.PW, // Replace with your password (if applicable)
  port: 5432, // Default PostgreSQL port
});

pool.connect();

module.exports=pool;