import { useState } from "react";

export default function EnhancedHackathonDetailPage() {
  const [hackathon, setHackathon] = useState({
    title: "Fusion Hackathon 2025",
    description: "A premier hackathon event focused on innovation and collaboration, offering exciting challenges, mentorship, and rewards.",
    bannerImage: "/api/placeholder/1200/400",
    organizer: { name: "Fusion Org" },
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    prize: "$5000 + Goodies",
    difficulty: "Intermediate",
    majorRule: "All team members must be students.",
    minTeamSize: 2,
    maxTeamSize: 5,
    currParticipantsCount: 57,
    maxParticipantCount: 200,
    status: "upcoming",
    tags: ["Tech", "Innovation", "Coding", "Students"],
    registeredTeams: [
      { 
        id: 1, 
        name: "Code Wizards", 
        members: ["john@example.com", "amy@example.com", "alex@example.com"],
        joinedAt: "2025-04-01T14:22:10Z"
      },
      { 
        id: 2, 
        name: "Binary Beasts", 
        members: ["sarah@example.com", "mike@example.com"],
        joinedAt: "2025-04-02T09:15:32Z"
      },
      { 
        id: 3, 
        name: "Pixel Pioneers", 
        members: ["lisa@example.com", "kevin@example.com", "raja@example.com", "emily@example.com"],
        joinedAt: "2025-04-03T18:42:05Z"
      },
      { 
        id: 4, 
        name: "Data Dragons", 
        members: ["tyler@example.com", "jessica@example.com", "david@example.com"],
        joinedAt: "2025-04-04T11:28:47Z"
      }
    ]
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamMembers, setTeamMembers] = useState("");

  const handleRegister = () => {
    console.log("Registration submitted:", { teamName, teamMembers });
    // Registration logic would go here
    setIsModalOpen(false);
    setTeamName("");
    setTeamMembers("");
  };

  const calculateTimeRemaining = () => {
    const now = new Date();
    const end = new Date(hackathon.endDate);
    const diff = end - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    return { days, hours };
  };

  const { days, hours } = calculateTimeRemaining();
  const progressPercentage = (hackathon.currParticipantsCount / hackathon.maxParticipantCount) * 100;

  return (
    <div className="min-h-screen pt-36 bg-gray-50">
      {/* Hero Banner */}
      <div className="relative">
        <div className="h-80 w-full overflow-hidden">
          <img src={hackathon.bannerImage} alt="Hackathon Banner" className="w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="inline-block bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
              {hackathon.status}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{hackathon.title}</h1>
            <p className="text-lg text-gray-200 mb-4 max-w-3xl">{hackathon.description}</p>
            <p className="text-sm">Organized by <span className="font-medium">{hackathon.organizer?.name}</span></p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-end">
                <button className="px-6 py-2 text-sm bg-blue-600 text-white border rounded-lg mb-4">Register Team</button>
          </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          
          <div className="lg:w-8/12 space-y-8">
            {/* Time Remaining */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="bg-blue-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white">Time Remaining</h2>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-center gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600">{days}</div>
                    <div className="text-gray-500">Days</div>
                  </div>
                  <div className="text-4xl font-bold">:</div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600">{hours}</div>
                    <div className="text-gray-500">Hours</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="bg-blue-600 px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Registered Teams</h2>
                <span className="bg-white text-blue-600 text-xs font-bold px-2 py-1 rounded-full">
                  {hackathon.registeredTeams.length} Teams
                </span>
              </div>
              <div className="divide-y divide-gray-100">
                {hackathon.registeredTeams.map(team => (
                  <div key={team.id} className="p-6 hover:bg-gray-50 transition">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{team.name}</h3>
                      <span className="text-xs text-gray-500">
                        {new Date(team.joinedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {team.members.length} members
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-4/12 space-y-6">
            {/* Hackathon Info Card */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="bg-blue-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white">Hackathon Details</h2>
              </div>
              <div className="p-6">
                <dl className="space-y-4">
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Start Date</dt>
                    <dd className="font-medium">{new Date(hackathon.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">End Date</dt>
                    <dd className="font-medium">{new Date(hackathon.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Prize</dt>
                    <dd className="font-medium text-green-600">{hackathon.prize}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Difficulty</dt>
                    <dd className="font-medium">{hackathon.difficulty}</dd>
                  </div>
                  <div className="pt-2 border-t border-gray-100">
                    <dt className="text-gray-500 mb-2">Major Rule</dt>
                    <dd className="font-medium">{hackathon.majorRule}</dd>
                  </div>
                  <div className="pt-2 border-t border-gray-100">
                    <dt className="text-gray-500 mb-2">Team Size</dt>
                    <dd className="font-medium">{hackathon.minTeamSize} - {hackathon.maxTeamSize} members</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Participation Stats */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="bg-blue-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white">Participation</h2>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-500">Participants</span>
                  <span className="font-medium">{hackathon.currParticipantsCount}/{hackathon.maxParticipantCount}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {hackathon.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Registration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-screen overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="bg-blue-600 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Register Your Team</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-white hover:text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Team Name</label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="Enter your team name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Team Members (Emails comma-separated)</label>
                <textarea
                  value={teamMembers}
                  onChange={(e) => setTeamMembers(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="email1@example.com, email2@example.com, ..."
                  rows="3"
                />
                <p className="mt-1 text-xs text-gray-500">Team size must be between {hackathon.minTeamSize} and {hackathon.maxTeamSize} members</p>
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRegister}
                  className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}