import React, { useState } from 'react';
import { Plus, MoreHorizontal, User } from 'lucide-react';
import TaskCard from '../components/TaskCard';
import { Task } from '../types';

interface KanbanBoardProps {
  tasks: Task[];
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onAddTask: () => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, onUpdateTask, onAddTask }) => {
  const columns = [
    { id: 'todo', title: 'To Do', color: 'gray' },
    { id: 'in-progress', title: 'In Progress', color: 'cyan' },
    { id: 'review', title: 'In Review', color: 'yellow' },
    { id: 'done', title: 'Done', color: 'green' }
  ];

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status);
  };

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('text/plain', taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, newStatus: string) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    
    onUpdateTask(taskId, { status: newStatus as Task['status'] });
  };

  return (
    <div className="p-8 h-full overflow-hidden">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Sprint Board
              </h1>
              <p className="text-gray-400 mt-2">
                Track and manage your team's tasks in real-time
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 rounded-lg hover:from-cyan-500/30 hover:to-pink-500/30 transition-all duration-200">
                <User size={16} />
                <span>Filter by Assignee</span>
              </button>
              <button 
                onClick={onAddTask}
                className="flex items-center space-x-2 px-4 py-2 bg-cyan-500/20 rounded-lg hover:bg-cyan-500/30 transition-all duration-200"
              >
                <Plus size={16} />
                <span>Add Task</span>
              </button>
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="flex-1 overflow-hidden">
          <div className="grid grid-cols-4 gap-6 h-full">
            {columns.map((column) => (
              <div
                key={column.id}
                className="flex flex-col bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                {/* Column Header */}
                <div className="p-4 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${
                        column.color === 'gray' ? 'bg-gray-400' :
                        column.color === 'cyan' ? 'bg-cyan-400' :
                        column.color === 'yellow' ? 'bg-yellow-400' : 'bg-green-400'
                      }`} />
                      <h2 className="font-semibold">{column.title}</h2>
                      <span className="text-sm text-gray-400 bg-white/10 px-2 py-1 rounded-full">
                        {getTasksByStatus(column.id).length}
                      </span>
                    </div>
                    <button className="p-1 hover:bg-white/10 rounded transition-colors">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </div>

                {/* Tasks */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                  {getTasksByStatus(column.id).map((task, index) => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task.id)}
                      className="animate-slideUp"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <TaskCard task={task} />
                    </div>
                  ))}
                  
                  {/* Add Task Button */}
                  <button 
                    onClick={onAddTask}
                    className="w-full p-4 border-2 border-dashed border-white/20 rounded-lg hover:border-white/40 hover:bg-white/5 transition-all duration-200 group"
                  >
                    <Plus size={20} className="mx-auto text-gray-400 group-hover:text-white transition-colors" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;