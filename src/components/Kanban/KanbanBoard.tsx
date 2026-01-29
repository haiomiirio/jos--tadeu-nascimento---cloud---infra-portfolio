import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { RootState, AppDispatch } from '../../redux/store';
import {
  setTasks,
  addTask,
  updateTask,
  deleteTask,
  setColumns,
  addColumn,
  deleteColumn,
  updateColumn,
  setZoom,
  setPan,
  updatePan,
  setMenuMinimized,
  setMenuPos,
  updateMenuPos,
  setSelectedColumn,
} from '../../redux/slices/kanbanSlice';
import { KanbanTask } from '../../types';
import Column from './Column';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface KanbanBoardProps {
  tasks?: KanbanTask[];
  isAdmin: boolean;
  currentUserId?: string;
  isReadOnly?: boolean; // Se true, apenas visualização e drag-drop, sem edições
  onAddTask?: (task: Omit<KanbanTask, 'id' | 'createdAt'>) => void;
  onUpdateTask?: (id: string, updates: Partial<KanbanTask>) => void;
  onDeleteTask?: (id: string) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  tasks: externalTasks,
  isAdmin,
  currentUserId,
  isReadOnly = false,
  onAddTask: externalOnAddTask,
  onUpdateTask: externalOnUpdateTask,
  onDeleteTask: externalOnDeleteTask,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    tasks,
    columns,
    zoom,
    pan,
    selectedColumn,
    menuMinimized,
    menuPos,
  } = useSelector((state: RootState) => state.kanban);

  const boardRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const draggingColumnRef = useRef<{
    id: string;
    startX: number;
    startY: number;
    startPosX: number;
    startPosY: number;
    boardRect: DOMRect;
  } | null>(null);

  const [storedTasks, setStoredTasks] = useLocalStorage<KanbanTask[]>('kanban-tasks', []);
  const [storedColumns, setStoredColumns] = useLocalStorage('kanban-columns', columns);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [taskPriority, setTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [taskLabels, setTaskLabels] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [draggingMenu, setDraggingMenu] = useState<{ startX: number; startY: number } | null>(null);

  // Sincroniza tasks externas
  useEffect(() => {
    if (externalTasks) {
      dispatch(setTasks(externalTasks));
    } else {
      const loaded = storedTasks.length > 0 ? storedTasks : [];
      if (loaded.length > 0) {
        dispatch(setTasks(loaded));
      }
    }
  }, [externalTasks, dispatch]);

  // Migra tarefas antigas que não têm columnId
  useEffect(() => {
    const migratedTasks = tasks.map(task => {
      if (!task.columnId) {
        let columnId = '0';
        if (task.status === 'todo') columnId = '1';
        if (task.status === 'doing') columnId = '4';
        if (task.status === 'done') columnId = '7';
        return { ...task, columnId };
      }
      return task;
    });
    if (migratedTasks.some((t, i) => t.columnId !== tasks[i].columnId)) {
      dispatch(setTasks(migratedTasks));
    }
  }, []);

  // Salva tasks no localStorage
  useEffect(() => {
    if (!externalTasks && tasks.length > 0) {
      setStoredTasks(tasks);
    }
  }, [tasks, externalTasks]);

  // Salva colunas no localStorage
  useEffect(() => {
    setStoredColumns(columns);
  }, [columns]);

  const handleAddTask = (columnId?: string) => {
    if (!newTaskTitle.trim()) return;

    const targetColumnId = columnId || '0';
    const targetColumn = columns.find(c => c.id === targetColumnId);
    if (!targetColumn) return;

    const newTaskData: Omit<KanbanTask, 'id' | 'createdAt'> = {
      title: newTaskTitle,
      description: '',
      status: targetColumn.status,
      columnId: targetColumnId,
      isPublic: true, // TODO: Is this always true? Should be configurable
      priority: taskPriority,
      labels: taskLabels.split(',').map(l => l.trim()).filter(l => l),
      dueDate: taskDueDate || undefined,
      userId: currentUserId,
    };

    if (externalOnAddTask) {
      externalOnAddTask(newTaskData);
    } else {
      const newTask: KanbanTask = {
        id: Math.random().toString(36).substring(7),
        createdAt: Date.now(),
        ...newTaskData,
      };
      dispatch(addTask(newTask));
    }

    setNewTaskTitle('');
    setSelectedColumn('');
    setTaskPriority('medium');
    setTaskLabels('');
    setTaskDueDate('');
  };

  const handleAddColumn = () => {
    if (!newColumnTitle.trim()) return;

    const newColumn = {
      id: Math.random().toString(36).substring(7),
      title: newColumnTitle,
      status: 'todo' as const,
      color: 'bg-gray-100',
      x: 0,
      y: 0,
    };

    dispatch(addColumn(newColumn));
    setNewColumnTitle('');
  };

  const handleDeleteColumn = (columnId: string) => {
    if (columnId === '0') return; // Não pode deletar a coluna de tarefas soltas
    dispatch(deleteColumn(columnId));
  };

  const handleUpdateTask = (id: string, updates: Partial<KanbanTask>) => {
    if (externalOnUpdateTask) {
      externalOnUpdateTask(id, updates);
    } else {
      dispatch(updateTask({ id, updates }));
    }
  };

  const handleDeleteTask = (id: string) => {
    if (externalOnDeleteTask) {
      externalOnDeleteTask(id);
    } else {
      dispatch(deleteTask(id));
    }
  };

  // Drag & Drop
  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination || source.droppableId === destination.droppableId) return;

    const taskId = draggableId;
    const destColumnId = destination.droppableId;
    const destColumn = columns.find(c => c.id === destColumnId);

    if (!destColumn) return;

    handleUpdateTask(taskId, {
      columnId: destColumnId,
      status: destColumn.status,
    });
  };

  // Wheel & Pan
  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY < 0) {
      dispatch(setZoom(Math.min(zoom + 0.1, 3)));
    } else {
      dispatch(setZoom(Math.max(zoom - 0.1, 0.1)));
    }
  };

  const handleColumnDragStart = (columnId: string, e: React.MouseEvent) => {
    const column = columns.find(c => c.id === columnId);
    if (!column || !boardRef.current) return;
  
    e.preventDefault();
    e.stopPropagation();
  
    const boardRect = boardRef.current.getBoundingClientRect();
  
    draggingColumnRef.current = {
      id: columnId,
      startX: (e.clientX - boardRect.left) / zoom,
      startY: (e.clientY - boardRect.top) / zoom,
      startPosX: column.x || 0,
      startPosY: column.y || 0,
      boardRect: boardRect,
    };
  
    const handleColumnMouseMove = (moveEvent: MouseEvent) => {
      if (!draggingColumnRef.current) return;
  
      const { startX, startY, startPosX, startPosY, boardRect } = draggingColumnRef.current;
  
      const mouseX = (moveEvent.clientX - boardRect.left) / zoom;
      const mouseY = (moveEvent.clientY - boardRect.top) / zoom;
  
      const deltaX = mouseX - startX;
      const deltaY = mouseY - startY;
  
      const newX = startPosX + deltaX;
      const newY = startPosY + deltaY;
  
      dispatch(updateColumn({
        id: columnId,
        updates: { x: newX, y: newY }
      }));
    };
  
    const handleColumnMouseUp = () => {
      draggingColumnRef.current = null;
      document.removeEventListener('mousemove', handleColumnMouseMove);
      document.removeEventListener('mouseup', handleColumnMouseUp);
    };
  
    document.addEventListener('mousemove', handleColumnMouseMove);
    document.addEventListener('mouseup', handleColumnMouseUp);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    // Não faz pan se clicar em elementos interativos ou no header das colunas
    if ((e.target as HTMLElement).closest('button, input, select, [class*="droppable"], .cursor-move')) return;
  };

  // Menu Drag
  const handleMenuDragStart = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button, input, select')) return;
    setDraggingMenu({ startX: e.clientX, startY: e.clientY });
  };

  const handleMenuDragMove = (e: React.MouseEvent) => {
    if (!draggingMenu) return;

    const deltaX = e.clientX - draggingMenu.startX;
    const deltaY = e.clientY - draggingMenu.startY;

    dispatch(updateMenuPos({ deltaX, deltaY }));
    setDraggingMenu({ startX: e.clientX, startY: e.clientY });
  };

  const handleMouseUp = () => {
    setDraggingMenu(null);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        className="w-full rounded-lg border-2 border-gray-300 relative shadow-lg flex items-center justify-center overflow-hidden"
        style={{
          height: 'calc(100vh - 350px)',
          minHeight: '600px',
          background: `linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #1e3a5f 50%, #2d1b4e 75%, #0f172a 100%)`,
        }}
        ref={boardRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMenuDragMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `linear-gradient(90deg, #3b82f6 1px, transparent 1px), linear-gradient(0deg, #3b82f6 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Conteúdo */}
        <div
          ref={innerRef}
          onMouseDown={handleMouseDown}
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'center center',
            transition: 'transform 0.2s ease-out',
          }}
          className="flex gap-5 h-full items-center absolute"
        >
          {columns.map((col) => {
            const columnTasks = tasks
              .filter((t) => t.columnId === col.id)
              .sort((a, b) => (b.createdAt as number) - (a.createdAt as number));

            return (
              <div
                key={col.id} 
                className="flex-shrink-0 absolute"
                style={{
                  left: `calc(50% + ${col.x || 0}px - 192px)`,
                  top: `calc(50% + ${col.y || 0}px - 325px)`,
                  transition: draggingColumnRef.current?.id === col.id ? 'none' : 'all 0.2s ease-out',
                  zIndex: draggingColumnRef.current?.id === col.id ? 50 : 10,
                }}
              >
                {isAdmin && col.id !== '0' && (
                  <button
                    onClick={() => handleDeleteColumn(col.id)}
                    className="mb-2 bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                  >
                    ✕
                  </button>
                )}
                <Droppable droppableId={col.id}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="w-96"
                    >
                      <Column
                        id={col.id}
                        title={col.title}
                        status={col.status}
                        color={col.color}
                        tasks={columnTasks}
                        isAdmin={isAdmin}
                        currentUserId={currentUserId}
                        onUpdateTask={handleUpdateTask}
                        onDeleteTask={handleDeleteTask}
                        onColumnDragStart={handleColumnDragStart}
                      />
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>

        {/* Menu Flutuante */}
        <div
          ref={menuRef}
          onMouseDown={handleMenuDragStart}
          className="absolute top-6 left-6 bg-white rounded-lg border-2 border-gray-300 shadow-lg p-3 z-50 cursor-move"
          style={{
            transform: `translateX(${menuPos.x}px) translateY(${menuPos.y}px)`,
          }}
        >
          <div className="flex items-center justify-between mb-2 gap-3">
            <h3 className="text-xs font-bold">⚙️ Menu</h3>
            <button
              onClick={() => dispatch(setMenuMinimized(!menuMinimized))}
              className="p-1 hover:bg-gray-200 rounded"
            >
              {menuMinimized ? '▼' : '▲'}
            </button>
          </div>

          {!menuMinimized && (
            <>
              {!isReadOnly && (
                <>
                  {/* Tarefa */}
                  <div className="border-t pt-2 mb-2">
                    <label className="text-xs font-bold block mb-1">➕ Tarefa</label>
                    <div className="flex gap-1 flex-wrap">
                      <input
                        type="text"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddTask(selectedColumn || undefined)}
                        placeholder="Título..."
                        className="flex-1 min-w-[80px] px-2 py-1 border border-gray-300 rounded text-xs"
                        onMouseDown={(e) => e.stopPropagation()}
                      />
                      <select
                        value={selectedColumn}
                        onChange={(e) => dispatch(setSelectedColumn(e.target.value))}
                        className="px-2 py-1 border border-gray-300 rounded text-xs"
                        onMouseDown={(e) => e.stopPropagation()}
                      >
                        <option value="">Solta</option>
                        {columns.filter(col => col.id !== '0').map((col) => (
                          <option key={col.id} value={col.id}>{col.title.slice(0, 10)}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleAddTask(selectedColumn || undefined)}
                        className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600"
                        onMouseDown={(e) => e.stopPropagation()}
                      >
                        ✓
                      </button>
                    </div>
                  </div>

                  {/* Coluna */}
                  <div className="border-t pt-2">
                    <label className="text-xs font-bold block mb-1">📋 Coluna</label>
                    <div className="flex gap-1">
                      <input
                        type="text"
                        value={newColumnTitle}
                        onChange={(e) => setNewColumnTitle(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddColumn()}
                        placeholder="Nome..."
                        className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"
                        onMouseDown={(e) => e.stopPropagation()}
                      />
                      <button
                        onClick={handleAddColumn}
                        className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
                        onMouseDown={(e) => e.stopPropagation()}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </>
              )}

              {isReadOnly && (
                <div className="border-t pt-2 text-xs text-gray-600 font-bold">
                  👁️ Modo Visualização - Arraste para mover
                </div>
              )}

              {/* Info */}
              <div className="text-xs text-gray-600 border-t pt-2 mt-2">
                <span>🔍 {Math.round(zoom * 100)}%</span>
              </div>
            </>
          )}
        </div>
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
