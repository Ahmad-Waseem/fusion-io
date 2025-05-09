// routes/sponsorHackathonRoutes.js
const express = require('express');
const sponsorHackathonRouter = express.Router();
const sponsorHackathonController = require('../controllers/sponsorHackathonController');

// Define routes for sponsor management
sponsorHackathonRouter.post('/', sponsorHackathonController.createSponsorship);
sponsorHackathonRouter.get('/', sponsorHackathonController.getAllSponsorships);
sponsorHackathonRouter.get('/:id', sponsorHackathonController.getSponsorshipById);
sponsorHackathonRouter.put('/:id', sponsorHackathonController.updateSponsorship);
sponsorHackathonRouter.delete('/:id', sponsorHackathonController.deleteSponsorship);
sponsorHackathonRouter.get('/hackathon/:hackathonId', sponsorHackathonController.getSponsorshipsByHackathon); //get sponsors by hackathon

module.exports = sponsorHackathonRouter;