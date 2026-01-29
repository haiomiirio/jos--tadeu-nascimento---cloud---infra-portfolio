
import React, { useState } from 'react';
import { User, FinanceEntry } from '../types';

interface FinancePageProps {
  currentUser: User;
  entries: FinanceEntry[];
  onAddEntry: (entry: Omit<FinanceEntry, 'id'>) => void;
  onDeleteEntry: (id: string) => void;
}

type Tab = 'summary' | 'income' | 'expense';

const FinancePage: React.FC<FinancePageProps> = ({ currentUser, entries, onAddEntry, onDeleteEntry }) => {
  const [activeTab, setActiveTab] = useState<Tab>('summary');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const userEntries = entries.filter(e => e.userId === currentUser.id);
  const incomes = userEntries.filter(e => e.type === 'income');
  const expenses = userEntries.filter(e => e.type === 'expense');

  const totalIncome = incomes.reduce((sum, e) => sum + e.amount, 0);
  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
  const balance = totalIncome - totalExpense;

  const categories = {
    income: ['Salário', 'Bônus', 'Investimento', 'Outras'],
    expense: ['Alimentação', 'Moradia', 'Transporte', 'Saúde', 'Lazer', 'Educação', 'Outras']
  };

  const handleAdd = (type: 'income' | 'expense') => {
    if (!description || !amount || !category) {
      alert("PREENCHA TODOS OS CAMPOS!");
      return;
    }
    onAddEntry({
      userId: currentUser.id,
      type,
      category,
      description,
      amount: parseFloat(amount),
      date
    });
    setDescription('');
    setAmount('');
    setCategory('');
  };

  return (
    <div className="max-w-7xl mx-auto py-32 px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
        <div>
          <div className="bg-brutal-yellow border-4 border-black px-6 py-2 shadow-brutal mb-4 inline-block -rotate-1">
            <h2 className="text-4xl font-black uppercase tracking-tighter">FINANÇAS PESSOAIS</h2>
          </div>
          <p className="text-black text-lg font-black uppercase tracking-widest mt-2">
            CONTROLE DE: <span className="bg-brutal-blueLight px-2">{currentUser.name}</span>
          </p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-4 mb-12">
        {(['summary', 'income', 'expense'] as Tab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`brutal-btn px-8 py-3 text-sm font-black uppercase tracking-widest ${
              activeTab === tab ? 'bg-brutal-yellow' : 'bg-white'
            }`}
          >
            {tab === 'summary' ? 'RESUMO' : tab === 'income' ? 'RECEITAS' : 'DESPESAS'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-12">
        {activeTab === 'summary' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white border-4 border-black p-8 shadow-brutalLarge">
                <h3 className="text-xs font-black uppercase mb-2 tracking-widest">SALDO ATUAL</h3>
                <p className={`text-4xl font-black ${balance >= 0 ? 'text-green-600' : 'text-brutal-red'}`}>
                  R$ {balance.toFixed(2)}
                </p>
              </div>
              <div className="bg-brutal-blueLight border-4 border-black p-8 shadow-brutalLarge">
                <h3 className="text-xs font-black uppercase mb-2 tracking-widest text-black">TOTAL ENTRADAS</h3>
                <p className="text-4xl font-black text-black">R$ {totalIncome.toFixed(2)}</p>
              </div>
              <div className="bg-brutal-pink border-4 border-black p-8 shadow-brutalLarge">
                <h3 className="text-xs font-black uppercase mb-2 tracking-widest text-black">TOTAL SAÍDAS</h3>
                <p className="text-4xl font-black text-black">R$ {totalExpense.toFixed(2)}</p>
              </div>
            </div>

            {/* Visual Balance Bar */}
            <div className="bg-white border-4 border-black p-4 shadow-brutal relative h-16 flex items-center">
              <div className="absolute left-0 top-0 bottom-0 bg-green-400 border-r-4 border-black" 
                   style={{ width: `${totalIncome > 0 ? (totalIncome / (totalIncome + totalExpense)) * 100 : 50}%` }}>
              </div>
              <div className="absolute right-0 top-0 bottom-0 bg-brutal-red" 
                   style={{ width: `${totalExpense > 0 ? (totalExpense / (totalIncome + totalExpense)) * 100 : 50}%` }}>
              </div>
              <div className="relative z-10 w-full flex justify-between px-4 font-black text-xs uppercase">
                <span>RECEITAS</span>
                <span>DESPESAS</span>
              </div>
            </div>
          </div>
        )}

        {(activeTab === 'income' || activeTab === 'expense') && (
          <div className="grid lg:grid-cols-[400px_1fr] gap-12 animate-in slide-in-from-bottom-5 duration-300">
            {/* Entry Form */}
            <aside>
              <div className="bg-white border-4 border-black p-8 shadow-brutalLarge sticky top-32">
                <h3 className="text-xl font-black mb-8 bg-brutal-yellow border-2 border-black px-4 py-1 inline-block uppercase">
                  NOVA {activeTab === 'income' ? 'RECEITA' : 'DESPESA'} +
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-black uppercase mb-2 tracking-widest">DESCRIÇÃO</label>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="EX: SALÁRIO MENSAL"
                      className="w-full bg-brutal-bg border-4 border-black px-4 py-3 text-sm font-bold focus:outline-none focus:bg-brutal-blueLight"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase mb-2 tracking-widest">VALOR (R$)</label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-brutal-bg border-4 border-black px-4 py-3 text-sm font-bold focus:outline-none focus:bg-brutal-blueLight"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase mb-2 tracking-widest">CATEGORIA</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-brutal-bg border-4 border-black px-4 py-3 text-sm font-black focus:outline-none appearance-none"
                    >
                      <option value="">SELECIONE...</option>
                      {categories[activeTab].map(cat => (
                        <option key={cat} value={cat}>{cat.toUpperCase()}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase mb-2 tracking-widest">DATA</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-brutal-bg border-4 border-black px-4 py-3 text-sm font-bold focus:outline-none"
                    />
                  </div>
                  <button
                    onClick={() => handleAdd(activeTab)}
                    className={`brutal-btn w-full py-4 text-sm ${activeTab === 'income' ? 'bg-green-400' : 'bg-brutal-red'}`}
                  >
                    ADICIONAR ★
                  </button>
                </div>
              </div>
            </aside>

            {/* List Table */}
            <div className="w-full">
              <div className="bg-black text-white border-4 border-black p-4 mb-1 shadow-brutal flex justify-between font-black uppercase text-xs">
                <span>DESCRIÇÃO / CATEGORIA</span>
                <div className="flex gap-12">
                  <span>DATA</span>
                  <span className="w-24 text-right">VALOR</span>
                  <span className="w-8"></span>
                </div>
              </div>
              <div className="space-y-2">
                {(activeTab === 'income' ? incomes : expenses).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(entry => (
                  <div key={entry.id} className="bg-white border-4 border-black p-4 shadow-brutalHover flex justify-between items-center group transition-all">
                    <div>
                      <p className="font-black text-sm uppercase">{entry.description}</p>
                      <span className="text-[10px] bg-brutal-bg border border-black px-2 py-0.5 font-bold uppercase">{entry.category}</span>
                    </div>
                    <div className="flex items-center gap-12">
                      <span className="text-xs font-bold text-gray-500">{new Date(entry.date).toLocaleDateString('pt-BR')}</span>
                      <span className={`text-sm font-black w-24 text-right ${activeTab === 'income' ? 'text-green-600' : 'text-brutal-red'}`}>
                        R$ {entry.amount.toFixed(2)}
                      </span>
                      <button 
                        onClick={() => onDeleteEntry(entry.id)}
                        className="text-brutal-red hover:bg-black p-1 border-2 border-transparent hover:border-black transition-all"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
                {(activeTab === 'income' ? incomes : expenses).length === 0 && (
                  <div className="py-20 text-center border-4 border-dashed border-black/20 text-black/40 font-black uppercase">
                    NENHUM REGISTRO ENCONTRADO
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancePage;
