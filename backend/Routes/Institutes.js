const express = require('express');
const router = express.Router();
const Institute = require('../models/Insitutes');

// Route to get all institute names
router.get('/institutes', async (req, res) => {
  try {
    const institutes = await Institute.find({}, 'ins_name'); // Only return ins_name field
    const instituteNames = institutes.map(inst => inst.ins_name);
    console.log("names of ins are here")
    console.log(instituteNames)
    console.log("names of ins are here")

    res.json(instituteNames);
  } catch (error) {
    console.error("Error fetching institutes:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
