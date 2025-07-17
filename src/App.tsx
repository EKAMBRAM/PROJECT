import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TaskModal from './components/TaskModal';
import Dashboard from './views/Dashboard';
import KanbanBoard from './views/KanbanBoard';
import Timeline from './views/Timeline';
import Docs from './views/Docs';
import Insights from './views/Insights';
import { AnimatePresence } from './utils/animations';
import { useTasks } from './hooks/useTasks';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const { tasks, addTask, updateTask, deleteTask, getTasksByStatus, getTaskStats } = useTasks();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard 
          tasks={tasks} 
          taskStats={getTaskStats()} 
          onAddTask={() => setIsTaskModalOpen(true)} 
        />;
      case 'kanban':
        return <KanbanBoard 
          tasks={tasks} 
          onUpdateTask={updateTask} 
          onAddTask={() => setIsTaskModalOpen(true)} 
        />;
      case 'timeline':
        return <Timeline />;
      case 'docs':
        return <Docs />;
      case 'insights':
        return <Insights />;
      default:
        return <Dashboard 
          tasks={tasks} 
          taskStats={getTaskStats()} 
          onAddTask={() => setIsTaskModalOpen(true)} 
        />;
    }
  };

  return (
    <div className="h-screen bg-[#0E1117] text-white overflow-hidden">
      {/* Background gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-pink-500/5 pointer-events-none" />
      
      <div className="flex h-full">
        <Sidebar currentView={currentView} onViewChange={setCurrentView} />
        
        <main className="flex-1 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <div
              key={currentView}
              className="h-full animate-slideIn"
            >
              {renderCurrentView()}
            </div>
          </AnimatePresence>
        </main>
      </div>
      
      {/* Task Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSubmit={addTask}
      />
    </div>
  );
}

export default App;