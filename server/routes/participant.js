const express = require('express');
const router = express.Router();
const Hackathon = require('../models/hackathon');

// Get all available hackathons
router.get('/hackathons', async (req, res) => {
    try {
        const hackathons = await Hackathon.find({ status: 'upcoming' })
            .populate('organizer', 'name')
            .select('title description startDate endDate bannerImage prize difficulty majorRule currParticipantsCount')
            .sort({ startDate: 1 });

        // Transform the data to match frontend expectations
        const transformedHackathons = hackathons.map(hackathon => ({
            id: hackathon._id,
            name: hackathon.title,
            lastDate: hackathon.endDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            prize: hackathon.prize,
            image: hackathon.bannerImage,
            description: hackathon.description,
            majorRule: hackathon.majorRule,
            organizer: hackathon.organizer.name,
            participants: hackathon.currParticipantsCount,
            difficulty: hackathon.difficulty
        }));

        res.json({
            success: true,
            data: transformedHackathons
        });
    } catch (error) {
        console.error('Error fetching hackathons:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching hackathons',
            error: error.message
        });
    }
});

// Get hackathon details
router.get('/hackathons/:id', async (req, res) => {
    try {
        const hackathon = await Hackathon.findById(req.params.id)
            .populate('organizer', 'name')
            .populate('participants', 'name')
            .populate('teams', 'name');

        if (!hackathon) {
            return res.status(404).json({
                success: false,
                message: 'Hackathon not found'
            });
        }

        res.json({
            success: true,
            data: hackathon
        });
    } catch (error) {
        console.error('Error fetching hackathon details:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching hackathon details',
            error: error.message
        });
    }
});

// Join a hackathon
router.post('/hackathons/:id/join', async (req, res) => {
    try {
        const hackathon = await Hackathon.findById(req.params.id);

        if (!hackathon) {
            return res.status(404).json({
                success: false,
                message: 'Hackathon not found'
            });
        }

        // Check if user is already a participant
        /*if (hackathon.participants.includes(req.user._id)) {
            return res.status(400).json({
                success: false,
                message: 'You are already registered for this hackathon'
            });
        }*/

        // Check if hackathon is full
        if (hackathon.currParticipantsCount >= hackathon.maxParticipantCount) {
            return res.status(400).json({
                success: false,
                message: 'Hackathon is full'
            });
        }

        // Increment participant count
        hackathon.currParticipantsCount += 1;
        await hackathon.save();

        res.json({
            success: true,
            message: 'Successfully joined the hackathon'
        });
    } catch (error) {
        console.error('Error joining hackathon:', error);
        res.status(500).json({
            success: false,
            message: 'Error joining hackathon',
            error: error.message
        });
    }
});

// Get dashboard statistics
router.get('/dashboard/stats', async (req, res) => {
    try {
        const totalHackathons = await Hackathon.countDocuments({ status: 'upcoming' });
        
        // Extract numeric value from prize string (e.g., "$15,000" -> 15000)
        const totalPrizeMoney = await Hackathon.aggregate([
            { $match: { status: 'upcoming' } },
            { 
                $group: { 
                    _id: null, 
                    total: { 
                        $sum: { 
                            $toDouble: { 
                                $replaceAll: { 
                                    input: { $substr: ["$prize", 1, -1] }, 
                                    find: ",", 
                                    replacement: "" 
                                } 
                            } 
                        } 
                    } 
                } 
            }
        ]);

        res.json({
            success: true,
            data: {
                hackathonCount: totalHackathons,
                totalPrizeMoney: totalPrizeMoney[0]?.total || 0
            }
        });
    } catch (error) {
        console.error('Error fetching dashboard statistics:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching dashboard statistics',
            error: error.message
        });
    }
});

module.exports = router; 