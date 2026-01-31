import React from 'react';
import { KanbanTask } from '../types';
import KanbanBoard from '../components/Kanban/KanbanBoard';

interface ProcessProps {
  tasks: KanbanTask[];
  currentUserId?: string;
}

const Process: React.FC<ProcessProps> = ({ 
  tasks, 
  currentUserId
}) => {
  const publicTasks = tasks.filter(t => t.isPublic);

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

      <div className="bg-brutal-purple border-4 border-black p-12 max-w-4xl mx-auto shadow-brutalLarge">
        <h4 className="text-3xl font-black mb-6 uppercase tracking-tighter">METODOLOGIA KANBAN</h4>
        <p className="text-black text-lg font-bold leading-tight">
          PRIORIZANDO CERTIFICAÇÕES E PROJETOS LABORATORIAIS. O OBJETIVO É MANTER UM FLUXO CONSTANTE DE APRENDIZADO, TRANSFORMANDO TEORIA EM PRÁTICA VISÍVEL NO MUNDO REAL.
        </p>
      </div>
    </section>
  );
};

export default Process;