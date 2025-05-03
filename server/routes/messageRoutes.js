const express = require('express');
const messageRouter = express.Router();
const { getMessagesForHackathon, postMessage } = require('../controllers/messageController');

messageRouter.get('/:hackathonId', getMessagesForHackathon);
messageRouter.post('/:hackathonId', postMessage);

module.exports = messageRouter;
