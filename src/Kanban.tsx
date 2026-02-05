
import React, { useState, useEffect } from 'react';
import { KanbanTask } from './types';

interface KanbanProps {
  isAdmin?: boolean;
}

const Kanban: React.FC<KanbanProps> = ({ isAdmin = false }) => {
  const [tasks, setTasks] = useState<KanbanTask[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('tadeu-kanban-v2');
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('tadeu-kanban-v2', JSON.stringify(tasks));
    window.dispatchEvent(new CustomEvent('kanban-update', { detail: tasks }));
  }, [tasks]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !isAdmin) return;
    // Fix: Changed 'content' to 'title' to comply with the KanbanTask interface in types.ts
    const newTask: KanbanTask = {
      id: Math.random().toString(36).substr(2, 9),
      title: inputValue,
      status: 'todo',
      columnId: '1', // Backlog padrão
      createdAt: Date.now(),
      isPublic: false
    };
    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  const moveTask = (id: string, newStatus: 'todo' | 'doing' | 'done') => {
    if (!isAdmin) return;
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const togglePublic = (id: string) => {
    if (!isAdmin) return;
    setTasks(tasks.map(t => t.id === id ? { ...t, isPublic: !t.isPublic } : t));
  };

  const deleteTask = (id: string) => {
    if (!isAdmin) return;
    setTasks(tasks.filter(t => t.id !== id));
  };

  // Filter tasks: if not admin, only show public tasks
  const filteredTasks = isAdmin ? tasks : tasks.filter(t => t.isPublic);

  const Column = ({ title, status, color }: { title: string, status: KanbanTask['status'], color: string }) => (
    <div className="flex-1 min-w-[300px] glass rounded-2xl p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${color}`}></span>
          {title}
        </h3>
        <span className="bg-slate-800 text-xs px-2 py-1 rounded-md text-slate-400">
          {filteredTasks.filter(t => t.status === status).length}
        </span>
      </div>
      
      <div className="flex flex-col gap-3 min-h-[100px]">
        {filteredTasks.filter(t => t.status === status).map(task => (
          <div key={task.id} className="bg-slate-800/50 border border-white/5 p-4 rounded-xl group hover:border-indigo-500/50 transition-all relative">
            {/* Fix: Accessing 'title' instead of 'content' as per types.ts */}
            <p className="text-sm text-slate-200 mb-3">{task.title}</p>
            
            {isAdmin && (
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-white/5">
                <div className="flex gap-2">
                   <button 
                    onClick={() => togglePublic(task.id)} 
                    title={task.isPublic ? "Público" : "Privado"}
                    className={`p-1 rounded transition-colors ${task.isPublic ? 'text-green-400' : 'text-slate-600'}`}
                    aria-label={task.isPublic ? "Marcar como privado" : "Marcar como público"}
                  >
                    {task.isPublic ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/></svg>
                    ) : (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd"/><path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"/></svg>
                    )}
                  </button>
                  <div className="flex border-l border-white/10 ml-1 pl-1">
                    {status !== 'todo' && (
                      <button onClick={() => moveTask(task.id, status === 'done' ? 'doing' : 'todo')} className="p-1 hover:text-indigo-400 text-slate-500" aria-label="Mover tarefa para esquerda">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                      </button>
                    )}
                    {status !== 'done' && (
                      <button onClick={() => moveTask(task.id, status === 'todo' ? 'doing' : 'done')} className="p-1 hover:text-indigo-400 text-slate-500" aria-label="Mover tarefa para direita">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </button>
                    )}
                  </div>
                </div>
                <button onClick={() => deleteTask(task.id)} className="text-slate-600 hover:text-red-400 p-1" aria-label="Excluir tarefa">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {/* Aviso de Desenvolvimento */}
      <div className="mb-8 bg-brutal-yellow border-4 border-black p-6 shadow-brutal">
        <p className="text-xs font-black uppercase tracking-widest text-black mb-2">⚠️ EM DESENVOLVIMENTO</p>
        <p className="text-sm font-bold text-black">
          Esta funcionalidade ainda está sendo desenvolvida. Em breve você poderá acompanhar meus projetos e metas de estudo em tempo real!
        </p>
      </div>

      {isAdmin && (
        <form onSubmit={addTask} className="mb-8 flex gap-2">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Nova meta pública ou privada..."
            className="flex-1 bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-indigo-500"
          />
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 px-6 py-2 rounded-xl text-white font-bold transition-all">
            Adicionar
          </button>
        </form>
      )}

      <div className="flex flex-col md:flex-row gap-6 overflow-x-auto pb-4">
        <Column title="A Fazer" status="todo" color="bg-blue-500" />
        <Column title="Em Andamento" status="doing" color="bg-yellow-500" />
        <Column title="Concluído" status="done" color="bg-green-500" />
      </div>
    </div>
  );
};

export default Kanban;
