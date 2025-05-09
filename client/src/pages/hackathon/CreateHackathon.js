import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import FancyInput from '../../components/input/FancyInput';
import { useSelector } from 'react-redux'; // Import useSelector

function CreateHackathon() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        details: '',
        startDate: '',
        endDate: '',
        prize: '',
        difficulty: 'Beginner',
        majorRule: '',
        discordInviteUrl: '',
        minTeamSize: 1,
        maxTeamSize: 4,
        maxSponsors: 0,
        maxParticipantCount: 100,
        organizer: null // Initialize organizer in formData
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        // Redirect if user is not logged in
        if (!isAuthenticated) {
            console.log("User not authenticated, redirecting to /host-auth");
            navigate('/host-auth');
            return;
        }

        if (user?._id) {
            setFormData(prev => ({
                ...prev,
                organizer: user._id
            }));
            console.log("Organizer ID set in formData:", user._id);
        }
    }, [isAuthenticated, user?._id, navigate]);

    const validateForm = () => {
        console.log("0")
        const newErrors = {};

        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.details.trim()) newErrors.details = 'Details are required';
        if (!formData.startDate) newErrors.startDate = 'Start date is required';
        if (!formData.endDate) newErrors.endDate = 'End date is required';
        if (!formData.prize.trim()) newErrors.prize = 'Prize is required';
        if (!formData.majorRule.trim()) newErrors.majorRule = 'Major rule is required';

        if (formData.minTeamSize > formData.maxTeamSize) {
            newErrors.teamSize = 'Minimum team size cannot be greater than maximum team size';
        }

        if (new Date(formData.startDate) >= new Date(formData.endDate)) {
            newErrors.dateRange = 'End date must be after start date';
        }

        setErrors(newErrors);
        console.log(newErrors)
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFancyChange = (name, value) => {
        console.log("change_happened");
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("entred")

        if (!validateForm()) {
            console.log("0.1")
            return;
        }
        console.log("1")
        setIsSubmitting(true);
        console.log("here")
        try {
            console.log(formData)
            const response = await fetch('http://localhost:4000/api/hackathon', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to create hackathon');
            }

            const data = await response.json();
            console.log(data)
            navigate('/host-dashboard');
        } catch (error) {
            console.error('Error creating hackathon:', error);
            setErrors({ submit: error.message || 'Failed to create hackathon. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isAuthenticated) {
        return null; // Component will not render if not authenticated (redirection happens in useEffect)
    }

    return (
        <div className="pt-32 mx-[5%]" style={{ fontFamily: 'var(--common-font)' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto"
            >
                <h1 className="text-4xl font-bold mb-8 text-[var(--host-primary)] text-center" style={{ fontFamily: 'var(--heading-font)' }}>
                    Create New Hackathon
                </h1>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Information */}
                    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-[var(--host-primary)]">
                        <h2 className="text-2xl font-semibold mb-6 text-[var(--text-color)]" style={{ fontFamily: 'var(--heading-font)' }}>
                            Basic Information
                        </h2>

                        <div className="space-y-6">
                            <FancyInput
                                label="Title"
                                name="title"
                                value={formData.title}
                                onChange={handleFancyChange}
                                error={errors.title}
                            />

                            <div>
                                <label className="block text-sm font-medium text-[var(--text-color)] mb-2">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-lg border-2 border-[var(--text-color)] focus:border-[var(--host-primary)] focus:ring-2 focus:ring-[var(--host-primary)] focus:outline-none"
                                    rows="4"
                                />
                                {errors.description && (
                                    <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--text-color)] mb-2">
                                    Details
                                </label>
                                <textarea
                                    name="details"
                                    value={formData.details}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-lg border-2 border-[var(--text-color)] focus:border-[var(--host-primary)] focus:ring-2 focus:ring-[var(--host-primary)] focus:outline-none"
                                    rows="4"
                                />
                                {errors.details && (
                                    <p className="text-red-500 text-sm mt-1">{errors.details}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Date and Prize */}
                    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-[var(--host-primary)]">
                        <h2 className="text-2xl font-semibold mb-6 text-[var(--text-color)]" style={{ fontFamily: 'var(--heading-font)' }}>
                            Schedule & Prize
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-color)] mb-2">
                                    Start Date
                                </label>
                                <input
                                    type="datetime-local"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-lg border-2 border-[var(--text-color)] focus:border-[var(--host-primary)] focus:ring-2 focus:ring-[var(--host-primary)] focus:outline-none"
                                />
                                {errors.startDate && (
                                    <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--text-color)] mb-2">
                                    End Date
                                </label>
                                <input
                                    type="datetime-local"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-lg border-2 border-[var(--text-color)] focus:border-[var(--host-primary)] focus:ring-2 focus:ring-[var(--host-primary)] focus:outline-none"
                                />
                                {errors.endDate && (
                                    <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
                                )}
                            </div>

                            <div>
                                <FancyInput
                                    label="Prize"
                                    name="prize"
                                    value={formData.prize}
                                    onChange={handleFancyChange}
                                    error={errors.prize}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--text-color)] mb-2">
                                    Difficulty Level
                                </label>
                                <select
                                    name="difficulty"
                                    value={formData.difficulty}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-lg border-2 border-[var(--text-color)] focus:border-[var(--host-primary)] focus:ring-2 focus:ring-[var(--host-primary)] focus:outline-none"
                                >
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                    <option value="Expert">Expert</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Rules and Settings */}
                    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-[var(--host-primary)]">
                        <h2 className="text-2xl font-semibold mb-6 text-[var(--text-color)]" style={{ fontFamily: 'var(--heading-font)' }}>
                            Rules & Settings
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-color)] mb-2">
                                    Major Rule
                                </label>
                                <textarea
                                    name="majorRule"
                                    value={formData.majorRule}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-lg border-2 border-[var(--text-color)] focus:border-[var(--host-primary)] focus:ring-2 focus:ring-[var(--host-primary)] focus:outline-none"
                                    rows="2"
                                />
                                {errors.majorRule && (
                                    <p className="text-red-500 text-sm mt-1">{errors.majorRule}</p>
                                )}
                            </div>

                            <FancyInput
                                label="Discord Invite URL"
                                name="discordInviteUrl"
                                value={formData.discordInviteUrl}
                                onChange={handleFancyChange}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-color)] mb-2">
                                        Minimum Team Size
                                    </label>
                                    <input
                                        type="number"
                                        name="minTeamSize"
                                        value={formData.minTeamSize}
                                        onChange={handleChange}
                                        min="1"
                                        className="w-full p-3 rounded-lg border-2 border-[var(--text-color)] focus:border-[var(--host-primary)] focus:ring-2 focus:ring-[var(--host-primary)] focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-color)] mb-2">
                                        Maximum Team Size
                                    </label>
                                    <input
                                        type="number"
                                        name="maxTeamSize"
                                        value={formData.maxTeamSize}
                                        onChange={handleChange}
                                        min="1"
                                        className="w-full p-3 rounded-lg border-2 border-[var(--text-color)] focus:border-[var(--host-primary)] focus:ring-2 focus:ring-[var(--host-primary)] focus:outline-none"
                                    />
                                </div>
                            </div>

                            {errors.teamSize && (
                                <p className="text-red-500 text-sm">{errors.teamSize}</p>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-color)] mb-2">
                                        Maximum Sponsors
                                    </label>
                                    <input
                                        type="number"
                                        name="maxSponsors"
                                        value={formData.maxSponsors}
                                        onChange={handleChange}
                                        min="0"
                                        className="w-full p-3 rounded-lg border-2 border-[var(--text-color)] focus:border-[var(--host-primary)] focus:ring-2 focus:ring-[var(--host-primary)] focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-color)] mb-2">
                                        Maximum Participants
                                    </label>
                                    <input
                                        type="number"
                                        name="maxParticipantCount"
                                        value={formData.maxParticipantCount}
                                        onChange={handleChange}
                                        min="1"
                                        className="w-full p-3 rounded-lg border-2 border-[var(--text-color)] focus:border-[var(--host-primary)] focus:ring-2 focus:ring-[var(--host-primary)] focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {errors.dateRange && (
                        <p className="text-red-500 text-sm text-center">{errors.dateRange}</p>
                    )}

                    {errors.submit && (
                        <p className="text-red-500 text-sm text-center">{errors.submit}</p>
                    )}

                    <div className="flex justify-center">
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isSubmitting}
                            className={`px-8 py-3 bg-[var(--host-primary)] text-white rounded-lg text-lg font-semibold ${
                                isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-90'
                            } transition-all duration-300`}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                                    Creating...
                                </div>
                            ) : (
                                'Create Hackathon'
                            )}
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}

export default CreateHackathon;