
import React, { useState } from 'react';
import { KanbanTask } from '../../types';
import KanbanCard from './KanbanCard';

interface KanbanColumnProps {
  title: string;
  status: KanbanTask['status'];
  color: string;
  tasks: KanbanTask[];
  isAdmin: boolean;
  onUpdateTask?: (id: string, updates: Partial<KanbanTask>) => void;
  onDeleteTask?: (id: string) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, status, color, tasks, isAdmin, onUpdateTask, onDeleteTask }) => {
  const [isDropActive, setIsDropActive] = useState(false);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  const handleDragStart = (_e: React.DragEvent, taskId: string) => {
    setDraggedTaskId(taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (!isAdmin) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDropActive(true);
  };

  const handleDragLeave = () => {
    setIsDropActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    if (!isAdmin) return;
    e.preventDefault();
    setIsDropActive(false);
    
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId && onUpdateTask) {
      onUpdateTask(taskId, { status });
    }
    setDraggedTaskId(null);
  };
  return (
    <div 
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex-shrink-0 w-[280px] md:w-[320px] h-full border-4 border-black shadow-brutal ${color} flex flex-col overflow-hidden transition-all ${
        isDropActive && isAdmin ? 'border-dashed bg-white/30' : ''
      }`}
    >
      <div className="bg-black text-white p-4 flex items-center justify-between flex-shrink-0">
        <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
          {title}
        </h3>
        <span className="bg-white text-black text-[10px] px-2 py-0.5 font-black border-2 border-black">
          {tasks.length}
        </span>
      </div>
      <div className="p-4 flex flex-col gap-4 flex-1 overflow-y-auto custom-scrollbar bg-white/10">
        {tasks.map(task => (
          <KanbanCard
            key={task.id}
            task={task}
            isAdmin={isAdmin}
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
            onDragStart={handleDragStart}
          />
        ))}
        {tasks.length === 0 && (
          <div className="text-black text-[10px] uppercase font-black text-center py-12 border-4 border-dashed border-black/20 rounded-none">
            SEM TAREFAS
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
