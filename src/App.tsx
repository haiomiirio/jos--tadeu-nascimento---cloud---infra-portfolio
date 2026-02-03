
import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Resume from './pages/Resume';
import Projects from './pages/Projects';
import Process from './pages/Process';
import AuthPage from './pages/AuthPage';
import RestrictedArea from './pages/RestrictedArea';
import FinancePage from './pages/FinancePage';
import AboutPortfolio from './pages/AboutPortfolio';
import AdminPanel from './components/Admin/AdminPanel';
import AdminLogin from './components/Auth/AdminLogin';
import AiChat from './AiChat';
import { KanbanTask, User, FinanceEntry, KanbanContribution } from './types';
import { storage } from './services/storage';

const App: React.FC = () => {
  const adminEnabled = import.meta.env.VITE_ADMIN_ENABLED === 'true';
  const [activePage, setActivePage] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<KanbanTask[]>([]);
  const [financeEntries, setFinanceEntries] = useState<FinanceEntry[]>([]);
  const [kanbanContributions, setKanbanContributions] = useState<KanbanContribution[]>([]);

  useEffect(() => {
    setTasks(storage.getTasks());
    setFinanceEntries(storage.getFinanceEntries());
    setKanbanContributions(storage.getKanbanContributions());
    setCurrentUser(storage.getCurrentUser());
  }, []);

  useEffect(() => {
    storage.saveTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    storage.saveFinanceEntries(financeEntries);
  }, [financeEntries]);

  const handleAddKanbanContribution = (contribution: Omit<KanbanContribution, 'id' | 'createdAt'>) => {
    const newContribution = storage.addKanbanContribution(contribution);
    setKanbanContributions([...kanbanContributions, newContribution]);
  };

  const handleDeleteKanbanContribution = (id: string) => {
    storage.deleteKanbanContribution(id);
    setKanbanContributions(kanbanContributions.filter(c => c.id !== id));
  };

  const handleAddTask = (task: Omit<KanbanTask, 'id' | 'createdAt'>) => {
    const newTask: KanbanTask = {
      ...task,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now()
    };
    setTasks([...tasks, newTask]);
  };

  const handleUpdateTask = (id: string, updates: Partial<KanbanTask>) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleAddFinanceEntry = (entry: Omit<FinanceEntry, 'id'>) => {
    const newEntry: FinanceEntry = {
      ...entry,
      id: Math.random().toString(36).substr(2, 9),
    };
    setFinanceEntries([...financeEntries, newEntry]);
  };

  const handleDeleteFinanceEntry = (id: string) => {
    setFinanceEntries(financeEntries.filter(e => e.id !== id));
  };

  const handleLogin = (pass: string) => {
    if (!adminEnabled) {
      alert('Acesso administrativo desativado.');
      setActivePage('home');
      return;
    }
    if (pass === '1234') {
      setIsAdmin(true);
      setActivePage('admin');
    } else {
      alert('Senha incorreta.');
    }
  };

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    setActivePage('finance');
  };

  const handleLogout = () => {
    storage.logout();
    setCurrentUser(null);
    setIsAdmin(false);
    setActivePage('home');
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home': return <Home />;
      case 'about': return <About />;
      case 'resume': return <Resume />;
      case 'projects': return <Projects />;
      case 'portfolio': return <AboutPortfolio />;
      case 'process': return <Process tasks={tasks} currentUserId={currentUser?.id} contributions={kanbanContributions} onAddContribution={handleAddKanbanContribution} onDeleteContribution={handleDeleteKanbanContribution} />;
      case 'auth': return <AuthPage onAuthSuccess={handleAuthSuccess} />;
      case 'finance':
        return currentUser ? (
          <FinancePage 
            currentUser={currentUser}
            entries={financeEntries}
            onAddEntry={handleAddFinanceEntry}
            onDeleteEntry={handleDeleteFinanceEntry}
          />
        ) : (
          <AuthPage onAuthSuccess={handleAuthSuccess} />
        );
      case 'restricted': 
        return currentUser ? (
          <RestrictedArea 
            currentUser={currentUser} 
            tasks={tasks}
            onAddTask={handleAddTask}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
          />
        ) : (
          <AuthPage onAuthSuccess={handleAuthSuccess} />
        );
      case 'admin':
        if (!adminEnabled) return <Home />;
        return isAdmin ? (
          <AdminPanel 
            tasks={tasks} 
            onAddTask={handleAddTask} 
            onUpdateTask={handleUpdateTask} 
            onDeleteTask={handleDeleteTask}
            onLogout={handleLogout}
            financeEntries={financeEntries}
            onAddFinanceEntry={handleAddFinanceEntry}
            onDeleteFinanceEntry={handleDeleteFinanceEntry}
          />
        ) : (
          <AdminLogin onLogin={handleLogin} />
        );
      default: return <Home />;
    }
  };

  return (
    <div 
      className="min-h-screen relative text-black flex flex-col"
      style={{
        background: `
          linear-gradient(135deg, #f0f4f8 0%, #e8f1f8 25%, #f0e8f8 50%, #f8f0e8 75%, #f0f4f8 100%)
        `,
        backgroundAttachment: 'fixed',
        backgroundSize: '400% 400%',
      }}
    >
      {/* Padrão Decorativo Subtle */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(34, 197, 94, 0.08) 0%, transparent 50%)
          `,
        }}
      />

      {/* Grid Pattern Sutil */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(90deg, #000 1px, transparent 1px),
            linear-gradient(0deg, #000 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <Header 
        activePage={activePage} 
        setActivePage={setActivePage} 
        isAdmin={isAdmin} 
        adminEnabled={adminEnabled}
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      <main className="flex-1 relative z-10 w-full">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderPage()}
        </div>
      </main>
      <Footer />
      <AiChat />
    </div>
  );
};

const AppWithProvider = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppWithProvider;
