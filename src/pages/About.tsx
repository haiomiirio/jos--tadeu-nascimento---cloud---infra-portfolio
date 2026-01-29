import React from 'react';
import { PERSONAL_DATA } from '../constants';

const About: React.FC = () => {
  return (
    <section className="w-full py-8">
      <div className="inline-block bg-white border-4 border-black px-4 sm:px-6 py-2 mb-8 sm:mb-16 -rotate-1 shadow-brutal">
        <h2 className="text-2xl sm:text-4xl font-black uppercase">SOBRE MIM</h2>
      </div>

      <div className="grid md:grid-cols-1 gap-8 sm:gap-12 mb-12">
        <div className="space-y-8">
          <div className="bg-white border-4 border-black p-8 shadow-brutalLarge">
            <p className="text-xl font-bold leading-tight mb-6">
              {PERSONAL_DATA.summary}
            </p>
          </div>
          
          <div className="bg-brutal-purple border-4 border-black p-6 shadow-brutal -rotate-1">
             <h3 className="text-xl font-black mb-2 uppercase text-white">🎯 OBJETIVO</h3>
             <p className="font-bold text-white">Estágio ou posição júnior em Cloud, Infraestrutura ou Suporte onde eu possa aplicar minhas certificações e contribuir desde o dia 1.</p>
          </div>

          <div className="bg-brutal-yellow border-4 border-black p-6 shadow-brutal">
             <h3 className="text-xl font-black mb-4 uppercase">📞 VAMOS CONVERSAR?</h3>
             <p className="font-bold mb-4">Se você busca alguém com base técnica sólida, maturidade profissional e vontade de aprender, vamos trocar uma ideia!</p>
             <div className="flex flex-wrap gap-4">
               <a href={PERSONAL_DATA.socials.linkedin} target="_blank" rel="noopener noreferrer" className="brutal-btn bg-brutal-blue text-white px-6 py-2 text-sm">
                 LINKEDIN
               </a>
               <a href={`mailto:${PERSONAL_DATA.socials.email}`} className="brutal-btn bg-white px-6 py-2 text-sm">
                 E-MAIL
               </a>
             </div>
          </div>
        </div>
      </div>

      {/* Skills por Categoria */}
      <div className="mb-12">
        <h3 className="text-3xl font-black mb-8 uppercase bg-brutal-yellow border-4 border-black px-4 py-2 inline-block">MÃO NA MASSA</h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Cloud */}
          <div className="bg-brutal-blueLight border-4 border-black p-6 shadow-brutal">
            <h4 className="text-lg font-black mb-4 uppercase flex items-center gap-2">
              ☁️ Cloud (AWS)
            </h4>
            <ul className="space-y-2">
              {PERSONAL_DATA.skillCategories.cloud.map((skill) => (
                <li key={skill} className="text-sm font-bold">• {skill}</li>
              ))}
            </ul>
          </div>

          {/* Networking */}
          <div className="bg-brutal-pink border-4 border-black p-6 shadow-brutal">
            <h4 className="text-lg font-black mb-4 uppercase flex items-center gap-2">
              🌐 Redes
            </h4>
            <ul className="space-y-2">
              {PERSONAL_DATA.skillCategories.networking.map((skill) => (
                <li key={skill} className="text-sm font-bold">• {skill}</li>
              ))}
            </ul>
          </div>

          {/* Security */}
          <div className="bg-brutal-red border-4 border-black p-6 shadow-brutal">
            <h4 className="text-lg font-black mb-4 uppercase flex items-center gap-2 text-white">
              🔐 Segurança
            </h4>
            <ul className="space-y-2">
              {PERSONAL_DATA.skillCategories.security.map((skill) => (
                <li key={skill} className="text-sm font-bold text-white">• {skill}</li>
              ))}
            </ul>
          </div>

          {/* DevOps */}
          <div className="bg-brutal-purple border-4 border-black p-6 shadow-brutal">
            <h4 className="text-lg font-black mb-4 uppercase flex items-center gap-2 text-white">
              ⚙️ DevOps & Automação
            </h4>
            <ul className="space-y-2">
              {PERSONAL_DATA.skillCategories.devops.map((skill) => (
                <li key={skill} className="text-sm font-bold text-white">• {skill}</li>
              ))}
            </ul>
          </div>

          {/* Frontend */}
          <div className="bg-brutal-blue border-4 border-black p-6 shadow-brutal">
            <h4 className="text-lg font-black mb-4 uppercase flex items-center gap-2 text-white">
              💻 Front-end
            </h4>
            <ul className="space-y-2">
              {PERSONAL_DATA.skillCategories.frontend.map((skill) => (
                <li key={skill} className="text-sm font-bold text-white">• {skill}</li>
              ))}
            </ul>
          </div>

          {/* Soft Skills */}
          <div className="bg-brutal-yellow border-4 border-black p-6 shadow-brutal">
            <h4 className="text-lg font-black mb-4 uppercase flex items-center gap-2">
              💼 Soft Skills
            </h4>
            <ul className="space-y-2">
              {PERSONAL_DATA.skillCategories.softSkills.map((skill) => (
                <li key={skill} className="text-sm font-bold">• {skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;