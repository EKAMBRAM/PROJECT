import React from 'react';
import { 
  CheckCircle, 
  MessageSquare, 
  Upload, 
  GitCommit,
  Clock
} from 'lucide-react';

const ActivityFeed: React.FC = () => {
  const activities = [
    {
      id: '1',
      type: 'task_completed',
      user: 'Sarah Kim',
      action: 'completed',
      target: 'User authentication flow',
      time: '2 minutes ago',
      icon: CheckCircle,
      color: 'green'
    },
    {
      id: '2',
      type: 'comment',
      user: 'Mike Johnson',
      action: 'commented on',
      target: 'API integration task',
      time: '15 minutes ago',
      icon: MessageSquare,
      color: 'blue'
    },
    {
      id: '3',
      type: 'file_upload',
      user: 'Emma Davis',
      action: 'uploaded',
      target: 'Design mockups.zip',
      time: '1 hour ago',
      icon: Upload,
      color: 'purple'
    },
    {
      id: '4',
      type: 'commit',
      user: 'Alex Chen',
      action: 'pushed commits to',
      target: 'feature/payment-gateway',
      time: '2 hours ago',
      icon: GitCommit,
      color: 'cyan'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green':
        return 'bg-green-500/20 text-green-400';
      case 'blue':
        return 'bg-blue-500/20 text-blue-400';
      case 'purple':
        return 'bg-purple-500/20 text-purple-400';
      case 'cyan':
        return 'bg-cyan-500/20 text-cyan-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
      <div className="flex items-center space-x-2 mb-6">
        <Clock size={20} className="text-yellow-400" />
        <h2 className="text-xl font-semibold">Recent Activity</h2>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <div
              key={activity.id}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-all duration-200 animate-slideUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`p-2 rounded-lg ${getColorClasses(activity.color)}`}>
                <Icon size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-medium text-white">{activity.user}</span>
                  <span className="text-gray-400"> {activity.action} </span>
                  <span className="font-medium text-gray-300">{activity.target}</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      <button className="w-full mt-4 p-2 text-center text-sm text-gray-400 hover:text-white transition-colors">
        View all activity
      </button>
    </div>
  );
};

export default ActivityFeed;