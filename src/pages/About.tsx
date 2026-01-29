import React from 'react';
import { PERSONAL_DATA } from '../constants';

const About: React.FC = () => {
  const colors = ['bg-brutal-pink', 'bg-brutal-yellow', 'bg-brutal-blue', 'bg-brutal-purple', 'bg-brutal-red', 'bg-brutal-blueLight'];

  return (
    <section className="w-full py-8">
      <div className="inline-block bg-white border-4 border-black px-4 sm:px-6 py-2 mb-8 sm:mb-16 -rotate-1 shadow-brutal">
        <h2 className="text-2xl sm:text-4xl font-black uppercase">SOBRE MIM</h2>
      </div>

      <div className="grid md:grid-cols-[1.5fr_1fr] gap-8 sm:gap-12 items-start">
        <div className="space-y-8">
          <div className="bg-white border-4 border-black p-8 shadow-brutalLarge">
            <p className="text-xl font-bold leading-tight mb-6">
              Minha trajetória profissional é marcada por uma sólida base em <span className="bg-brutal-yellow px-1">Infraestrutura de TI</span>.
            </p>
            <p className="text-lg leading-snug text-black mb-6">
              Atualmente, foco em <span className="bg-brutal-blueLight px-1">Nuvem (Cloud)</span> e <span className="bg-brutal-pink px-1">Segurança</span>.
            </p>
            <p className="text-lg leading-snug">
              Sou um aprendiz dedicado, dominando <span className="underline decoration-brutal-red decoration-4">Terraform</span> e <span className="underline decoration-brutal-purple decoration-4">AWS</span>.
            </p>
          </div>
          
          <div className="bg-brutal-purple border-4 border-black p-6 shadow-brutal -rotate-1">
             <h3 className="text-xl font-black mb-2 uppercase">MISSÃO TÉCNICA</h3>
             <p className="font-bold">CONSTRUIR AMBIENTES RESILIENTES E SEGUROS SEMPRE.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <h3 className="text-2xl font-black uppercase mb-2">HABILIDADES</h3>
          {PERSONAL_DATA.skills.map((skill, i) => (
            <div 
              key={skill} 
              className={`${colors[i % colors.length]} border-2 border-black p-3 font-black text-sm uppercase shadow-brutalHover hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all`}
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;