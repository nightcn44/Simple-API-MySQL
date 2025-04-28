const mysql = require('mysql2/promise');

// load environment variables from .env file if it exists
require('dotenv').config();

// create connection to database using MySQL2 module with Promises
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function checkConnection() {
  try {
    await pool.query('SELECT 1');
    console.log('✅ MySQL connected and ready to use!');
  } catch (error) {
    console.error('❌ MySQL connection failed:', error);
    process.exit(1);
  }
}

module.exports = { pool, checkConnection };