import React from 'react';
import { EXPERIENCES } from '../constants';

const Resume: React.FC = () => {
  return (
    <section className="w-full py-8">
      <div className="mb-16 sm:mb-24">
        <div className="inline-block bg-brutal-blue border-4 border-black px-4 sm:px-6 py-2 mb-8 sm:mb-12 shadow-brutal">
          <h2 className="text-2xl sm:text-4xl font-black uppercase">EXPERIÊNCIA</h2>
        </div>
        
        <div className="space-y-8 sm:space-y-12 relative">
          <div className="absolute left-[7px] top-0 bottom-0 w-[6px] bg-black"></div>
          {EXPERIENCES.map((exp) => (
            <div key={exp.id} className="relative pl-12">
              <div className="absolute left-0 top-0 w-5 h-5 bg-brutal-yellow border-4 border-black rounded-none"></div>
              <div className="bg-white border-4 border-black p-4 sm:p-6 shadow-brutal">
                <div className="flex flex-col md:flex-row md:justify-between items-start mb-3 sm:mb-4 gap-2">
                  <h3 className="text-lg sm:text-2xl font-black uppercase leading-none">{exp.role}</h3>
                  <span className="bg-black text-white px-3 py-1 font-bold text-xs uppercase">{exp.period}</span>
                </div>
                <p className="text-brutal-red font-black text-xs sm:text-sm mb-3 sm:mb-4 uppercase">{exp.company}</p>
                <p className="text-black text-sm sm:text-base font-medium leading-tight">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
        <div>
          <h2 className="text-3xl font-black mb-8 uppercase bg-brutal-pink border-4 border-black px-4 py-2 inline-block">FORMAÇÃO</h2>
          <div className="bg-white border-4 border-black p-8 shadow-brutalLarge">
            <h4 className="font-black text-xl mb-2 uppercase leading-none">Bacharelado em Segurança Digital</h4>
            <p className="text-brutal-blue font-bold text-sm mb-4">GRADUAÇÃO SUPERIOR</p>
            <p className="text-black font-medium border-t-2 border-black pt-4">Em andamento • Focado em Segurança da Informação, Criptografia, Análise de Vulnerabilidades e Gestão de Riscos.</p>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-black mb-8 uppercase bg-brutal-yellow border-4 border-black px-4 py-2 inline-block">CERTIFICAÇÕES</h2>
          <div className="space-y-6">
            <div className="bg-white border-4 border-black p-6 shadow-brutal hover:bg-brutal-blueLight transition-colors">
              <p className="font-black text-lg uppercase leading-none mb-2">🏆 AWS Solutions Architect - Associate</p>
              <p className="text-black text-xs font-bold uppercase">STATUS: CERTIFICADO</p>
              <p className="text-sm mt-2 font-medium">Design de arquiteturas escaláveis e resilientes na AWS</p>
            </div>
            <div className="bg-white border-4 border-black p-6 shadow-brutal hover:bg-brutal-pink transition-colors">
              <p className="font-black text-lg uppercase leading-none mb-2">☁️ AWS Cloud Practitioner</p>
              <p className="text-black text-xs font-bold uppercase">STATUS: CERTIFICADO</p>
              <p className="text-sm mt-2 font-medium">Fundamentos de Cloud Computing e serviços AWS</p>
            </div>
            <div className="bg-white border-4 border-black p-6 shadow-brutal hover:bg-brutal-purple transition-colors">
              <p className="font-black text-lg uppercase leading-none mb-2">🌐 Cisco CCNA</p>
              <p className="text-black text-xs font-bold uppercase">STATUS: CERTIFICADO</p>
              <p className="text-sm mt-2 font-medium">Routing, Switching, Segurança de Redes</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;