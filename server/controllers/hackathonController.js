const Hackathon = require('../models/hackathon');

const getAllHackathons = async (req, res) => {
  const hackathons = await Hackathon.find()
    .populate('organizer')
    .populate('judges')
    .populate('sponsors')
    .populate('participants')
    .populate('teams');
  
    res.json(hackathons);
};

const getHackathonById = async (req, res) => {
  const hackathon = await Hackathon.findById(req.params.id)
    .populate('organizer')
    .populate('judges')
    .populate('sponsors')
    .populate('participants')
    .populate('teams');
  if (!hackathon) return res.status(404).json({ message: 'Hackathon not found' });
  res.json(hackathon);
};

const createHackathon = async (req, res) => {
  const newHackathon = await Hackathon.create(req.body);
  res.status(201).json(newHackathon);
};

const updateHackathon = async (req, res) => {
  const updatedHackathon = await Hackathon.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updatedHackathon) return res.status(404).json({ message: 'Hackathon not found' });
  res.json(updatedHackathon);
};

const deleteHackathon = async (req, res) => {
  const deletedHackathon = await Hackathon.findByIdAndDelete(req.params.id);
  if (!deletedHackathon) return res.status(404).json({ message: 'Hackathon not found' });
  res.json({ message: 'Hackathon deleted successfully' });
};

module.exports = {
  getAllHackathons,
  getHackathonById,
  createHackathon,
  updateHackathon,
  deleteHackathon
};
