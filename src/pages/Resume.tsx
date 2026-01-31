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
            <h4 className="font-black text-xl mb-2 uppercase leading-none">Segurança Digital</h4>
            <p className="text-brutal-blue font-bold text-sm mb-4">BACHARELADO • 2º SEMESTRE</p>
            <p className="text-black font-medium border-t-2 border-black pt-4">Em andamento • Focado em Segurança da Informação, Criptografia, Análise de Vulnerabilidades, Gestão de Riscos e Infraestrutura Segura.</p>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-black mb-8 uppercase bg-brutal-yellow border-4 border-black px-4 py-2 inline-block">CERTIFICAÇÕES</h2>
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {/* AWS Certificações */}
            <div className="bg-white border-4 border-black p-5 shadow-brutal hover:bg-brutal-blueLight transition-colors">
              <p className="font-black text-base uppercase leading-none mb-1">🏆 AWS Solutions Architect – Associate</p>
              <p className="text-xs font-bold text-brutal-blue mb-1">Válido até Mar 25, 2028</p>
              <p className="text-xs font-medium">Design e deploy de arquiteturas escaláveis na AWS</p>
            </div>
            
            <div className="bg-white border-4 border-black p-5 shadow-brutal hover:bg-brutal-purple transition-colors">
              <p className="font-black text-base uppercase leading-none mb-1">💻 AWS Certified Developer – Associate</p>
              <p className="text-xs font-bold text-brutal-blue mb-1">Válido até Sep 17, 2028</p>
              <p className="text-xs font-medium">Desenvolvimento de aplicações na AWS</p>
            </div>

            <div className="bg-white border-4 border-black p-5 shadow-brutal hover:bg-brutal-pink transition-colors">
              <p className="font-black text-base uppercase leading-none mb-1">🤖 AWS Certified AI Practitioner</p>
              <p className="text-xs font-bold text-brutal-blue mb-1">Válido até Apr 10, 2028</p>
              <p className="text-xs font-medium">Machine Learning e IA Generativa na AWS</p>
            </div>

            <div className="bg-white border-4 border-black p-5 shadow-brutal hover:bg-brutal-yellow transition-colors">
              <p className="font-black text-base uppercase leading-none mb-1">☁️ AWS Certified Cloud Practitioner</p>
              <p className="text-xs font-bold text-brutal-blue mb-1">Válido até Sep 17, 2028</p>
              <p className="text-xs font-medium">Fundamentos de Cloud Computing na AWS</p>
            </div>

            <div className="bg-white border-4 border-black p-5 shadow-brutal hover:bg-brutal-blueLight transition-colors">
              <p className="font-black text-sm uppercase leading-none mb-1">🎓 AWS re/Start Graduate</p>
              <p className="text-xs font-bold text-brutal-blue mb-1">Issued Jul 3, 2024</p>
            </div>

            {/* Fortinet */}
            <div className="bg-white border-4 border-black p-5 shadow-brutal hover:bg-brutal-red transition-colors">
              <p className="font-black text-base uppercase leading-none mb-1">🔐 Fortinet Certified Associate Cybersecurity</p>
              <p className="text-xs font-bold text-brutal-blue mb-1">Válido até Oct 1, 2026</p>
              <p className="text-xs font-medium">Segurança de redes e firewalls</p>
            </div>

            <div className="bg-white border-4 border-black p-5 shadow-brutal">
              <p className="font-black text-sm uppercase leading-none mb-1">🔐 Fortinet Certified Fundamentals Cybersecurity</p>
              <p className="text-xs font-bold text-brutal-blue mb-1">Válido até Oct 1, 2026</p>
            </div>

            <div className="bg-white border-4 border-black p-5 shadow-brutal">
              <p className="font-black text-sm uppercase leading-none mb-1">🔐 Fortinet FortiGate 7.4 Operator</p>
              <p className="text-xs font-bold text-brutal-blue mb-1">Issued Oct 1, 2024</p>
            </div>

            <div className="bg-white border-4 border-black p-5 shadow-brutal">
              <p className="font-black text-sm uppercase leading-none mb-1">🔐 Getting Started in Cybersecurity 2.0</p>
              <p className="text-xs font-bold text-brutal-blue mb-1">Issued Sep 30, 2024</p>
            </div>

            <div className="bg-white border-4 border-black p-5 shadow-brutal">
              <p className="font-black text-sm uppercase leading-none mb-1">🔐 Introduction to the Threat Landscape 2.0</p>
              <p className="text-xs font-bold text-brutal-blue mb-1">Issued Sep 13, 2024</p>
            </div>

            {/* Microsoft */}
            <div className="bg-white border-4 border-black p-5 shadow-brutal hover:bg-brutal-yellow transition-colors">
              <p className="font-black text-sm uppercase leading-none mb-1">🤖 GitHub Copilot Challenge</p>
              <p className="text-xs font-bold text-brutal-blue mb-1">Issued Jul 9, 2025</p>
              <p className="text-xs font-medium">Microsoft Americas Azure Team</p>
            </div>

            {/* Google Cloud */}
            <div className="bg-white border-4 border-black p-5 shadow-brutal hover:bg-brutal-blueLight transition-colors">
              <p className="font-black text-sm uppercase leading-none mb-1">☁️ Google Cloud Computing Foundations Certificate</p>
              <p className="text-xs font-bold text-brutal-blue mb-1">Issued Jun 27, 2024</p>
            </div>

            <div className="bg-white border-4 border-black p-5 shadow-brutal hover:bg-brutal-blueLight transition-colors">
              <p className="font-black text-sm uppercase leading-none mb-1">☁️ Build a Secure Google Cloud Network Skill Badge</p>
              <p className="text-xs font-bold text-brutal-blue mb-1">Issued Jun 27, 2024</p>
            </div>

            <div className="bg-white border-4 border-black p-5 shadow-brutal hover:bg-brutal-blueLight transition-colors">
              <p className="font-black text-sm uppercase leading-none mb-1">☁️ Implement Load Balancing on Compute Engine Skill Badge</p>
              <p className="text-xs font-bold text-brutal-blue mb-1">Issued Jul 11, 2024</p>
            </div>

            <div className="bg-white border-4 border-black p-5 shadow-brutal hover:bg-brutal-blueLight transition-colors">
              <p className="font-black text-sm uppercase leading-none mb-1">☁️ Prepare Data for ML APIs on Google Cloud Skill Badge</p>
              <p className="text-xs font-bold text-brutal-blue mb-1">Issued Jun 27, 2024</p>
            </div>

            <div className="bg-white border-4 border-black p-5 shadow-brutal hover:bg-brutal-blueLight transition-colors">
              <p className="font-black text-sm uppercase leading-none mb-1">☁️ Set Up an App Dev Environment on Google Cloud Skill Badge</p>
              <p className="text-xs font-bold text-brutal-blue mb-1">Issued Jul 11, 2024</p>
            </div>

            {/* Cisco */}
            <div className="bg-white border-4 border-black p-5 shadow-brutal hover:bg-brutal-pink transition-colors">
              <p className="font-black text-sm uppercase leading-none mb-1">🌐 CCNA: Introduction to Networks</p>
              <p className="text-xs font-bold text-brutal-blue mb-1">Issued May 29, 2024</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;