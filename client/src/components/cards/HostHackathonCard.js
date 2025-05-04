import React from 'react';
import { motion } from 'framer-motion';

function HostHackathonCard({ hackathon, onSponsorClick }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-[var(--host-primary)]"
        >
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-[var(--text-color)]" style={{ fontFamily: 'var(--heading-font)' }}>
                        {hackathon.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        hackathon.status === 'upcoming' ? 'bg-green-100 text-green-800' :
                        hackathon.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                    }`}>
                        {hackathon.status}
                    </span>
                </div>

                <p className="text-[var(--text-color)] mb-4" style={{ fontFamily: 'var(--common-font)' }}>
                    {hackathon.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-[var(--background)] p-3 rounded-lg">
                        <p className="text-sm text-[var(--text-color)]" style={{ fontFamily: 'var(--common-font)' }}>
                            Max Sponsors
                        </p>
                        <p className="text-xl font-bold text-[var(--host-primary)]">
                            {hackathon.maxSponsors}
                        </p>
                    </div>
                    <div className="bg-[var(--background)] p-3 rounded-lg">
                        <p className="text-sm text-[var(--text-color)]" style={{ fontFamily: 'var(--common-font)' }}>
                            Current Sponsors
                        </p>
                        <p className="text-xl font-bold text-[var(--host-primary)]">
                            {hackathon.sponsors?.length || 0}
                        </p>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <div className="text-sm text-[var(--text-color)]" style={{ fontFamily: 'var(--common-font)' }}>
                        <p>Participants: {hackathon.currParticipantsCount}/{hackathon.maxParticipantCount}</p>
                        <p>Teams: {hackathon.teams?.length || 0}</p>
                    </div>
                    <button
                        onClick={() => onSponsorClick(hackathon._id)}
                        className="px-4 py-2 bg-[var(--host-primary)] text-white rounded-lg hover:bg-opacity-90 transition-all duration-300"
                        style={{ fontFamily: 'var(--common-font)' }}
                    >
                        Sponsor
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

export default HostHackathonCard; 