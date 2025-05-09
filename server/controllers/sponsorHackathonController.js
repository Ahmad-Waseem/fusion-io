// controllers/sponsorHackathonController.js
const SponsorHackathon = require('../models/SponsorHackathon');
const User = require('../models/user');

const sponsorHackathonController = {
    // Create a new sponsorship entry
    createSponsorship: async (req, res) => {
        try {
            const { hackathon, sponsor, prizeTagline, prizeAmount } = req.body;

            // Verify that the sponsor exists and has the role 'organizer'
            const sponsorUser = await User.findById(sponsor);
            if (!sponsorUser) {
                return res.status(400).json({ message: 'Sponsor user not found' });
            }
            if (sponsorUser.role !== 'organizer') {
                return res.status(400).json({ message: 'Sponsor must have the role "organizer"' });
            }

            const newSponsorship = new SponsorHackathon({
                hackathon,
                sponsor,
                prizeTagline,
                prizeAmount
            });
            const savedSponsorship = await newSponsorship.save();
            res.status(201).json(savedSponsorship);
        } catch (error) {
            console.error("Error creating sponsorship:", error);
            res.status(500).json({ message: "Failed to create sponsorship", error: error.message });
        }
    },

    // Get all sponsorships
    getAllSponsorships: async (req, res) => {
        try {
            const sponsorships = await SponsorHackathon.find()
                .populate('hackathon')
                .populate('sponsor');
            res.json(sponsorships);
        } catch (error) {
            console.error("Error fetching sponsorships:", error);
            res.status(500).json({ message: "Failed to fetch sponsorships", error: error.message });
        }
    },

    // Get a single sponsorship by ID
    getSponsorshipById: async (req, res) => {
        try {
            const sponsorship = await SponsorHackathon.findById(req.params.id)
                .populate('hackathon')
                .populate('sponsor');
            if (!sponsorship) {
                return res.status(404).json({ message: 'Sponsorship not found' });
            }
            res.json(sponsorship);
        } catch (error) {
            console.error("Error fetching sponsorship:", error);
            res.status(500).json({ message: "Failed to fetch sponsorship", error: error.message });
        }
    },

    // Update a sponsorship
    updateSponsorship: async (req, res) => {
        try {
            const updatedSponsorship = await SponsorHackathon.findByIdAndUpdate(req.params.id, req.body, { new: true })
                .populate('hackathon')
                .populate('sponsor');
            if (!updatedSponsorship) {
                return res.status(404).json({ message: 'Sponsorship not found' });
            }
            res.json(updatedSponsorship);
        } catch (error) {
            console.error("Error updating sponsorship:", error);
            res.status(500).json({ message: "Failed to update sponsorship", error: error.message });
        }
    },

    // Delete a sponsorship
    deleteSponsorship: async (req, res) => {
        try {
            const deletedSponsorship = await SponsorHackathon.findByIdAndDelete(req.params.id);
            if (!deletedSponsorship) {
                return res.status(404).json({ message: 'Sponsorship not found' });
            }
            res.json({ message: 'Sponsorship deleted successfully' });
        } catch (error) {
            console.error("Error deleting sponsorship:", error);
            res.status(500).json({ message: "Failed to delete sponsorship", error: error.message });
        }
    },
    //Get Sponsorships for a Hackathon
    getSponsorshipsByHackathon: async (req, res) => {
        try {
            const hackathonId = req.params.hackathonId;
            const sponsorships = await SponsorHackathon.find({ hackathon: hackathonId })
                .populate('sponsor'); // Populate the sponsor details
            res.json(sponsorships);
        } catch (error) {
            console.error("Error fetching sponsorships for hackathon:", error);
            res.status(500).json({ message: "Failed to fetch sponsorships for hackathon", error: error.message });
        }
    }
};

module.exports = sponsorHackathonController;