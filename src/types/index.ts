export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  dueDate: string;
  tags: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold';
  progress: number;
  dueDate: string;
  team: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  capacity: number;
  currentTasks: number;
}