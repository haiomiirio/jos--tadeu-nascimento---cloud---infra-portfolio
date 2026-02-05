import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import KanbanCard from './KanbanCard';
import { KanbanTask } from '../../types';

interface ColumnProps {
  id: string;
  title: string;
  status: KanbanTask['status'] | string;
  color: string;
  tasks: KanbanTask[];
  isAdmin: boolean;
  currentUserId?: string;
  onUpdateTask?: (id: string, updates: Partial<KanbanTask>) => void;
  onDeleteTask?: (id: string) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
  onColumnDragStart?: (columnId: string, e: React.MouseEvent) => void;
}

const Column: React.FC<ColumnProps> = ({
  id,
  title,
  status,
  color,
  tasks,
  isAdmin,
  currentUserId,
  onUpdateTask,
  onDeleteTask,
  onLoadMore,
  hasMore = false,
  isLoading = false,
  onColumnDragStart,
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll infinito
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 150;

    if (isNearBottom && hasMore && !isLoading) {
      onLoadMore?.();
    }
  }, [hasMore, isLoading, onLoadMore]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollListener = () => handleScroll();
    container.addEventListener('scroll', scrollListener, { passive: true });

    return () => {
      container.removeEventListener('scroll', scrollListener);
    };
  }, [handleScroll]);

  return (
    <div
      className={`flex-shrink-0 w-96 border-2 border-gray-300 rounded-lg shadow-md ${color} flex flex-col overflow-hidden transition-all ${
        isMinimized ? 'h-auto' : 'h-[650px]'
      }`}
    >
      {/* Cabeçalho */}
      <div 
        className="bg-gradient-to-r from-gray-100 to-white p-4 flex items-center justify-between flex-shrink-0 border-b-2 border-gray-300 cursor-move select-none hover:shadow-md transition-shadow"
        onMouseDown={(e) => onColumnDragStart?.(id, e)}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <h3 className="text-lg font-bold text-gray-800 break-words">
            {title}
          </h3>
          <span className="bg-gray-300 text-gray-900 text-xs px-3 py-1 rounded-full font-bold">
            {tasks.length}
          </span>
        </div>

        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="p-1.5 hover:bg-gray-300 rounded transition-colors"
          aria-label={isMinimized ? "Expandir coluna" : "Minimizar coluna"}
        >
          {isMinimized ? '▼' : '▲'}
        </button>
      </div>

      {/* Cards */}
      {!isMinimized && (
        <div
          ref={scrollContainerRef}
          className="p-4 flex flex-col gap-4 flex-1 overflow-y-auto"
          style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
        >
          {tasks.length === 0 ? (
            <div className="text-gray-500 text-sm text-center py-12 select-none font-medium">
              📭 Nenhuma tarefa...
            </div>
          ) : (
            tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      opacity: snapshot.isDragging ? 0.5 : 1,
                    }}
                  >
                    <KanbanCard
                      task={task}
                      isAdmin={isAdmin}
                      currentUserId={currentUserId}
                      onUpdateTask={onUpdateTask}
                      onDeleteTask={onDeleteTask}
                    />
                  </div>
                )}
              </Draggable>
            ))
          )}

          {isLoading && (
            <div className="flex justify-center py-3">
              <div className="animate-bounce">⏳</div>
            </div>
          )}

          {hasMore && !isLoading && tasks.length > 0 && (
            <button
              onClick={onLoadMore}
              className="w-full py-3 px-4 text-sm text-gray-700 hover:bg-gray-300 rounded-lg transition-colors font-bold border-2 border-dashed border-gray-400"
            >
              ➕ Carregar Mais
            </button>
          )}
        </div>
      )}

      {isMinimized && (
        <div className="px-4 py-3 bg-white text-sm text-gray-700 font-bold border-t-2 border-gray-300">
          {tasks.length} tarefa{tasks.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
};

export default Column;
