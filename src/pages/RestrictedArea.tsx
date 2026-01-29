import React, { useState } from 'react';
import { KanbanTask, User } from '../types';
import KanbanBoard from '../components/Kanban/KanbanBoard';
import KanbanForm from '../components/Kanban/KanbanForm';

interface RestrictedAreaProps {
  currentUser: User;
  tasks: KanbanTask[];
  onAddTask: (task: Omit<KanbanTask, 'id' | 'createdAt'>) => void;
  onUpdateTask: (id: string, updates: Partial<KanbanTask>) => void;
  onDeleteTask: (id: string) => void;
}

const RestrictedArea: React.FC<RestrictedAreaProps> = ({ 
  currentUser, 
  tasks, 
  onAddTask, 
  onUpdateTask, 
  onDeleteTask 
}) => {
  const [showForm, setShowForm] = useState(false);

  const userTasks = tasks.filter(t => t.userId === currentUser.id);

  return (
    <div className="max-w-7xl mx-auto py-32 px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-24 gap-8">
        <div>
            <div className="bg-brutal-pink border-4 border-black px-6 py-2 shadow-brutal mb-4 inline-block -rotate-1">
                <h2 className="text-4xl font-black uppercase tracking-tighter">ÁREA RESTRITA</h2>
            </div>
          <p className="text-black text-lg font-black uppercase tracking-widest mt-2">
            CONECTADO COMO: <span className="bg-brutal-yellow px-2">{currentUser.name}</span>
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`brutal-btn px-10 py-5 text-sm uppercase tracking-widest ${
            showForm ? 'bg-white' : 'bg-brutal-blue shadow-brutalLarge'
          }`}
        >
          {showForm ? 'FECHAR ×' : 'NOVA TAREFA +'}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {showForm && (
          <div className="max-w-2xl mx-auto w-full animate-in slide-in-from-top-4 duration-300 mb-16">
            <KanbanForm onAddTask={(task) => {
              onAddTask({ ...task, userId: currentUser.id, isPublic: false });
              setShowForm(false);
            }} />
          </div>
        )}

        <div className="w-full">
          <div className="flex items-center gap-6 mb-12">
            <div className="w-6 h-6 bg-brutal-yellow border-2 border-black"></div>
            <h3 className="text-3xl font-black uppercase tracking-tighter">MEU QUADRO PRIVADO</h3>
            <div className="ml-auto bg-black text-white px-4 py-1 text-xs font-black uppercase tracking-widest">
                PRIVADO
            </div>
          </div>
          
          <KanbanBoard 
            tasks={userTasks} 
            isAdmin={true}
            currentUserId={currentUser.id}
            onAddTask={onAddTask}
            onUpdateTask={onUpdateTask} 
            onDeleteTask={onDeleteTask} 
          />
        </div>
      </div>
    </div>
  );
};

export default RestrictedArea;