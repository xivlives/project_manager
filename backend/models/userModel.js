const mysqlConnection = require('../config/mysqlConnection');

// Find user by email
const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    mysqlConnection.query(query, [email], (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results[0]);
    });
  });
};

// Create a new user
const createUserInMySQL = (email, hashedPassword) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
    mysqlConnection.query(query, [email, hashedPassword], (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve({ id: results.insertId, email });
    });
  });
};

module.exports = { findUserByEmail, createUserInMySQL };
