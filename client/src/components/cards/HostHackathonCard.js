import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function HostHackathonCard({ hackathon, onSponsorClick, userRole }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [prizeTagline, setPrizeTagline] = useState('');
    const [prizeAmount, setPrizeAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to format the date using JavaScript's Date object
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };

    const handleSponsorSubmit = async (e) => {
        e.preventDefault();
        if (!prizeTagline.trim()) {
            setError("Prize Tagline is required");
            return;
        }

        setLoading(true);
        setError(null);

        // Data to send to the parent component/API
        const sponsorData = {
            hackathonId: hackathon._id,
            prizeTagline,
            prizeAmount,
        };

        try {
            // Call the onSponsorClick function (passed from parent)
            await onSponsorClick(sponsorData); // Await the promise

            // If successful:
            setIsExpanded(false);
            setPrizeTagline('');
            setPrizeAmount('');

        } catch (err) {
            setError(err.message || "Failed to add sponsor. Please try again.");
            console.error("Error adding sponsor:", err);
        } finally {
            setLoading(false);
        }
    };

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
                        {userRole && (
                            <span className="ml-2 text-sm font-semibold text-blue-600">
                                ({userRole})
                            </span>
                        )}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-[var(--background)] p-3 rounded-lg">
                        <p className="text-sm text-[var(--text-color)]" style={{ fontFamily: 'var(--common-font)' }}>
                            Organizer
                        </p>
                        <p className="text-xl font-bold text-[var(--host-primary)]">
                            {hackathon.organizer ? hackathon.organizer.name : 'N/A'}
                        </p>
                    </div>
                    <div className="bg-[var(--background)] p-3 rounded-lg">
                        <p className="text-sm text-[var(--text-color)]" style={{ fontFamily: 'var(--common-font)' }}>
                            Start Date
                        </p>
                        <p className="text-xl font-bold text-[var(--host-primary)]">
                            {formatDate(hackathon.startDate)}
                        </p>
                    </div>
                    <div className="bg-[var(--background)] p-3 rounded-lg">
                        <p className="text-sm text-[var(--text-color)]" style={{ fontFamily: 'var(--common-font)' }}>
                            End Date
                        </p>
                        <p className="text-xl font-bold text-[var(--host-primary)]">
                            {formatDate(hackathon.endDate)}
                        </p>
                    </div>
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
                    { (hackathon.maxSponsors > 0) && (hackathon.sponsors.length < hackathon.maxSponsors) && <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="px-4 py-2 bg-[var(--host-primary)] text-white rounded-lg hover:bg-opacity-90 transition-all duration-300"
                        style={{ fontFamily: 'var(--common-font)' }}
                    >
                        Sponsor
                    </button>}
                </div>
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 space-y-4"
                        >
                            <form onSubmit={handleSponsorSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="prizeTagline" className="block text-sm font-medium text-gray-700">Prize Tagline</label>
                                    <input
                                        id="prizeTagline"
                                        value={prizeTagline}
                                        onChange={(e) => setPrizeTagline(e.target.value)}
                                        placeholder="Enter prize tagline"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="prizeAmount" className="block text-sm font-medium text-gray-700">Prize Amount</label>
                                    <input
                                        id="prizeAmount"
                                        value={prizeAmount}
                                        onChange={(e) => setPrizeAmount(e.target.value)}
                                        placeholder="Enter prize amount"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={loading}
                                >
                                    {loading ? 'Submitting...' : 'Submit Sponsorship'}
                                </button>
                                {error && <p className="text-red-500 text-sm">{error}</p>}
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

export default HostHackathonCard;
