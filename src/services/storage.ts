
import { KanbanTask, User, FinanceEntry, EvolutionStory, KanbanContribution } from '../types';

const KANBAN_KEY = 'tadeu_kanban_v3';
const USERS_KEY = 'tadeu_users';
const SESSION_KEY = 'tadeu_current_user';
const FINANCE_KEY = 'tadeu_finance_v1';
const EVOLUTION_KEY = 'tadeu_evolution_v1';
const KANBAN_CONTRIBUTIONS_KEY = 'tadeu_kanban_contributions_v1';

export const storage = {
  // --- Task Management ---
  getTasks: (): KanbanTask[] => {
    try {
      const data = localStorage.getItem(KANBAN_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
      return [];
    }
  },
  saveTasks: (tasks: KanbanTask[]) => {
    try {
      localStorage.setItem(KANBAN_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("Erro ao salvar tarefas:", error);
    }
  },

  // --- Finance Management ---
  getFinanceEntries: (): FinanceEntry[] => {
    try {
      const data = localStorage.getItem(FINANCE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Erro ao carregar finanças:", error);
      return [];
    }
  },
  saveFinanceEntries: (entries: FinanceEntry[]) => {
    try {
      localStorage.setItem(FINANCE_KEY, JSON.stringify(entries));
    } catch (error) {
      console.error("Erro ao salvar finanças:", error);
    }
  },

  // --- User Management ---
  getUsers: (): User[] => {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  },
  registerUser: (user: User) => {
    const users = storage.getUsers();
    if (users.find(u => u.email === user.email)) return false;
    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return true;
  },
  login: (email: string, pass: string): User | null => {
    const users = storage.getUsers();
    const user = users.find(u => u.email === email && u.password === pass);
    if (user) {
      const { password, ...safeUser } = user;
      localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser));
      return safeUser;
    }
    return null;
  },
  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
  },
  logout: () => {
    localStorage.removeItem(SESSION_KEY);
  },

  // --- Evolution Stories ---
  getEvolutionStories: (): EvolutionStory[] => {
    try {
      const data = localStorage.getItem(EVOLUTION_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Erro ao carregar histórias:", error);
      return [];
    }
  },
  addEvolutionStory: (story: Omit<EvolutionStory, 'id' | 'createdAt'>): EvolutionStory => {
    const newStory: EvolutionStory = {
      ...story,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now(),
    };
    const stories = storage.getEvolutionStories();
    stories.push(newStory);
    localStorage.setItem(EVOLUTION_KEY, JSON.stringify(stories));
    return newStory;
  },
  deleteEvolutionStory: (id: string) => {
    const stories = storage.getEvolutionStories();
    const filtered = stories.filter(s => s.id !== id);
    localStorage.setItem(EVOLUTION_KEY, JSON.stringify(filtered));
  },

  // --- Kanban Contributions ---
  getKanbanContributions: (): KanbanContribution[] => {
    try {
      const data = localStorage.getItem(KANBAN_CONTRIBUTIONS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Erro ao carregar contribuições:", error);
      return [];
    }
  },
  getContributionsByTaskId: (taskId: string): KanbanContribution[] => {
    return storage.getKanbanContributions().filter(c => c.taskId === taskId);
  },
  addKanbanContribution: (contribution: Omit<KanbanContribution, 'id' | 'createdAt'>): KanbanContribution => {
    const newContribution: KanbanContribution = {
      ...contribution,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now(),
    };
    const contributions = storage.getKanbanContributions();
    contributions.push(newContribution);
    localStorage.setItem(KANBAN_CONTRIBUTIONS_KEY, JSON.stringify(contributions));
    return newContribution;
  },
  deleteKanbanContribution: (id: string) => {
    const contributions = storage.getKanbanContributions();
    const filtered = contributions.filter(c => c.id !== id);
    localStorage.setItem(KANBAN_CONTRIBUTIONS_KEY, JSON.stringify(filtered));
  }
};
