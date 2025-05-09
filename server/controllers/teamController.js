// controllers/teamController.js
const Team = require('../models/Team');

const teamController = {
    // Create a new team
    createTeam: async (req, res) => {
        try {
            const { name, hackathon, members, githubRepositoryUrl } = req.body;

            // Basic validation
            if (!name || !hackathon) {
                return res.status(400).json({ message: 'Name and hackathon are required' });
            }

            // Create the team
            const newTeam = new Team({
                name,
                hackathon,
                members,
                githubRepositoryUrl,
            });

            // Save the team
            const savedTeam = await newTeam.save();

            //Populate members and hackathon
            const populatedTeam = await Team.findById(savedTeam._id).populate('members').populate('hackathon');

            res.status(201).json(populatedTeam);
        } catch (error) {
            console.error('Error creating team:', error);
            res.status(500).json({ message: 'Failed to create team', error: error.message });
        }
    },

    // Get all teams
    getAllTeams: async (req, res) => {
        try {
            const teams = await Team.find().populate('members').populate('hackathon');
            res.json(teams);
        } catch (error) {
            console.error('Error fetching teams:', error);
            res.status(500).json({ message: 'Failed to fetch teams', error: error.message });
        }
    },

    // Get a single team by ID
    getTeamById: async (req, res) => {
        try {
            const team = await Team.findById(req.params.id).populate('members').populate('hackathon');
            if (!team) {
                return res.status(404).json({ message: 'Team not found' });
            }
            res.json(team);
        } catch (error) {
            console.error('Error fetching team:', error);
            res.status(500).json({ message: 'Failed to fetch team', error: error.message });
        }
    },

    // Update a team by ID
    updateTeam: async (req, res) => {
        try {
            const { name, hackathon, members, githubRepositoryUrl } = req.body;
            const updatedTeam = await Team.findByIdAndUpdate(req.params.id, {
                name,
                hackathon,
                members,
                githubRepositoryUrl
            }, { new: true }).populate('members').populate('hackathon');

            if (!updatedTeam) {
                return res.status(404).json({ message: 'Team not found' });
            }
            res.json(updatedTeam);
        } catch (error) {
            console.error('Error updating team:', error);
            res.status(500).json({ message: 'Failed to update team', error: error.message });
        }
    },

    // Delete a team by ID
    deleteTeam: async (req, res) => {
        try {
            const deletedTeam = await Team.findByIdAndDelete(req.params.id);
            if (!deletedTeam) {
                return res.status(404).json({ message: 'Team not found' });
            }
            res.json({ message: 'Team deleted successfully' });
        } catch (error) {
            console.error('Error deleting team:', error);
            res.status(500).json({ message: 'Failed to delete team', error: error.message });
        }
    },

      // Get teams by hackathon ID
    getTeamsByHackathon: async (req, res) => {
        try {
            const hackathonId = req.params.hackathonId;
            const teams = await Team.find({ hackathon: hackathonId }).populate('members').populate('hackathon');
            res.json(teams);
        } catch (error) {
             console.error('Error fetching teams by hackathon:', error);
            res.status(500).json({ message: 'Failed to fetch teams by hackathon', error: error.message });
        }
    }
};

module.exports = teamController;