import React, { useRef, useState } from 'react';
import { KanbanTask } from '../../types';

interface KanbanCardProps {
  task: KanbanTask;
  isAdmin: boolean;
  currentUserId?: string;
  onUpdateTask?: (id: string, updates: Partial<KanbanTask>) => void;
  onDeleteTask?: (id: string) => void;
  onDragStart?: (e: React.DragEvent, taskId: string) => void;
}

const KanbanCard: React.FC<KanbanCardProps> = ({ task, isAdmin, currentUserId, onUpdateTask, onDeleteTask, onDragStart }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  // Verificação de permissão de exclusão
  const canDelete = isAdmin || (currentUserId && task.userId === currentUserId);

  // Cores de post-it baseadas no hash da tarefa
  const postItColors = [
    'bg-yellow-100 border-yellow-200',
    'bg-pink-100 border-pink-200',
    'bg-blue-100 border-blue-200',
    'bg-green-100 border-green-200',
    'bg-purple-100 border-purple-200',
    'bg-orange-100 border-orange-200',
  ];

  const colorIndex = task.id.charCodeAt(0) % postItColors.length;
  const postItColor = postItColors[colorIndex];

  // Rotação aleatória leve
  const rotation = ((task.id.charCodeAt(0) + task.id.charCodeAt(1)) % 6) - 3; // -3 a +3 graus
  
  const handleStatusMove = (direction: 'next' | 'prev') => {
    if (!onUpdateTask) return;
    const flow: KanbanTask['status'][] = ['todo', 'doing', 'done'];
    const currentIndex = flow.indexOf(task.status);
    const nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= 0 && nextIndex < flow.length) {
      onUpdateTask(task.id, { status: flow[nextIndex] });
    }
  };

  // Drag and drop com mouse
  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('taskId', task.id);
    onDragStart?.(e, task.id);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Suporte a touch/mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isAdmin) return;
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isAdmin || !touchStartRef.current || !cardRef.current) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    
    // Aplica efeito visual de arrasto no touch
    if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
      cardRef.current.style.opacity = '0.7';
      cardRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.95)`;
    }
  };

  const handleTouchEnd = () => {
    touchStartRef.current = null;
    if (cardRef.current) {
      cardRef.current.style.opacity = '1';
      cardRef.current.style.transform = 'translate(0, 0) scale(1)';
      cardRef.current.style.transition = 'all 0.2s ease-out';
      setTimeout(() => {
        if (cardRef.current) {
          cardRef.current.style.transition = '';
        }
      }, 200);
    }
  };

  return (
    <div 
      ref={cardRef}
      draggable={isAdmin}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`${postItColor} border-2 rounded-sm p-4 relative group transition-all shadow-md hover:shadow-lg hover:scale-105 ${
        isDragging ? 'opacity-60 shadow-none rotate-6' : ''
      } ${
        isAdmin ? 'cursor-grab active:cursor-grabbing' : ''
      }`}
      style={{
        transform: `rotate(${rotation}deg)`,
        minHeight: '150px',
        maxWidth: '180px',
      }}
    >
      <div className="flex justify-between items-start mb-2 gap-2">
        <h4 className="text-sm font-semibold text-gray-800 leading-tight pr-2 flex-1">{task.title}</h4>
        {isAdmin && (
          <button 
            onClick={() => onUpdateTask?.(task.id, { isPublic: !task.isPublic })}
            className={`text-[10px] px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all opacity-75 hover:opacity-100 ${
              task.isPublic ? 'bg-blue-300 text-blue-900' : 'bg-gray-300 text-gray-900'
            }`}
            aria-label={task.isPublic ? "Marcar como privado" : "Marcar como público"}
          >
            {task.isPublic ? '🔓' : '🔒'}
          </button>
        )}
      </div>

      {/* Labels e Prioridade */}
      <div className="flex flex-wrap gap-1 mb-2">
        {task.priority && (
          <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
            task.priority === 'high' ? 'bg-red-300 text-red-900' :
            task.priority === 'medium' ? 'bg-yellow-300 text-yellow-900' :
            'bg-green-300 text-green-900'
          }`}>
            {task.priority === 'high' ? '🔴 Alta' : task.priority === 'medium' ? '🟡 Média' : '🟢 Baixa'}
          </span>
        )}
        {task.labels?.map((label) => (
          <span key={label} className="text-[10px] px-2 py-0.5 rounded-full bg-blue-200 text-blue-900 font-medium">
            {label}
          </span>
        ))}
      </div>

      {/* Data de Vencimento */}
      {task.dueDate && (
        <div className="text-[11px] text-gray-700 font-medium mb-2 flex items-center gap-1">
          📅 {new Date(task.dueDate).toLocaleDateString('pt-BR')}
        </div>
      )}
      
      {task.description && (
        <p className="text-xs text-gray-700 mb-3 leading-tight font-medium">
          {task.description}
        </p>
      )}
      
      {isAdmin && (
        <div className="flex justify-between items-center mt-4 pt-3 border-t-2 border-gray-300 gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex gap-1">
            <button 
              onClick={() => handleStatusMove('prev')} 
              disabled={task.status === 'todo'} 
              className="p-1 flex items-center justify-center hover:bg-black/10 rounded disabled:opacity-0 transition-colors text-gray-600"
              title="Mover para trás"
              aria-label="Mover tarefa para trás"
            >
              ◀
            </button>
            <button 
              onClick={() => handleStatusMove('next')} 
              disabled={task.status === 'done'} 
              className="p-1 flex items-center justify-center hover:bg-black/10 rounded disabled:opacity-0 transition-colors text-gray-600"
              title="Mover para frente"
              aria-label="Mover tarefa para frente"
            >
              ▶
            </button>
          </div>
          
          {canDelete && (
            <button 
              onClick={() => onDeleteTask?.(task.id)} 
              className="p-1 flex items-center justify-center hover:bg-red-300 text-gray-600 hover:text-red-700 rounded transition-colors font-bold"
              title="Deletar tarefa"
              aria-label="Excluir tarefa"
            >
              ✕
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default KanbanCard;