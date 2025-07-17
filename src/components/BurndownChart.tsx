import React from 'react';
import { TrendingDown } from 'lucide-react';

const BurndownChart: React.FC = () => {
  const idealBurndown = [34, 28, 22, 16, 10, 4, 0];
  const actualBurndown = [34, 30, 25, 18, 12, 8, 3];
  const days = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];

  return (
    <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
      <div className="flex items-center space-x-2 mb-6">
        <TrendingDown size={20} className="text-pink-400" />
        <h2 className="text-xl font-semibold">Sprint Burndown</h2>
      </div>
      
      <div className="h-64 relative">
        <svg className="w-full h-full" viewBox="0 0 400 200">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4, 5].map(i => (
            <line
              key={i}
              x1="40"
              y1={20 + i * 30}
              x2="380"
              y2={20 + i * 30}
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="1"
            />
          ))}
          
          {/* Ideal burndown line */}
          <polyline
            points={idealBurndown.map((value, index) => 
              `${40 + index * 55},${170 - (value / 34) * 150}`
            ).join(' ')}
            fill="none"
            stroke="rgba(107, 114, 128, 0.6)"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
          
          {/* Actual burndown line */}
          <polyline
            points={actualBurndown.map((value, index) => 
              `${40 + index * 55},${170 - (value / 34) * 150}`
            ).join(' ')}
            fill="none"
            stroke="url(#burndownGradient)"
            strokeWidth="3"
            className="animate-drawLine"
          />
          
          {/* Data points */}
          {actualBurndown.map((value, index) => (
            <circle
              key={index}
              cx={40 + index * 55}
              cy={170 - (value / 34) * 150}
              r="4"
              fill="url(#burndownGradient)"
              className="animate-slideUp"
              style={{ animationDelay: `${index * 100}ms` }}
            />
          ))}
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="burndownGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-10">
          {days.map((day, index) => (
            <span key={index} className="text-xs text-gray-400">
              {day.replace('Day ', 'D')}
            </span>
          ))}
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-0.5 bg-gray-400 opacity-60"></div>
          <span className="text-gray-400">Ideal</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-0.5 bg-gradient-to-r from-pink-400 to-cyan-400"></div>
          <span className="text-gray-400">Actual</span>
        </div>
      </div>
    </div>
  );
};

export default BurndownChart;