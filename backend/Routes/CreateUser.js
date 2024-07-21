const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Signup Route
router.post('/CreateUser', async (req, res) => {
  console.log("Request Body:", req.body);
  const { name, email, number, UserType, selectedInstitute } = req.body;

  // Validate the required fields
  if (!name || !email || !number || !UserType || (UserType === 'Institute' && !selectedInstitute)) {
    return res.status(400).json({ message: 'Please fill out all required fields.' });
  }

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use.' });
    }

    // Create a new user
    const user = new User({
      name,
      email,
      number,
      UserType,
      selectedInstitute: UserType === 'Institute' ? selectedInstitute : undefined
    });

    // Save the user to the database
    await user.save();

    // Send a success response
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error('Error registering user:', error.message); // Log the specific error message
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
