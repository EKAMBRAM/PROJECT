import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Target, 
  Clock,
  Users,
  BarChart3,
  PieChart
} from 'lucide-react';
import VelocityChart from '../components/VelocityChart';
import BurndownChart from '../components/BurndownChart';

const Insights: React.FC = () => {
  const metrics = [
    {
      title: 'Sprint Velocity',
      value: '34 SP',
      change: '+12%',
      trend: 'up',
      icon: TrendingUp,
      color: 'green'
    },
    {
      title: 'Cycle Time',
      value: '4.2 days',
      change: '-8%',
      trend: 'down',
      icon: Clock,
      color: 'cyan'
    },
    {
      title: 'Team Efficiency',
      value: '87%',
      change: '+3%',
      trend: 'up',
      icon: Users,
      color: 'pink'
    },
    {
      title: 'Blocked Tasks',
      value: '3',
      change: '+2',
      trend: 'up',
      icon: AlertTriangle,
      color: 'red'
    }
  ];

  const predictions = [
    {
      title: 'Sprint Completion',
      probability: 92,
      description: 'Current sprint likely to complete on time',
      type: 'success'
    },
    {
      title: 'Resource Bottleneck',
      probability: 68,
      description: 'Backend team may become overloaded next sprint',
      type: 'warning'
    },
    {
      title: 'Deadline Risk',
      probability: 34,
      description: 'MVP launch date has moderate risk',
      type: 'info'
    }
  ];

  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Project Insights
          </h1>
          <p className="text-gray-400 mt-2">
            AI-powered analytics and predictive insights for your team
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10 animate-slideUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${
                    metric.color === 'green' ? 'bg-green-500/20' :
                    metric.color === 'cyan' ? 'bg-cyan-500/20' :
                    metric.color === 'pink' ? 'bg-pink-500/20' : 'bg-red-500/20'
                  }`}>
                    <Icon size={20} className={
                      metric.color === 'green' ? 'text-green-400' :
                      metric.color === 'cyan' ? 'text-cyan-400' :
                      metric.color === 'pink' ? 'text-pink-400' : 'text-red-400'
                    } />
                  </div>
                  <div className={`flex items-center space-x-1 text-sm ${
                    metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {metric.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    <span>{metric.change}</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold">{metric.value}</h3>
                  <p className="text-gray-400 text-sm">{metric.title}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <VelocityChart />
          <BurndownChart />
        </div>

        {/* AI Predictions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Predictions */}
          <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center space-x-2 mb-6">
              <Target size={20} className="text-purple-400" />
              <h2 className="text-xl font-semibold">AI Predictions</h2>
            </div>
            
            <div className="space-y-4">
              {predictions.map((prediction, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 animate-slideUp"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{prediction.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      prediction.type === 'success' ? 'bg-green-500/20 text-green-400' :
                      prediction.type === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {prediction.probability}%
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-400 mb-3">{prediction.description}</p>
                  
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        prediction.type === 'success' ? 'bg-green-400' :
                        prediction.type === 'warning' ? 'bg-yellow-400' :
                        'bg-blue-400'
                      }`}
                      style={{ width: `${prediction.probability}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Performance */}
          <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center space-x-2 mb-6">
              <BarChart3 size={20} className="text-cyan-400" />
              <h2 className="text-xl font-semibold">Team Performance</h2>
            </div>
            
            <div className="space-y-4">
              {[
                { name: 'Alex Chen', tasks: 12, velocity: 89, avatar: 'AC' },
                { name: 'Sarah Kim', tasks: 8, velocity: 92, avatar: 'SK' },
                { name: 'Mike Johnson', tasks: 15, velocity: 76, avatar: 'MJ' },
                { name: 'Emma Davis', tasks: 6, velocity: 94, avatar: 'ED' }
              ].map((member, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full flex items-center justify-center text-black font-bold text-sm">
                    {member.avatar}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{member.name}</span>
                      <span className="text-sm text-gray-400">{member.tasks} tasks</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-400 to-pink-400 transition-all duration-500"
                          style={{ width: `${member.velocity}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-400">{member.velocity}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;