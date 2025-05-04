import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import HostHackathonCard from '../../components/cards/HostHackathonCard';

function HostDashboard() {
    const [hackathons, setHackathons] = useState([
        {
            id: 1,
            name: "AI Innovation Challenge",
            lastDate: "April 20, 2025",
            prize: "$15,000",
            image: "https://placehold.co/600x800",
            description: "Create breakthrough AI solutions for real-world problems",
            majorRule: "All code must be original and created during the hackathon period",
            organizer: "TechGiants Inc.",
            participants: 342,
            difficulty: "Advanced"
        },
        {
            id: 2,
            name: "Sustainable Future Hackathon",
            lastDate: "May 5, 2025",
            prize: "$12,000",
            image: "https://placehold.co/200x400",
            description: "Develop green tech solutions to combat climate change",
            majorRule: "Solutions must demonstrate measurable environmental impact",
            organizer: "EcoTech Foundation",
            participants: 256,
            difficulty: "Intermediate"
        },
        {
            id: 3,
            name: "Healthcare Innovation Challenge",
            lastDate: "April 30, 2025",
            prize: "$20,000",
            image: "https://placehold.co/600x600",
            description: "Create solutions to improve patient care and medical outcomes",
            majorRule: "All solutions must comply with healthcare privacy standards",
            organizer: "MediTech Alliance",
            participants: 189,
            difficulty: "Expert"
        }
    ]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchHackathons();
    }, []);

    const fetchHackathons = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/hackathons');
            if (!response.ok) {
                const message = `An error occurred: ${response.status}`;
                throw new Error(message);
            }
            const data = await response.json();
            setHackathons(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching hackathons:', error);
            setLoading(false);
        }
    };

    const handleSponsorClick = (hackathonId) => {
        // Navigate to sponsor page or open sponsor modal
        console.log('Sponsor clicked for hackathon:', hackathonId);
    };

    const handleCreateHackathon = () => {
        navigate('/create-hackathon');
    };

    if (loading) {
        return (
            <div className="pt-32 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--host-primary)] mx-auto"></div>
            </div>
        );
    }

    return (
        <div className="pt-32 mx-[5%]" style={{ fontFamily: 'var(--common-font)' }}>
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-6xl font-extrabold mb-4 text-[var(--host-primary)]" style={{ fontFamily: 'var(--heading-font)' }}>
                        Welcome, Organizer!
                    </h1>
                    <p className="text-xl text-[var(--text-color)]">
                        Manage your hackathons and track their progress
                    </p>
                </motion.div>

                {/* Create Hackathon Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCreateHackathon}
                    className="fixed bottom-8 right-8 bg-[var(--host-primary)] text-white p-4 rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </motion.button>

                {/* Hackathon List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {hackathons.map((hackathon) => (
                        <HostHackathonCard
                            key={hackathon._id}
                            hackathon={hackathon}
                            onSponsorClick={handleSponsorClick}
                        />
                    ))}
                </div>

                {hackathons.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-[var(--text-color)] text-lg">No hackathons found</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default HostDashboard;