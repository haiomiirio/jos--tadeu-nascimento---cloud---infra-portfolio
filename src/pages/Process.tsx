import React, { useState } from 'react';
import { KanbanTask, KanbanContribution } from '../types';
import KanbanBoard from '../components/Kanban/KanbanBoard';

interface ProcessProps {
  tasks: KanbanTask[];
  currentUserId?: string;
  contributions: KanbanContribution[];
  onAddContribution: (contribution: Omit<KanbanContribution, 'id' | 'createdAt'>) => void;
  onDeleteContribution: (id: string) => void;
}

const Process: React.FC<ProcessProps> = ({ 
  tasks, 
  currentUserId, 
  contributions,
  onAddContribution,
  onDeleteContribution 
}) => {
  const publicTasks = tasks.filter(t => t.isPublic);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', contribution: '' });

  const handleSubmitContribution = (e: React.FormEvent, taskId: string) => {
    e.preventDefault();
    if (formData.name && formData.contribution) {
      onAddContribution({
        taskId,
        name: formData.name,
        contribution: formData.contribution,
      });
      setFormData({ name: '', contribution: '' });
      setSelectedTaskId(null);
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const getTaskContributions = (taskId: string) => {
    return contributions.filter(c => c.taskId === taskId);
  };

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-24">
        <div className="inline-block bg-brutal-yellow border-4 border-black p-6 mb-8 shadow-brutalLarge rotate-1">
          <h2 className="text-5xl font-black uppercase tracking-tighter">EVOLUÇÃO TÉCNICA</h2>
        </div>
        <p className="text-black max-w-2xl mx-auto text-lg font-bold leading-tight mt-6">
          QUADRO DE ESTUDOS PÚBLICO. TRANSPARÊNCIA TOTAL NO PROCESSO DE APRENDIZADO.
        </p>
      </div>

      <div className="mb-24 p-2 bg-black">
        <div className="bg-brutal-bg border-4 border-black p-8">
            <div className="flex items-center gap-4 mb-12">
                <div className="bg-brutal-red w-4 h-4 border-2 border-black"></div>
                <h3 className="text-2xl font-black uppercase">O QUE ESTOU CONSTRUINDO</h3>
            </div>
            <KanbanBoard tasks={publicTasks} isAdmin={false} currentUserId={currentUserId} isReadOnly={true} />
        </div>
      </div>

      <div className="bg-brutal-purple border-4 border-black p-12 max-w-4xl mx-auto shadow-brutalLarge mb-24">
        <h4 className="text-3xl font-black mb-6 uppercase tracking-tighter">METODOLOGIA KANBAN</h4>
        <p className="text-black text-lg font-bold leading-tight">
          PRIORIZANDO CERTIFICAÇÕES E PROJETOS LABORATORIAIS. O OBJETIVO É MANTER UM FLUXO CONSTANTE DE APRENDIZADO, TRANSFORMANDO TEORIA EM PRÁTICA VISÍVEL NO MUNDO REAL.
        </p>
      </div>

      {/* Seção de Contribuições aos Tarefas */}
      <div className="border-4 border-black bg-brutal-blue p-8">
        <h3 className="text-3xl font-black uppercase mb-8 tracking-tighter">💬 COMUNIDADE COMPARTILHANDO EVOLUÇÃO</h3>
        <p className="text-black font-bold mb-8">Quer compartilhar sua evolução em relação a alguma tarefa? Deixe seu comentário e inspire outros!</p>

        {publicTasks.length === 0 ? (
          <div className="text-center py-12 border-4 border-black bg-white">
            <p className="font-black uppercase text-gray-600">Nenhuma tarefa pública ainda...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {publicTasks.map((task) => {
              const taskContributions = getTaskContributions(task.id);
              const isSelected = selectedTaskId === task.id;

              return (
                <div key={task.id} className="border-4 border-black bg-white overflow-hidden shadow-brutal">
                  {/* Header da Tarefa */}
                  <div className="bg-brutal-yellow border-b-4 border-black p-6">
                    <h4 className="text-xl font-black uppercase mb-2">{task.title}</h4>
                    {task.description && (
                      <p className="text-sm font-bold text-gray-700">{task.description}</p>
                    )}
                  </div>

                  {/* Contribuições */}
                  <div className="p-6">
                    {taskContributions.length === 0 ? (
                      <p className="text-sm font-bold text-gray-500 mb-6">Ninguém comentou ainda...</p>
                    ) : (
                      <div className="mb-8 space-y-4">
                        {taskContributions.map((contrib) => (
                          <div key={contrib.id} className="border-2 border-gray-300 p-4 bg-gray-50">
                            <div className="flex justify-between items-start mb-2">
                              <p className="font-black text-sm uppercase">{contrib.name}</p>
                              <button
                                onClick={() => onDeleteContribution(contrib.id)}
                                className="text-xs font-bold text-red-600 hover:text-red-800 underline"
                              >
                                REMOVER
                              </button>
                            </div>
                            <p className="text-sm font-bold leading-relaxed mb-2">{contrib.contribution}</p>
                            <p className="text-xs text-gray-500">{formatDate(contrib.createdAt)}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Form para Adicionar Contribuição */}
                    {isSelected ? (
                      <form onSubmit={(e) => handleSubmitContribution(e, task.id)} className="border-4 border-black bg-brutal-bg p-4 space-y-4">
                        <input
                          type="text"
                          placeholder="Seu nome..."
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          maxLength={50}
                          className="w-full border-2 border-black px-3 py-2 text-sm font-bold focus:outline-none focus:bg-brutal-yellow"
                        />
                        <textarea
                          placeholder="Sua evolução ou aprendizado relacionado a isso... (máx 300 caracteres)"
                          value={formData.contribution}
                          onChange={(e) => setFormData({ ...formData, contribution: e.target.value.slice(0, 300) })}
                          maxLength={300}
                          rows={3}
                          className="w-full border-2 border-black px-3 py-2 text-sm font-bold focus:outline-none focus:bg-brutal-yellow resize-none"
                        />
                        <div className="flex gap-2">
                          <button
                            type="submit"
                            className="flex-1 bg-brutal-yellow border-2 border-black p-2 font-black text-xs uppercase hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-brutal transition-all"
                          >
                            COMPARTILHAR
                          </button>
                          <button
                            type="button"
                            onClick={() => { setSelectedTaskId(null); setFormData({ name: '', contribution: '' }); }}
                            className="flex-1 bg-gray-300 border-2 border-black p-2 font-black text-xs uppercase hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-brutal transition-all"
                          >
                            CANCELAR
                          </button>
                        </div>
                      </form>
                    ) : (
                      <button
                        onClick={() => setSelectedTaskId(task.id)}
                        className="w-full bg-brutal-yellow border-2 border-black p-3 font-black text-sm uppercase hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-brutal transition-all"
                      >
                        + COMPARTILHAR EVOLUÇÃO
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Process;