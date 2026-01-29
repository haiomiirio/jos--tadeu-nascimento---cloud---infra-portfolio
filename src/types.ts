
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
}

export interface KanbanTask {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'doing' | 'done' | 'unassigned';
  columnId: string; // ID da coluna onde está a tarefa
  createdAt: number; // Timestamp em milissegundos para ordenação correta
  isPublic: boolean;
  userId?: string; // Usuário que criou/publicou
  ownerId?: string; // Mesmo que userId, para compatibilidade
  priority?: 'low' | 'medium' | 'high';
  labels?: string[];
  dueDate?: string;
  checklist?: { id: string; text: string; completed: boolean }[];
}

export interface FinanceEntry {
  id: string;
  userId: string;
  type: 'income' | 'expense';
  category: string;
  description: string;
  amount: number;
  date: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface EvolutionStory {
  id: string;
  name: string;
  title: string;
  story: string;
  area?: string; // Ex: "Carreira", "Saúde", "Pessoal", etc
  createdAt: number;
}

export interface KanbanContribution {
  id: string;
  taskId: string; // ID da tarefa pública do Kanban
  name: string; // Nome de quem está contribuindo
  contribution: string; // Texto da contribuição
  createdAt: number;
}
