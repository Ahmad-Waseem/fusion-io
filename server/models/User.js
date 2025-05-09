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
    unique: true,
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

module.exports = mongoose.models.User || mongoose.model('User', userSchema);

