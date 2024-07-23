const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  number: {
    type: String,
    required: true,
    trim: true
  },
  UserType: {
    type: String,
    required: true,
    enum: ['Student', 'Teacher', 'Institute']
  },
  selectedInstitute: {
    type: String,
    required: function() { return this.UserType === 'Institute'; }
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
