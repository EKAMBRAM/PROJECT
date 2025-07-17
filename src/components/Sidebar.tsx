import React from 'react';
import { LayoutDashboard, Kanban, Baseline as Timeline, FileText, BarChart3, Settings, User } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'kanban', icon: Kanban, label: 'Kanban Board' },
    { id: 'timeline', icon: Timeline, label: 'Timeline' },
    { id: 'docs', icon: FileText, label: 'Docs & Notes' },
    { id: 'insights', icon: BarChart3, label: 'Insights' },
  ];

  return (
    <div className="w-16 hover:w-64 transition-all duration-300 ease-out group bg-black/20 backdrop-blur-xl border-r border-white/10">
      <div className="p-4">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-sm">P</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`
                  w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200
                  ${isActive 
                    ? 'bg-gradient-to-r from-cyan-500/20 to-pink-500/20 text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }
                  group-hover:justify-start justify-center
                `}
              >
                <Icon 
                  size={20} 
                  className={`transition-all duration-200 ${isActive ? 'text-cyan-400' : ''}`} 
                />
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-medium">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="space-y-2">
            <button className="w-full flex items-center space-x-3 p-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200 group-hover:justify-start justify-center">
              <Settings size={20} />
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-medium">
                Settings
              </span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200 group-hover:justify-start justify-center">
              <User size={20} />
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-medium">
                Profile
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;