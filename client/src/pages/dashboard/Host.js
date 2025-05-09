import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HostHackathonCard from '../../components/cards/HostHackathonCard';

function HostDashboard() {
    const [myHackathons, setMyHackathons] = useState([]);
    const [otherHackathons, setOtherHackathons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        if (!user) {
            navigate('/host-auth');
            return;
        }
        fetchHackathons();
    }, [user, navigate]);

    const fetchHackathons = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/hackathon');
            if (!response.ok) {
                const message = `An error occurred: ${response.status}`;
                throw new Error(message);
            }
            const data = await response.json();
            processHackathons(data); // Process hackathons to separate user's and others
            setLoading(false);
        } catch (error) {
            console.error('Error fetching hackathons:', error);
            setError(error);
            setLoading(false);
        }
    };

    const processHackathons = (hackathonsData) => {
        const myHackathonsList = [];
        const otherHackathonsList = [];

        hackathonsData.forEach(hackathon => {
            let userRole = 'None'; // Default role

            // Check if user is the organizer
            if (hackathon.organizer._id === user._id) {
                userRole = 'Organizer';
                myHackathonsList.push({ ...hackathon, userRole });
                return; // Important:  Don't check other roles if Organizer
            }

            // Check if user is a judge
            if (hackathon.judges.some(judge => judge._id === user._id)) {
                userRole = 'Judge';
                myHackathonsList.push({ ...hackathon, userRole });
                return;
            }

            // Check if user is a sponsor
            if (hackathon.sponsors.some(sponsor => sponsor.sponsor._id === user._id)) {
                userRole = 'Sponsor';
                myHackathonsList.push({ ...hackathon, userRole });
                return;
            }

            // If user is not organizer, judge, or sponsor
            otherHackathonsList.push(hackathon);
        });

        setMyHackathons(myHackathonsList);
        setOtherHackathons(otherHackathonsList);
    };

    const handleSponsorClick = async (sponsorData) => {
        const sponsor = user._id;
    
        const sponsorHackathonData = {
            hackathon: sponsorData.hackathonId,
            sponsor: sponsor,
            prizeTagline: sponsorData.prizeTagline,
            prizeAmount: sponsorData.prizeAmount,
        };
    
        try {
            // Step 1: Create SponsorHackathon entry
            const response = await fetch('http://localhost:4000/api/sponsor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(sponsorHackathonData),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Failed to sponsor: ${response.status}`);
            }
    
            const result = await response.json();
            const sponsorId = result._id;
    
            // Step 2: Fetch existing hackathon
            const hackathonResponse = await fetch(`http://localhost:4000/api/hackathon/${sponsorData.hackathonId}`);
            if (!hackathonResponse.ok) {
                const errData = await hackathonResponse.json();
                throw new Error(errData.message || `Failed to fetch hackathon: ${hackathonResponse.status}`);
            }
    
            const hackathon = await hackathonResponse.json();
    
            // Step 3: Update sponsors array
            const updatedSponsors = [...(hackathon.sponsors || []), sponsorId];
            const updatedHackathon = { ...hackathon, sponsors: updatedSponsors };
    
            // Step 4: PUT updated hackathon
            const updateResponse = await fetch(`http://localhost:4000/api/hackathon/${sponsorData.hackathonId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedHackathon),
            });
    
            if (!updateResponse.ok) {
                const updateError = await updateResponse.json();
                throw new Error(updateError.message || `Failed to update hackathon: ${updateResponse.status}`);
            }
    
            await fetchHackathons();
            console.log('Sponsorship and hackathon update successful');
    
        } catch (error) {
            console.error('Error sponsoring hackathon:', error);
            setError(error.message || 'Unknown error occurred');
            throw error;
        }
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

    if (error) {
        return (
            <div className="pt-32 text-center text-red-500">
                Error: {error.message}
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

                {/* My Hackathons List */}
                {myHackathons.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-[var(--host-primary)]" style={{ fontFamily: 'var(--heading-font)' }}>
                            My Hackathons
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {myHackathons.map((hackathon) => (
                                <HostHackathonCard
                                    key={hackathon._id}
                                    hackathon={hackathon}
                                    onSponsorClick={handleSponsorClick}
                                    userRole={hackathon.userRole} // Pass the user's role
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Other Hackathons List */}
                {otherHackathons.length > 0 && (
                    <div>
                        <h2 className="text-3xl font-bold mb-4 text-[var(--host-primary)]" style={{ fontFamily: 'var(--heading-font)' }}>
                            Other Hackathons
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {otherHackathons.map((hackathon) => (
                                <HostHackathonCard
                                    key={hackathon._id}
                                    hackathon={hackathon}
                                    onSponsorClick={handleSponsorClick}
                                    userRole="None"
                                />
                            ))}
                        </div>
                    </div>
                )}

                {myHackathons.length === 0 && otherHackathons.length === 0 && ( // Corrected condition
                    <div className="text-center py-12">
                        <p className="text-[var(--text-color)] text-lg">No hackathons found</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default HostDashboard;
