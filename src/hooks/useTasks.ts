import { useState } from 'react';
import { Task } from '../types';

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Design user authentication flow',
    description: 'Create wireframes and mockups for the login/signup process',
    status: 'todo',
    priority: 'high',
    assignee: 'Alex Chen',
    dueDate: '2024-12-15',
    tags: ['design', 'auth']
  },
  {
    id: '2',
    title: 'Implement payment gateway',
    description: 'Integrate Stripe payment processing',
    status: 'in-progress',
    priority: 'high',
    assignee: 'Sarah Kim',
    dueDate: '2024-12-18',
    tags: ['backend', 'payments']
  },
  {
    id: '3',
    title: 'Set up CI/CD pipeline',
    description: 'Configure automated testing and deployment',
    status: 'in-progress',
    priority: 'medium',
    assignee: 'Mike Johnson',
    dueDate: '2024-12-20',
    tags: ['devops', 'automation']
  },
  {
    id: '4',
    title: 'User feedback analysis',
    description: 'Analyze and categorize user feedback from beta testing',
    status: 'review',
    priority: 'medium',
    assignee: 'Emma Davis',
    dueDate: '2024-12-12',
    tags: ['research', 'feedback']
  },
  {
    id: '5',
    title: 'Mobile app optimization',
    description: 'Improve app performance and reduce load times',
    status: 'done',
    priority: 'low',
    assignee: 'David Lee',
    dueDate: '2024-12-10',
    tags: ['mobile', 'performance']
  }
];

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = (newTask: Omit<Task, 'id'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString()
    };
    setTasks(prev => [...prev, task]);
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, ...updates } : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status);
  };

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.status === 'done').length;
    const inProgress = tasks.filter(task => task.status === 'in-progress').length;
    const blocked = tasks.filter(task => task.status === 'review').length;
    
    return {
      total,
      completed,
      inProgress,
      blocked,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  };

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    getTasksByStatus,
    getTaskStats
  };
};