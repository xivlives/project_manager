const mysqlConnection = require('../config/mysqlConnection');
const crypto = require('crypto');

// Generate a unique ID
function generateUniqueId() {
  const timestamp = Date.now().toString(36);
  const randomStr = crypto.randomBytes(5).toString('hex');
  return `${timestamp}-${randomStr}`;
}

// Find user by email
const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    console.log(`Executing query: ${query} with email: ${email}`);

    mysqlConnection.query(query, [email], (error, results) => {
      console.log(`Executing query: ${query} with email: ${email}`);
      if (error) {
        console.error('Error during MySQL query:', error);
        return reject(error);
      }

      if (results.length === 0) {
        console.log('No user found with this email.');
        resolve(null);
      } else {
        console.log('User found:', results[0]);
        resolve(results[0]);
      }
    });
  });
};

// Create a new user
const createUserInMySQL = (fullName, email, hashedPassword) => {
  return new Promise((resolve, reject) => {
    const userId = generateUniqueId();
    const query = 'INSERT INTO users (id, fullName, email, password) VALUES (?, ?, ?, ?)';
    mysqlConnection.query(query, [userId, fullName, email, hashedPassword], (error, results) => {
      if (error) {
        console.error('Error creating user:', error);
        return reject(error);
      }
      console.log('User created with ID:', userId);
      resolve({ id: userId, email });
    });
  });
};

module.exports = { findUserByEmail, createUserInMySQL };