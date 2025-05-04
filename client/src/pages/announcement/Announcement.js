import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


/* IF USER ROLE is Organizer, then it can send message into that hackathon

if this part is not needed, the set role to organizer to show input field*/
function Announcement() {
    const [messages, setMessages] = useState([
        {
            _id: 'hardcoded-1',
            content: 'Hello everyone! This is a hardcoded announcement for testing.',
            createdAt: '2025-05-04T12:00:00.000Z',
            sender: { name: 'Test Organizer' },
        },
        {
            _id: 'hardcoded-2',
            content: 'Reminder: The first workshop starts at 3 PM today.',
            createdAt: '2025-05-04T15:00:00.000Z',
            sender: { name: 'Event Admin' },
        },
        {
            _id: 'hardcoded-3',
            content: 'Good luck to all participants!',
            createdAt: '2025-05-04T17:00:00.000Z',
            sender: { name: 'Hackathon Team' },
        },
    ]);
    const [newMessage, setNewMessage] = useState('');
    const [userRole, setUserRole] = useState('participant'); // Sample user role

    // useEffect(() => {
    //     fetchMessages();
    // }, []);

    // const fetchMessages = async () => {
    //     try {
    //         const response = await fetch('http://localhost:4000/api/message');
    //         if (!response.ok) {
    //             const message = `An error occurred: ${response.status}`;
    //             throw new Error(message);
    //         }
    //         const resJson = await response.json();
    //         // Sort messages by creation date (earliest to latest)
    //         const sortedMessages = resJson.data.sort((a, b) =>
    //             new Date(a.createdAt) - new Date(b.createdAt)
    //         );
    //         setMessages(sortedMessages);
    //         setLoading(false);
    //     } catch (err) {
    //         setError('Failed to fetch messages');
    //         setLoading(false);
    //         console.error('Error fetching messages:', err);
    //     }
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const newMessageObject = {
            _id: `hardcoded-${Date.now()}`, // Simple unique ID for testing
            content: newMessage,
            createdAt: new Date().toISOString(),
            sender: { name: 'Local Organizer' },
        };

        setMessages([...messages, newMessageObject]);
        setNewMessage('');
        console.log('New message posted:', newMessageObject);
        // In a real scenario, you would call your API here
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (!newMessage.trim()) return;

    //     try {
    //         const response = await fetch('http://localhost:4000/api/message', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 content: newMessage,
    //                 hackathon: 'current-hackathon-id' // This should be dynamic based on the current hackathon
    //             }),
    //         });

    //         if (!response.ok) {
    //             const message = `An error occurred: ${response.status}`;
    //             throw new Error(message);
    //         }

    //         setNewMessage('');
    //         fetchMessages(); // Refresh messages
    //     } catch (err) {
    //         console.error('Error sending message:', err);
    //         alert('Failed to send message. Please try again.');
    //     }
    // };

    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    // if (loading) {
    //     return (
    //         <div className="pt-32 text-center">
    //             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--host-primary)] mx-auto"></div>
    //         </div>
    //     );
    // }

    // if (error) {
    //     return (
    //         <div className="pt-32 text-center text-red-500">
    //             {error}
    //         </div>
    //     );
    // }

    return (
        <div className="pt-32 mx-[5%]" style={{ fontFamily: 'var(--common-font)' }}>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-[var(--text-color)]" style={{ fontFamily: 'var(--heading-font)' }}>
                    Announcements
                </h1>

                {/* Message Input (only for organizers) */}
                {userRole === 'organizer' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <textarea
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Write your announcement..."
                                className="w-full p-4 rounded-lg border-2 border-[var(--text-color)] focus:border-[var(--host-primary)] focus:ring-2 focus:ring-[var(--host-primary)] focus:outline-none"
                                rows="4"
                            />
                            <button
                                type="submit"
                                className="px-6 py-2 bg-[var(--host-primary)] text-white rounded-lg hover:bg-[var(--web-secondary)] transition-all duration-300"
                            >
                                Post Announcement
                            </button>
                        </form>
                    </motion.div>
                )}

                {/* Messages List */}
                <div className="space-y-6">
                    <AnimatePresence>
                        {messages.map((message) => (
                            <motion.div
                                key={message._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-white rounded-lg shadow-md p-6"
                            >
                                <div className="flex items-start space-x-4">
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-semibold text-[var(--text-color)]">
                                                {message.sender?.name || 'Organizer'}
                                            </h3>
                                            <span className="text-sm text-gray-500">
                                                {new Date(message.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </span>
                                        </div>
                                        <p className="text-[var(--text-color)]">{message.content}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {messages.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-[var(--text-color)] text-lg">No announcements yet</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Announcement;