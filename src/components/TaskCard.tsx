import React from 'react';
import { Calendar, Flag, User } from 'lucide-react';
import { Task } from '../types';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-400 bg-red-500/20';
      case 'medium':
        return 'text-yellow-400 bg-yellow-500/20';
      case 'low':
        return 'text-green-400 bg-green-500/20';
      default:
        return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-200 cursor-pointer group">
      <div className="mb-3">
        <h3 className="font-medium text-white group-hover:text-cyan-400 transition-colors">
          {task.title}
        </h3>
        <p className="text-sm text-gray-400 mt-1 line-clamp-2">
          {task.description}
        </p>
      </div>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {task.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center space-x-2">
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
            <Flag size={10} />
            <span className="capitalize">{task.priority}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <Calendar size={12} />
            <span>{task.dueDate}</span>
          </div>
          <div className="flex items-center space-x-1">
            <User size={12} />
            <span>{task.assignee.split(' ')[0]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;