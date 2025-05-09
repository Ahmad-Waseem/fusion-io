import React, { useState, useEffect } from 'react';
import FancyInput from '../../components/input/FancyInput';
import HackathonCard from '../../components/cards/HackathonCards';


function ParticipantDashboard() {
    const [hackathons, setHackathons] = useState([]);
    const [hackathonCount, setHackathonCount] = useState(0);
    const [totalPrizeAmount, setTotalPrizeAmount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchHackathons = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:4000/api/hackathon');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setHackathons(data);
            console.log(data)
            setHackathonCount(data.length);
            const totalPrize = data.reduce((sum, hackathon) => {
                // Assuming prize is a string like "$15,000"
                const prizeValue = parseFloat(hackathon.prize.replace(/[^0-9.]/g, ''));
                return sum + prizeValue;
            }, 0);
            setTotalPrizeAmount(totalPrize);
        } catch (e) {
            setError(e.message);
            console.error("Error fetching hackathons:", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {        
        fetchHackathons();
    }, []);

    const handleCardClick = (hackathonId) => {
        console.log(`Hackathon card clicked: ${hackathonId}`);
        // Navigate to hackathon details page
        // navigate(`/hackathon/${hackathonId}`); API ENDPOINT (for fetching details)
    };

    const handleSearch = async (query) => {
        // Implement search functionality here, potentially calling the /api/hackathons?search=${query} endpoint
        console.log("Search query:", query);
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/hackathons?search=${query}`); // Adjust endpoint if needed
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setHackathons(data);
            setHackathonCount(data.length); // Update count based on search results
            const totalPrize = data.reduce((sum, hackathon) => {
                const prizeValue = parseFloat(hackathon.prize.replace(/[^0-9.]/g, ''));
                return sum + prizeValue;
            }, 0);
            setTotalPrizeAmount(totalPrize);
        } catch (e) {
            setError(e.message);
            console.error("Error fetching hackathons with search:", e);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="pt-32 mx-[5%] text-center">Loading hackathons...</div>;
    }

    if (error) {
        return <div className="pt-32 mx-[5%] text-center text-red-500">Error loading hackathons: {error}</div>;
    }

    return (
        <div className="pt-32 mx-[5%]" style={{ fontFamily: 'var(--common-font)' }}>
            <div className="max-h-screen">
                <h1 className="text-6xl text-center font-extrabold mb-4 text-[var(--candidate-primary)]">
                    Dashboard
                </h1>

                <div className="bg-[var(--text-color)] rounded-lg shadow-md mt-4 p-6 flex flex-col items-center space-y-4 mx-[5%] max-w-xl w-full mx-auto transition-all duration-300 hover:scale-110 hover:bg-[var(--background)] group">
                    {/* Hackathon Infos */}
                    <div className="text-center space-y-2">
                        <p className="text-[var(--background)] text-lg font-semibold group-hover:text-[var(--text-color)]">
                            <span className="text-4xl text-[var(--candidate-primary)]">{hackathonCount}</span> Hackathons
                        </p>
                        <p className="text-[var(--background)] text-xl font-semibold group-hover:text-[var(--text-color)]">Available this month</p>
                        <p className="text-[var(--web-secondary)] text-2xl font-extrabold">
                            Win up to <span className="text-[var(--host-primary)] hover:text-[var(--web-secondary)]">${totalPrizeAmount.toLocaleString()}</span>
                        </p>
                    </div>
                </div>

                {/* Search Bar */}
                <div className='pt-16 mb-8'>
                    <FancyInput label='search Hackathons' onInputChange={handleSearch} /> {/* Assuming FancyInput has a callback for input change */}
                </div>

                {/* Hackathon Listings */}
                <div className="w-4/5 mx-auto">
                    <h2 className="text-3xl font-bold mb-6 text-[var(--text-color)]" style={{ fontFamily: 'var(--heading-font)' }}>
                        Available Hackathons
                    </h2>

                    <ul className="space-y-8">
                        {hackathons.map((hackathon) => (
                            <li key={hackathon.id} className="w-full">
                                <HackathonCard
                                    hackathon={hackathon}
                                    onCardClick={handleCardClick}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ParticipantDashboard;