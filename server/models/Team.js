const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  hackathon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hackathon', // Reference to the hackathon the team is participating in
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Array of User IDs in the team, the first one will be the leader
  }],
  githubRepositoryUrl: {
    type: String
  },
  // Add other relevant team-specific information if needed
}, { timestamps: true });

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;