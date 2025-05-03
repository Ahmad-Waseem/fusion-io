const Message = require('../models/Messaage')

const getMessagesForHackathon = async (req, res) => {
  const messages = await Message.find({ hackathon: req.params.hackathonId })
    .populate('sender', 'name email')
    .sort({ createdAt: 1 });
  res.json(messages);
};

const postMessage = async (req, res) => {
  const { content } = req.body;

  const message = await Message.create({
    hackathon: req.params.hackathonId,
    sender: req.user._id,
    content
  });

  res.status(201).json(message);
};

module.exports = {
  getMessagesForHackathon,
  postMessage
};
