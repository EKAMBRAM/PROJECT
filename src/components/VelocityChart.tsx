import React from 'react';
import { TrendingUp } from 'lucide-react';

const VelocityChart: React.FC = () => {
  const data = [
    { sprint: 'Sprint 20', velocity: 28 },
    { sprint: 'Sprint 21', velocity: 32 },
    { sprint: 'Sprint 22', velocity: 29 },
    { sprint: 'Sprint 23', velocity: 35 },
    { sprint: 'Sprint 24', velocity: 34 }
  ];

  const maxVelocity = Math.max(...data.map(d => d.velocity));

  return (
    <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
      <div className="flex items-center space-x-2 mb-6">
        <TrendingUp size={20} className="text-green-400" />
        <h2 className="text-xl font-semibold">Velocity Trend</h2>
      </div>
      
      <div className="h-64 flex items-end justify-between space-x-2">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div
              className="w-full bg-gradient-to-t from-cyan-500 to-pink-500 rounded-t-lg transition-all duration-500 hover:from-cyan-400 hover:to-pink-400"
              style={{
                height: `${(item.velocity / maxVelocity) * 200}px`,
                animationDelay: `${index * 100}ms`
              }}
            ></div>
            <div className="mt-2 text-center">
              <div className="font-medium text-sm">{item.velocity}</div>
              <div className="text-xs text-gray-400">{item.sprint.replace('Sprint ', 'S')}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <div className="text-sm text-gray-400">Average: 31.6 story points</div>
      </div>
    </div>
  );
};

export default VelocityChart;