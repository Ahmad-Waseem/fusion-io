const mongoose = require('mongoose');

const hackathonSchema = new mongoose.Schema({
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User who organized the hackathon
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 200,
  },
  details:
  {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  bannerImage: {
    type: String // URL or path to the banner image
  },
  prize: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
    required: true
  },
  majorRule: {
    type: String,
    required: true
  },
  discordInviteUrl: {
    type: String
  },
  minTeamSize: {
    type: Number,
    default: 1
  },
  maxTeamSize: {
    type: Number,
    default: 8
  },
  maxSponsors: {
    type: Number,
    default: 0
  },
  maxParticipantCount: {
    type: Number,
    default: 200
  },
  currParticipantsCount: {
    type: Number,
    default: 0
  },
  currBookingsCount:{
    type: Number,
    default: 0          // bookings means that particpant wants to participate in event -- We will add it in discord..after team making he/she will be particpating after being in the team
  },
  judges: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Reference to the User who is a judge
  }],

  sponsors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SponsorHackathon' // Reference to the SponsorHackathon association
  }],
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Reference to users who have booked the hackathon
  }],
  teams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team' // Reference to teams participating in the hackathon
  }],
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed'],
    default: 'upcoming'
  },
}, { timestamps: true });

const Hackathon = mongoose.model('Hackathon', hackathonSchema);

module.exports = Hackathon;