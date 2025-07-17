import React, { useState } from 'react';
import { Calendar, Filter, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

const Timeline: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'week' | 'month' | 'quarter'>('month');

  const milestones = [
    {
      id: '1',
      title: 'MVP Launch',
      date: '2024-12-15',
      status: 'upcoming',
      progress: 75,
      team: 'Product Team'
    },
    {
      id: '2',
      title: 'Beta Testing Complete',
      date: '2024-12-08',
      status: 'completed',
      progress: 100,
      team: 'QA Team'
    },
    {
      id: '3',
      title: 'User Onboarding Flow',
      date: '2024-12-20',
      status: 'in-progress',
      progress: 40,
      team: 'Design Team'
    },
    {
      id: '4',
      title: 'Marketing Campaign',
      date: '2024-12-25',
      status: 'upcoming',
      progress: 20,
      team: 'Marketing Team'
    }
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Project Timeline
              </h1>
              <p className="text-gray-400 mt-2">
                Track milestones and project dependencies
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="flex bg-black/30 rounded-lg p-1">
                {(['week', 'month', 'quarter'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`px-3 py-1 rounded-md capitalize transition-all duration-200 ${
                      viewMode === mode 
                        ? 'bg-cyan-500/20 text-cyan-400' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-200">
                <Filter size={16} />
                <span>Filter</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 rounded-lg hover:from-cyan-500/30 hover:to-pink-500/30 transition-all duration-200">
                <Plus size={16} />
                <span>Add Milestone</span>
              </button>
            </div>
          </div>
        </div>

        {/* Timeline Navigation */}
        <div className="mb-8">
          <div className="flex items-center justify-between bg-black/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <button 
              onClick={() => navigateMonth('prev')}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex items-center space-x-4">
              <Calendar size={20} className="text-cyan-400" />
              <h2 className="text-xl font-semibold">{formatDate(currentDate)}</h2>
            </div>
            
            <button 
              onClick={() => navigateMonth('next')}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Timeline Visualization */}
        <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10 mb-8">
          <h3 className="text-lg font-semibold mb-6">Project Roadmap</h3>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-pink-400 to-yellow-400"></div>
            
            {/* Milestones */}
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <div 
                  key={milestone.id} 
                  className="relative pl-12 animate-slideUp"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Timeline Dot */}
                  <div className={`absolute left-2 w-5 h-5 rounded-full border-2 ${
                    milestone.status === 'completed' ? 'bg-green-400 border-green-400' :
                    milestone.status === 'in-progress' ? 'bg-cyan-400 border-cyan-400' :
                    'bg-gray-600 border-gray-400'
                  }`}>
                    <div className="absolute inset-0 rounded-full animate-pulse bg-current opacity-20"></div>
                  </div>
                  
                  {/* Milestone Card */}
                  <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all duration-200 group cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold group-hover:text-cyan-400 transition-colors">
                        {milestone.title}
                      </h4>
                      <span className="text-sm text-gray-400">{milestone.date}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        milestone.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        milestone.status === 'in-progress' ? 'bg-cyan-500/20 text-cyan-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {milestone.team}
                      </span>
                      
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-500 ${
                              milestone.status === 'completed' ? 'bg-green-400' :
                              milestone.status === 'in-progress' ? 'bg-cyan-400' :
                              'bg-gray-400'
                            }`}
                            style={{ width: `${milestone.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-400">{milestone.progress}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dependencies */}
        <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold mb-4">Dependencies & Blockers</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <h4 className="font-medium text-red-400 mb-2">Blocked Tasks</h4>
              <p className="text-sm text-gray-400">API integration waiting for backend deployment</p>
            </div>
            
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <h4 className="font-medium text-yellow-400 mb-2">At Risk</h4>
              <p className="text-sm text-gray-400">Design review may impact launch timeline</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;