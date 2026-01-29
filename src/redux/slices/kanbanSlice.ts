import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { KanbanTask } from '../../types';

export interface ColumnData {
  id: string;
  title: string;
  status: KanbanTask['status'];
  color: string;
  x?: number;
  y?: number;
}

interface KanbanState {
  tasks: KanbanTask[];
  columns: ColumnData[];
  zoom: number;
  pan: { x: number; y: number };
  selectedColumn: string;
  menuMinimized: boolean;
  menuPos: { x: number; y: number };
}

const initialState: KanbanState = {
  tasks: [],
  columns: [
    { id: '0', title: '🔓 Tarefas Soltas', status: 'unassigned', color: 'bg-red-50' },
    { id: '1', title: '📋 Backlog', status: 'todo', color: 'bg-gray-100' },
    { id: '2', title: '🎨 Design', status: 'todo', color: 'bg-blue-50' },
    { id: '3', title: '✏️ A Fazer', status: 'todo', color: 'bg-purple-50' },
    { id: '4', title: '⚙️ Em andamento', status: 'doing', color: 'bg-yellow-50' },
    { id: '5', title: '🔍 Revisão', status: 'doing', color: 'bg-orange-50' },
    { id: '6', title: '🧪 Teste', status: 'doing', color: 'bg-pink-50' },
    { id: '7', title: '✅ Concluído 🎉', status: 'done', color: 'bg-green-50' },
  ],
  zoom: 1,
  pan: { x: 0, y: 0 },
  selectedColumn: '',
  menuMinimized: false,
  menuPos: { x: 0, y: 0 },
};

export const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    // Tasks
    setTasks: (state, action: PayloadAction<KanbanTask[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<KanbanTask>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<{ id: string; updates: Partial<KanbanTask> }>) => {
      const task = state.tasks.find(t => t.id === action.payload.id);
      if (task) {
        Object.assign(task, action.payload.updates);
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    },

    // Columns
    setColumns: (state, action: PayloadAction<ColumnData[]>) => {
      state.columns = action.payload;
    },
    addColumn: (state, action: PayloadAction<ColumnData>) => {
      state.columns.push(action.payload);
    },
    updateColumn: (state, action: PayloadAction<{ id: string; updates: Partial<ColumnData> }>) => {
      const column = state.columns.find(c => c.id === action.payload.id);
      if (column) {
        Object.assign(column, action.payload.updates);
      }
    },
    deleteColumn: (state, action: PayloadAction<string>) => {
      state.columns = state.columns.filter(c => c.id !== action.payload);
    },

    // Zoom & Pan
    setZoom: (state, action: PayloadAction<number>) => {
      state.zoom = Math.max(0.1, Math.min(action.payload, 3));
    },
    setPan: (state, action: PayloadAction<{ x: number; y: number }>) => {
      state.pan = action.payload;
    },
    updatePan: (state, action: PayloadAction<{ deltaX: number; deltaY: number }>) => {
      state.pan.x += action.payload.deltaX;
      state.pan.y += action.payload.deltaY;
    },

    // Menu
    setMenuMinimized: (state, action: PayloadAction<boolean>) => {
      state.menuMinimized = action.payload;
    },
    setMenuPos: (state, action: PayloadAction<{ x: number; y: number }>) => {
      state.menuPos = action.payload;
    },
    updateMenuPos: (state, action: PayloadAction<{ deltaX: number; deltaY: number }>) => {
      state.menuPos.x += action.payload.deltaX;
      state.menuPos.y += action.payload.deltaY;
    },

    // Selection
    setSelectedColumn: (state, action: PayloadAction<string>) => {
      state.selectedColumn = action.payload;
    },
  },
});

export const {
  setTasks,
  addTask,
  updateTask,
  deleteTask,
  setColumns,
  addColumn,
  updateColumn,
  deleteColumn,
  setZoom,
  setPan,
  updatePan,
  setMenuMinimized,
  setMenuPos,
  updateMenuPos,
  setSelectedColumn,
} = kanbanSlice.actions;

export default kanbanSlice.reducer;
