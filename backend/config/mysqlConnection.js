const mysql = require('mysql2/promise');
require('dotenv').config();

// Create MySQL connection pool
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
});

console.log('MySQL User:', process.env.MYSQL_USER);
console.log('MySQL Password:', process.env.MYSQL_PASSWORD);


module.exports = pool;
