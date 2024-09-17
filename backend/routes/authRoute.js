const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUserInMySQL, findUserByEmail } = require('../models/userModel'); // Assuming you have a user model
const router = express.Router();





// Signup Route
router.post('/signup', async (req, res) => {
  const { fullName, email, password } = req.body;
  
  // Hash the password
  const hashedPassword = bcrypt.hashSync(password, 10);
  
  try {
    // Create user in MySQL
    const newUser = await createUserInMySQL(fullName, email, hashedPassword);
    
    // Generate JWT
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    // Send response
    res.json({ token });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Error creating user', error });
  }
});


// Login Route
 router.post('/login', async (req, res) => {
   const { email, password } = req.body;
   console.log('Login attempt for email:', email);
   console.log('JWT Secret:', process.env.JWT_SECRET);
   const user = await findUserByEmail(email);
     console.log('User found:', user ? 'Yes' : 'No');
   try {
     const user = await findUserByEmail(email);
     console.log('User found:', user ? 'Yes' : 'No');

     if (!user) {
       console.log('User not found');
       return res.status(401).json({ message: 'Invalid credentials' });
     }

     const isMatch = bcrypt.compareSync(password, user.password);
     console.log('Password match:', isMatch);

     if (!isMatch) {
       console.log('Password mismatch');
       return res.status(401).json({ message: 'Invalid credentials' });
     }

     console.log('Generating token');
     const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
     console.log('Token generated:', token ? 'Yes' : 'No');

     console.log('Sending response');
     return res.status(200).json({
       message: 'login successful', 
       token 
      });
   } catch (error) {
     console.error('Login error:', error);
     res.status(500).json({ message: 'Error logging in', error: error.message });
   }
 });

// router.post('/login', async(req, res) => {
//  // Ensure user is found

// //   const token = jwt.sign({ id: 12345 }, process.env.JWT_SECRET, { expiresIn: '1h' });
// // console.log('Generated token:', token); // Should log a token string

//   return res.json({ message: 'Login route works!' });

// });


module.exports = router;
