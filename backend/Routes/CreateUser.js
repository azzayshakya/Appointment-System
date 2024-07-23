const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.post('/CreateUser', async (req, res) => {
  
  const { name, email, number, UserType, selectedInstitute, password } = req.body;

  
  if (!name || !email || !number || !UserType || (UserType === 'Institute' && !selectedInstitute) || !password) {
    return res.status(400).json({ message: 'Please fill out all required fields.' });
  }

  try {
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success:false,message: 'Email already in use.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
const user = new User({
  name,
  email,
  password: hashedPassword,
  number,
  UserType,
  selectedInstitute: UserType === 'Institute' ? selectedInstitute : undefined
});
await user.save();

    res.status(201).json({success:true, message: 'User registered successfully.' });
  } catch (error) {
    console.error('Error registering user:', error.message); // Log the specific error message
    res.status(500).json({success:false, message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
