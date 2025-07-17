import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: 'cyan' | 'pink' | 'green' | 'yellow';
  delay?: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  color,
  delay = 0 
}) => {
  const colorClasses = {
    cyan: 'from-cyan-500/20 to-cyan-600/20 text-cyan-400',
    pink: 'from-pink-500/20 to-pink-600/20 text-pink-400',
    green: 'from-green-500/20 to-green-600/20 text-green-400',
    yellow: 'from-yellow-500/20 to-yellow-600/20 text-yellow-400'
  };

  return (
    <div
      className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group animate-slideUp"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-r ${colorClasses[color].split(' ').slice(0, 2).join(' ')}`}>
          <Icon size={20} className={colorClasses[color].split(' ').slice(-1)[0]} />
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold group-hover:scale-105 transition-transform duration-200">
            {value}
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="font-medium text-gray-300 mb-1">{title}</h3>
        <p className="text-sm text-gray-400">{change}</p>
      </div>
    </div>
  );
};

export default MetricCard;