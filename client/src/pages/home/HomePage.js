import React from 'react';
import GlowUpButton from '../../components/buttons/GlowUpButton';
const HomePage = () => {
    return (
        <div className="font-sans text-gray-900">


            {/* Hero Section */}
            <section
                id="hero"
                className="h-screen bg-gradient-to-r from-red-600 to-teal-500 flex items-center justify-center text-center text-[var(--background)] rounded-[2rem]"
            >


                <div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Fusion-io</h1>
                    <p className="text-lg md:text-xl mb-6 typewriter-animation">
                        it's okay! I donno what to write too...
                    </p>

                    <style jsx>{`
                        .typewriter-animation {
                            display: inline-block;
                            font-family: monospace;
                            overflow: hidden;
                            white-space: nowrap;
                            animation: type 5s steps(40) infinite;
                        }

                        @keyframes type {
                            0% {
                            width: 0;
                            }
                            100% {
                            width: 100%;
                            }
                        }
                        `}</style>

                </div>
            </section>

            {/* About Section */}
            <section
                id="about"
                className="h-screen bg-[var(--background)] flex items-center justify-center text-center rounded-[2rem] mx-[5%] my-[5%]">

                <div className="flex flex-col items-center justify-center max-w-screen-xl mx-auto space-y-10 p-12">
                   
                    <h2 className="text-4xl font-bold text-[var(--text-color)] mb-6">We Want You to Win</h2>


                    <div className="flex space-x-24">
                        {/* Card 3 */}
                        <div className="bg-white rounded-lg shadow-lg flex flex-col items-center p-4" style={{ width: '18.75vw', height: '25vw' }}>
                            <div className="flex p-2 gap-1">
                                <div><span className="bg-blue-500 inline-block w-3 h-3 rounded-full"></span></div>
                                <div><span className="bg-purple-500 inline-block w-3 h-3 rounded-full"></span></div>
                                <div><span className="bg-pink-500 inline-block w-3 h-3 rounded-full"></span></div>
                            </div>
                            <div className="card__content mt-4"> <ul className="space-y-3 text-lg text-[var(--text-color)]">
                                <li>Hackathon</li>
                                <li>Jobs</li>
                                <li>Friends</li>
                            </ul></div>
                        </div>

                        {/* Card 4 */}
                        <div className="bg-white rounded-lg shadow-lg flex flex-col items-center p-4" style={{ width: '18.75vw', height: '25vw' }}>
                            <div className="flex p-2 gap-1">
                                <div><span className="bg-red-500 inline-block w-3 h-3 rounded-full"></span></div>
                                <div><span className="bg-yellow-500 inline-block w-3 h-3 rounded-full"></span></div>
                                <div><span className="bg-green-500 inline-block w-3 h-3 rounded-full"></span></div>
                            </div>
                            <div className="card__content mt-4"><ul className="space-y-3 text-lg text-[var(--text-color)]">
                                <li>Employees</li>
                                <li>Hearts</li>
                                <li>Legacy</li>
                            </ul></div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Footer --- Contact Section */}
            <section id="contact" className="h-screen bg-gradient-to-l from-teal-500 to-red-600 flex items-center justify-center text-center text-[var(--background)]">
                <div>
                    <h2 className="text-3xl font-semibold mb-4">Get in Touch</h2>
                    <p className="text-lg mb-6">Have questions or feedback? We'd love to hear from you!</p>
                    <GlowUpButton color={"var(--web-secondary)"} href="mailto:contact@fusion-io.com">Contact Us</GlowUpButton>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
