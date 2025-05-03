const express = require('express');
const hackathonRouter = express.Router();
const {
  getAllHackathons,
  getHackathonById,
  createHackathon,
  updateHackathon,
  deleteHackathon
} = require('../controllers/hackathonController');

hackathonRouter.get('/', getAllHackathons);
hackathonRouter.get('/:id', getHackathonById);
hackathonRouter.post('/', createHackathon);
hackathonRouter.put('/:id', updateHackathon);
hackathonRouter.delete('/:id', deleteHackathon);

module.exports = hackathonRouter;
