const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import the User model


const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const jwtSecret = "UserIsNotPresentInThisWorld"



// Login Route
router.post('/login', async (req, res) => {
  const { email, number, UserType, selectedInstitute } = req.body;
  console.log(req.body);

  try {
    let user;

    if (UserType === 'Institute') {
      user = await User.findOne({ email, number, UserType, selectedInstitute });

      // Find the institute user based on email, number, and userType
    } else {
      user = await User.findOne({ email, number, UserType });
    }

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    const data = {
        user: {
          id: user.id
        }
      }
      const authToken = jwt.sign(data, jwtSecret)


    // Send a success response
    res.status(200).json({ success: true, message: 'Login successful' ,email:email,UserType:UserType, authToken: authToken});
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
