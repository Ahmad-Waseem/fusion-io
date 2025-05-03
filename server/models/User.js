const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  username: {
    type: String,
    trim: true,
    unqiue: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ['participant', 'judge', 'organizer'],
    default: 'participant'
  }

}, { timestamps: true }); 
const User = mongoose.model('User', userSchema);

module.exports = User;
