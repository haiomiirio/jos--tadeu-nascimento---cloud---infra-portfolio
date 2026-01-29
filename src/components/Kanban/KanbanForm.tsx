import React, { useState } from 'react';
import { KanbanTask } from '../../types';

interface KanbanFormProps {
  onAddTask: (task: Omit<KanbanTask, 'id' | 'createdAt'>) => void;
  userId?: string;
}

const KanbanForm: React.FC<KanbanFormProps> = ({ onAddTask, userId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<KanbanTask['status']>('todo');
  const [isPublic, setIsPublic] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("O TÍTULO É OBRIGATÓRIO.");
      return;
    }

    // Mapear status para columnId padrão
    let columnId = '0'; // Tarefas Soltas
    if (status === 'todo') columnId = '1'; // Backlog
    if (status === 'doing') columnId = '4'; // Em andamento
    if (status === 'done') columnId = '7'; // Concluído

    onAddTask({
      title: title.toUpperCase(),
      description: description.toUpperCase(),
      status,
      columnId,
      isPublic,
      userId: userId || undefined
    });

    setTitle('');
    setDescription('');
    setStatus('todo');
    setIsPublic(false);
  };

  return (
    <div className="bg-white border-4 border-black p-8 shadow-brutalLarge">
      <h3 className="text-2xl font-black mb-8 bg-brutal-yellow border-2 border-black px-4 py-1 inline-block uppercase">NOVA TAREFA +</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-black uppercase mb-2 tracking-widest">O QUE VAMOS FAZER?</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="EX: APRENDER TERRAFORM"
            className="w-full bg-brutal-bg border-4 border-black px-4 py-4 text-sm font-bold focus:outline-none focus:bg-brutal-blueLight transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-black uppercase mb-2 tracking-widest">DETALHES TÉCNICOS</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="MAIS INFORMAÇÕES SOBRE O PLANO..."
            className="w-full bg-brutal-bg border-4 border-black px-4 py-4 text-sm font-bold h-32 focus:outline-none focus:bg-brutal-blueLight transition-all resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-black uppercase mb-2 tracking-widest">STATUS</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full bg-brutal-bg border-4 border-black px-4 py-4 text-sm font-black focus:outline-none focus:bg-brutal-pink transition-all appearance-none"
            >
              <option value="todo">A FAZER</option>
              <option value="doing">EM ANDAMENTO</option>
              <option value="done">CONCLUÍDO</option>
            </select>
          </div>

          <div className="flex flex-col justify-end">
            <label className="flex items-center gap-4 cursor-pointer group mb-2 border-4 border-black p-3 bg-brutal-bg hover:bg-brutal-yellow transition-all">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="w-6 h-6 border-4 border-black bg-white rounded-none checked:bg-black transition-all"
              />
              <span className="text-xs font-black uppercase tracking-widest">VISIBILIDADE PÚBLICA</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="brutal-btn w-full bg-brutal-yellow py-6 text-lg tracking-[0.2em] shadow-brutalLarge"
        >
          ADICIONAR AO QUADRO ★
        </button>
      </form>
    </div>
  );
};

export default KanbanForm;