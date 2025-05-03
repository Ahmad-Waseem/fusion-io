const mongoose = require('mongoose');

/*DO WE NEED SCHEMA FOR SPONSOR HACKATHON AND JUDGES???*/
/*WILL UPdatE IN nExT CommIT*/
const sponsorHackathonSchema = new mongoose.Schema({
  hackathon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hackathon',
    required: true
  },
  sponsor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // The User who is acting as a sponsor
    required: true
  },
  prizeTagline: {
    type: String,
    required: true,
    trim: true
  },
  prizeImage: {
    type: String // URL or path to the prize image
  },
  // IMP: add fields for the prize description, value, etc.
}, { timestamps: true });

const SponsorHackathon = mongoose.model('SponsorHackathon', sponsorHackathonSchema);

module.exports = SponsorHackathon;