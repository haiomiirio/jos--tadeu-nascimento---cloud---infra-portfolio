import React from 'react';
import { PERSONAL_DATA } from '../constants';

const Home: React.FC = () => {
  return (
    <section className="w-full flex flex-col justify-center items-center text-center">
      <div className="w-full relative">
        {/* Decorative elements */}
        <div className="absolute -top-12 -left-12 w-24 h-24 bg-brutal-pink border-4 border-black rotate-12 -z-10 hidden md:block"></div>
        <div className="absolute top-24 -right-12 w-16 h-16 bg-brutal-blue border-4 border-black rounded-full -z-10 hidden md:block"></div>

        <div className="inline-block bg-white border-4 border-black p-6 mb-10 shadow-brutalLarge -rotate-2">
          <span className="text-4xl font-black text-black">JT</span>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9] uppercase">
          {PERSONAL_DATA.name.split(' ').map((word, i) => (
            <span key={i} className={`inline-block mr-4 ${i % 2 !== 0 ? 'text-brutal-red italic' : 'text-black'}`}>
              {word}
            </span>
          ))}
        </h1>
        
        <p className="inline-block bg-brutal-yellow border-2 border-black px-4 py-1 font-bold text-xs mb-6 uppercase tracking-widest">
          {PERSONAL_DATA.role}
        </p>
        
        <p className="text-lg md:text-xl text-black max-w-2xl mx-auto mb-12 leading-tight font-medium bg-brutal-blueLight/30 p-4 border-2 border-black shadow-brutal">
          {PERSONAL_DATA.bio}
        </p>

        {/* Credly Badge - Destaque para Certificações */}
        <div className="mb-12">
          <a 
            href="https://www.credly.com/users/jose-tadeu-nascimento-da-silva" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-brutal-pink border-4 border-black px-8 py-4 shadow-brutalLarge hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all"
          >
            <span className="text-2xl font-black uppercase flex items-center gap-3">
              🏆 VER TODAS CERTIFICAÇÕES NO CREDLY
            </span>
          </a>
        </div>

        {/* Stats Section - O que recrutadores querem ver */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
          <div className="bg-brutal-yellow border-4 border-black p-6 shadow-brutal hover:scale-105 transition-transform">
            <p className="text-4xl font-black mb-2">12+</p>
            <p className="text-xs font-bold uppercase">Certificações</p>
          </div>
          <div className="bg-brutal-pink border-4 border-black p-6 shadow-brutal hover:scale-105 transition-transform">
            <p className="text-4xl font-black mb-2">4x</p>
            <p className="text-xs font-bold uppercase">AWS Certified</p>
          </div>
          <div className="bg-brutal-blueLight border-4 border-black p-6 shadow-brutal hover:scale-105 transition-transform">
            <p className="text-4xl font-black mb-2">UOL</p>
            <p className="text-xs font-bold uppercase">Experiência</p>
          </div>
          <div className="bg-brutal-purple border-4 border-black p-6 shadow-brutal hover:scale-105 transition-transform text-white">
            <p className="text-4xl font-black mb-2">100%</p>
            <p className="text-xs font-bold uppercase">Disponível</p>
          </div>
        </div>

        {/* Highlights - Principais competências */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white border-4 border-black p-8 shadow-brutalLarge">
            <h2 className="text-2xl font-black mb-6 uppercase">Por que me contratar?</h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <p className="font-black text-lg mb-2">🏆 Certificado AWS</p>
                <p className="text-sm">Solutions Architect, Developer e AI Practitioner. Não só estudei — passei nos exames.</p>
              </div>
              <div>
                <p className="font-black text-lg mb-2">💼 Maturidade</p>
                <p className="text-sm">Ex-gerente com experiência em liderança, processos e comunicação com stakeholders.</p>
              </div>
              <div>
                <p className="font-black text-lg mb-2">🔥 Mão na Massa</p>
                <p className="text-sm">UOL: React, Docker, CI/CD. Não apenas teoria — código real em produção.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stack Rápido */}
        <div className="max-w-4xl mx-auto mb-12">
          <h3 className="text-xl font-black mb-4 uppercase">Stack Técnico</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {['AWS', 'Azure', 'GCP', 'Docker', 'React', 'TypeScript', 'CI/CD', 'Fortinet', 'Linux', 'Python'].map((tech) => (
              <span key={tech} className="bg-black text-white border-2 border-black px-4 py-2 font-bold text-sm hover:bg-brutal-red transition-colors">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-3xl mx-auto mb-12 border-4 border-black bg-brutal-red p-8 shadow-brutal">
          <p className="text-2xl font-black uppercase text-white mb-4">🚀 Pronto para começar!</p>
          <p className="text-sm font-bold text-white mb-6">
            Estou construindo minha jornada em tecnologia com curiosidade, estudo contínuo e vontade de aprender na prática. Gosto de entender como as coisas funcionam, organizar processos e contribuir com soluções que façam sentido, sempre buscando evoluir e agregar valor por onde passo.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href={PERSONAL_DATA.socials.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="brutal-btn bg-brutal-yellow px-8 py-3 text-sm font-black hover:scale-105 transition-transform"
            >
              VER LINKEDIN →
            </a>
            <a 
              href={`mailto:${PERSONAL_DATA.socials.email}`}
              className="brutal-btn bg-white px-8 py-3 text-sm font-black hover:scale-105 transition-transform"
            >
              ENVIAR E-MAIL
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;