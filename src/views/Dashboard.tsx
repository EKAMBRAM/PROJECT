import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Calendar,
  Plus
} from 'lucide-react';
import MetricCard from '../components/MetricCard';
import ProgressRing from '../components/ProgressRing';
import ActivityFeed from '../components/ActivityFeed';
import TeamCapacity from '../components/TeamCapacity';
import { Task } from '../types';

interface DashboardProps {
  tasks: Task[];
  taskStats: {
    total: number;
    completed: number;
    inProgress: number;
    blocked: number;
    completionRate: number;
  };
  onAddTask: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ tasks, taskStats, onAddTask }) => {
  const metrics = [
    {
      title: 'Active Projects',
      value: '12',
      change: '+2 this week',
      icon: TrendingUp,
      color: 'cyan'
    },
    {
      title: 'Team Members',
      value: '24',
      change: '3 online now',
      icon: Users,
      color: 'pink'
    },
    {
      title: 'Tasks Completed',
      value: taskStats.completed.toString(),
      change: `${taskStats.completionRate}% completion rate`,
      icon: CheckCircle,
      color: 'green'
    },
    {
      title: 'Avg. Velocity',
      value: '34',
      change: '+5% vs last sprint',
      icon: Clock,
      color: 'yellow'
    }
  ];

  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Project Command Center
              </h1>
              <p className="text-gray-400 mt-2">
                Welcome back! Here's what's happening with your projects.
              </p>
            </div>
            
            <button 
              onClick={onAddTask}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 rounded-lg hover:from-cyan-500/30 hover:to-pink-500/30 transition-all duration-200"
            >
              <Plus size={16} />
              <span>Add Task</span>
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <MetricCard 
              key={index} 
              {...metric} 
              delay={index * 100}
            />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sprint Progress */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Sprint */}
            <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Current Sprint</h2>
                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-medium">
                  Sprint 24
                </span>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium">Product Launch Prep</h3>
                  <p className="text-gray-400 text-sm">5 days remaining</p>
                </div>
                <ProgressRing value={taskStats.completionRate} size={80} />
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">{taskStats.completed}</div>
                  <div className="text-sm text-gray-400">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{taskStats.inProgress}</div>
                  <div className="text-sm text-gray-400">In Progress</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-400">{taskStats.blocked}</div>
                  <div className="text-sm text-gray-400">Blocked</div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <ActivityFeed />
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Team Capacity */}
            <TeamCapacity />

            {/* Upcoming Deadlines */}
            <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Calendar size={20} className="mr-2 text-pink-400" />
                Upcoming Deadlines
              </h2>
              
              <div className="space-y-4">
                {tasks
                  .filter(task => task.dueDate && task.status !== 'done')
                  .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                  .slice(0, 3)
                  .map((task, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200">
                    <div>
                      <div className="font-medium text-sm">{task.title}</div>
                      <div className="text-xs text-gray-400">{new Date(task.dueDate).toLocaleDateString()}</div>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      task.priority === 'high' ? 'bg-red-400' :
                      task.priority === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                    }`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              
              <div className="space-y-3">
                <button 
                  onClick={onAddTask}
                  className="w-full p-3 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 rounded-lg text-left hover:from-cyan-500/30 hover:to-pink-500/30 transition-all duration-200"
                >
                  <div className="font-medium">Create New Task</div>
                  <div className="text-sm text-gray-400">Add task to current sprint</div>
                </button>
                <button className="w-full p-3 bg-white/5 rounded-lg text-left hover:bg-white/10 transition-all duration-200">
                  <div className="font-medium">Schedule Meeting</div>
                  <div className="text-sm text-gray-400">Book team sync</div>
                </button>
                <button className="w-full p-3 bg-white/5 rounded-lg text-left hover:bg-white/10 transition-all duration-200">
                  <div className="font-medium">Generate Report</div>
                  <div className="text-sm text-gray-400">Sprint summary</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;