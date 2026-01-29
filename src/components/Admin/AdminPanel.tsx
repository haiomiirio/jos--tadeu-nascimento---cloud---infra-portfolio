import React, { useState } from 'react';
import { KanbanTask, FinanceEntry, User } from '../../types';
import KanbanBoard from '../Kanban/KanbanBoard';
import KanbanForm from '../Kanban/KanbanForm';
import FinancePage from '../../pages/FinancePage';

interface AdminPanelProps {
  tasks: KanbanTask[];
  onAddTask: (task: Omit<KanbanTask, 'id' | 'createdAt'>) => void;
  onUpdateTask: (id: string, updates: Partial<KanbanTask>) => void;
  onDeleteTask: (id: string) => void;
  onLogout: () => void;
  financeEntries?: FinanceEntry[];
  onAddFinanceEntry?: (entry: Omit<FinanceEntry, 'id'>) => void;
  onDeleteFinanceEntry?: (id: string) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  tasks, 
  onAddTask, 
  onUpdateTask, 
  onDeleteTask, 
  onLogout,
  financeEntries = [],
  onAddFinanceEntry,
  onDeleteFinanceEntry,
}) => {
  const [activeTab, setActiveTab] = useState<'kanban' | 'finance'>('kanban');
  const adminUser: User = { id: 'admin', name: 'ADMIN', email: 'admin@portfolio.com' };
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 sm:mb-24 gap-6 sm:gap-8">
        <div>
            <div className="bg-black text-white border-4 border-black px-4 sm:px-6 py-2 shadow-brutal mb-3 sm:mb-4 inline-block rotate-1">
                <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter">MODO ADMIN</h2>
            </div>
          <p className="text-black text-xs sm:text-sm uppercase font-black tracking-widest">GERENCIAMENTO ESTRUTURAL DO PORTFÓLIO</p>
                <div className="flex gap-3 sm:gap-4">
                  <button
                    onClick={() => setActiveTab('kanban')}
                    className={`px-4 sm:px-6 py-2 sm:py-3 font-black uppercase text-xs border-4 border-black shadow-brutal transition-all ${
                      activeTab === 'kanban' ? 'bg-brutal-pink text-black' : 'bg-white text-black'
                    }`}
                  >
                    📋 KANBAN
                  </button>
                  <button
                    onClick={() => setActiveTab('finance')}
                    className={`px-4 sm:px-6 py-2 sm:py-3 font-black uppercase text-xs border-4 border-black shadow-brutal transition-all ${
                      activeTab === 'finance' ? 'bg-brutal-yellow text-black' : 'bg-white text-black'
                    }`}
                  >
                    💰 FINANÇAS
                  </button>
                </div>
        </div>
        <button 
          onClick={onLogout}
          className="brutal-btn bg-brutal-red text-white px-6 sm:px-8 py-3 sm:py-4 text-xs uppercase shadow-brutal"
        >
          DESLOGAR ADMIN →
        </button>
      </div>

      {activeTab === 'kanban' && (
      <div className="grid lg:grid-cols-[320px_1fr] gap-8 sm:gap-12 items-start">
        <aside className="sticky top-28">
          <KanbanForm onAddTask={onAddTask} userId="admin" />
          
          <div className="mt-8 sm:mt-12 bg-white border-4 border-black p-4 sm:p-8 shadow-brutalLarge">
            <h4 className="text-lg sm:text-xl font-black uppercase mb-6 sm:mb-8 tracking-tighter border-b-4 border-black pb-2">STATUS</h4>
            <div className="space-y-4 sm:space-y-6">
              <div className="flex justify-between items-center text-xs sm:text-sm font-black uppercase">
                <span>TOTAL:</span>
                <span className="bg-brutal-blue border-2 border-black px-2 sm:px-3 py-1 text-xs">{tasks.length}</span>
              </div>
              <div className="flex justify-between items-center text-xs sm:text-sm font-black uppercase">
                <span>PÚBLICAS:</span>
                <span className="bg-brutal-yellow border-2 border-black px-2 sm:px-3 py-1 text-xs">{tasks.filter(t => t.isPublic).length}</span>
              </div>
              <div className="flex justify-between items-center text-xs sm:text-sm font-black uppercase">
                <span>PRIVADAS:</span>
                <span className="bg-brutal-pink border-2 border-black px-2 sm:px-3 py-1 text-xs">{tasks.filter(t => !t.isPublic).length}</span>
              </div>
            </div>
          </div>
        </aside>

        <div className="w-full">
          <div className="flex items-center gap-4 sm:gap-6 mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter">KANBAN</h3>
            <div className="h-1 flex-1 bg-black"></div>
          </div>
          
          <div className="bg-white border-4 border-black p-3 sm:p-4 rounded-lg overflow-x-auto">
            <KanbanBoard 
              tasks={tasks} 
              isAdmin={true}
              currentUserId="admin"
              onUpdateTask={onUpdateTask} 
              onDeleteTask={onDeleteTask} 
            />
          </div>
        </div>
      </div>
      )}

      {activeTab === 'finance' && (
      <div className="w-full">
        {onAddFinanceEntry && onDeleteFinanceEntry && (
          <FinancePage 
            currentUser={adminUser}
            entries={financeEntries}
            onAddEntry={onAddFinanceEntry}
            onDeleteEntry={onDeleteFinanceEntry}
          />
        )}
      </div>
      )}
    </div>
  );
};

export default AdminPanel;