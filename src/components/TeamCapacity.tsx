import React from 'react';
import { Users } from 'lucide-react';

const TeamCapacity: React.FC = () => {
  const teamMembers = [
    { name: 'Sarah Kim', role: 'Frontend', capacity: 85, avatar: 'SK' },
    { name: 'Mike Johnson', role: 'Backend', capacity: 70, avatar: 'MJ' },
    { name: 'Emma Davis', role: 'Design', capacity: 60, avatar: 'ED' },
    { name: 'Alex Chen', role: 'DevOps', capacity: 90, avatar: 'AC' }
  ];

  return (
    <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
      <div className="flex items-center space-x-2 mb-6">
        <Users size={20} className="text-cyan-400" />
        <h2 className="text-xl font-semibold">Team Capacity</h2>
      </div>
      
      <div className="space-y-4">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="animate-slideUp"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full flex items-center justify-center text-black font-bold text-xs">
                {member.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{member.name}</span>
                  <span className="text-xs text-gray-400">{member.capacity}%</span>
                </div>
                <div className="text-xs text-gray-500">{member.role}</div>
              </div>
            </div>
            
            <div className="ml-11">
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    member.capacity > 80 ? 'bg-red-400' :
                    member.capacity > 60 ? 'bg-yellow-400' : 'bg-green-400'
                  }`}
                  style={{ width: `${member.capacity}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamCapacity;