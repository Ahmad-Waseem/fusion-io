// routes/teamRoutes.js
const express = require('express');
const teamRouter = express.Router();
const teamController = require('../controllers/teamController');

// Define routes for team management
teamRouter.post('/', teamController.createTeam);
teamRouter.get('/', teamController.getAllTeams);
teamRouter.get('/:id', teamController.getTeamById);
teamRouter.put('/:id', teamController.updateTeam);
teamRouter.delete('/:id', teamController.deleteTeam);
teamRouter.get('/hackathon/:hackathonId', teamController.getTeamsByHackathon); //get teams by hackathon id


module.exports = teamRouter;
