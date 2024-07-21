const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
const port = 7000;
const mongoDB = require('./db');
mongoDB();

app.use(cors({
  origin: '*',
  credentials: true, 
}));

app.use(express.json());


app.get('/', (req, res) => {
  res.send(`Azzay Your Foodiii app listening on port ${port}`);
});
app.use('/api/', require('./Routes/CreateUser'));
app.use('/api/', require('./Routes/Institutes'));
app.use('/api/', require('./Routes/Login'));
app.listen(port, () => {
  console.log(`Your app listening on port ${port}`);
});
