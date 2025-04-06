import React from 'react';
import FancyInput from '../../components/input/FancyInput';
import HackathonCard from '../../components/cards/HackathonCards';


function ParticipantDashboard() {
    const hackathonCount = 15;
    const amount = 50000;

    // Dummy hackathon data
    const hackathons = [
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
    ];

    // Event handlers
    const handleCardClick = (hackathonId) => {
        console.log(`Hackathon card clicked: ${hackathonId}`);
        // Navigate to hackathon details page
        // navigate(`/hackathon/${hackathonId}`); API ENDPOINT
    };

    const handleJoinClick = (hackathonId) => {
        console.log(`Join button clicked for hackathon: ${hackathonId}`);
        // Open registration modal or navigate to registration page
        // setShowRegistrationModal(true) or navigate(`/hackathon/${hackathonId}/register`); --> API ENDPOINT
    };

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
                            Win up to <span className="text-[var(--host-primary)] hover:text-[var(--web-secondary)]">${amount}</span>
                        </p>
                    </div>
                </div>

                {/* Search Bar */}
                <div className='pt-16 mb-8'>
                    <FancyInput label='search Hackathons' />
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
                                    onJoinClick={handleJoinClick}
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