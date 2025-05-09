// HackathonCard.jsx
import React from 'react';

function HackathonCard({ hackathon, onCardClick, onJoinClick }) {
  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row w-full cursor-pointer"
      onClick={() => onCardClick(hackathon._id)}
    >
      {/* Image */}
      <div className="w-full md:w-1/3 relative aspect-[3/2]">
        <img 
          src={hackathon.bannerImage || "https://placehold.co/600x800"} 
          alt={hackathon.title} 
          className="h-full w-full object-cover rounded-lg"
        />
        <div className="absolute top-0 left-0 bg-[var(--host-primary)] text-white px-3 py-1 text-sm font-bold rounded-br-lg">
          {hackathon.difficulty}
        </div>
      </div>

      {/* Content */}
      <div className="w-full md:w-2/3 p-4 md:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start mb-3 gap-2">
          <h3 className="text-xl md:text-2xl font-bold text-[var(--text-color)]" style={{ fontFamily: 'var(--heading-font)' }}>
            {hackathon.title}
          </h3>
          <div className="bg-[var(--candidate-primary)] text-white px-3 py-1 md:px-4 md:py-2 rounded-full font-bold text-sm md:text-base whitespace-nowrap">
            ${hackathon.prize}
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 text-sm md:text-base">{hackathon.description}</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 mb-4">
          <div>
            <p className="text-xs md:text-sm text-gray-500">Ends On</p>
            <p className="font-semibold text-[var(--text-color)] text-sm md:text-base">
              {new Date(hackathon.endDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-xs md:text-sm text-gray-500">Organizer</p>
            <p className="font-semibold text-[var(--text-color)] text-sm md:text-base">
              {hackathon.organizer?.name || 'Anonymous'}
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="bg-[var(--background)] p-2 md:p-3 rounded-lg w-full sm:w-auto">
            <p className="text-xs md:text-sm text-[var(--text-color)] font-bold">
              Major Rule: <span className="font-normal">{hackathon.majorRule}</span>
            </p>
          </div>
          <div className="flex items-center text-[var(--web-secondary)]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <span className="font-bold text-sm md:text-base">
              {hackathon.participants?.length || 0}/{hackathon.maxParticipantCount}
            </span>
          </div>
        </div>
        
        <button 
          className="mt-4 bg-[var(--text-color)] hover:bg-[var(--web-secondary)] text-white font-bold py-1 md:py-2 px-4 md:px-6 rounded-lg transition-colors duration-300 text-sm md:text-base"
          onClick={(e) => {
            e.stopPropagation();
            onJoinClick(hackathon._id);
          }}
        >
          Join Now
        </button>
      </div>
    </div>
  );
}

export default HackathonCard;
