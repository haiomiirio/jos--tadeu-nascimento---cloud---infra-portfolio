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
             <h3 className="text-xl font-black mb-2 uppercase">🎯 MISSÃO TÉCNICA</h3>
             <p className="font-bold">Construir infraestruturas cloud resilientes, seguras e escaláveis que habilitam crescimento de negócios.</p>
          </div>
        </div>
      </div>

      {/* Skills por Categoria */}
      <div className="mb-12">
        <h3 className="text-3xl font-black mb-8 uppercase bg-brutal-yellow border-4 border-black px-4 py-2 inline-block">STACK TÉCNICO</h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Cloud Compute */}
          <div className="bg-brutal-blueLight border-4 border-black p-6 shadow-brutal">
            <h4 className="text-lg font-black mb-4 uppercase flex items-center gap-2">
              ☁️ Cloud Compute
            </h4>
            <ul className="space-y-2">
              {PERSONAL_DATA.skillCategories.cloudCompute.map((skill) => (
                <li key={skill} className="text-sm font-bold">• {skill}</li>
              ))}
            </ul>
          </div>

          {/* Networking */}
          <div className="bg-brutal-pink border-4 border-black p-6 shadow-brutal">
            <h4 className="text-lg font-black mb-4 uppercase flex items-center gap-2">
              🌐 Networking
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
              🔐 Security
            </h4>
            <ul className="space-y-2">
              {PERSONAL_DATA.skillCategories.security.map((skill) => (
                <li key={skill} className="text-sm font-bold text-white">• {skill}</li>
              ))}
            </ul>
          </div>

          {/* Automation */}
          <div className="bg-brutal-purple border-4 border-black p-6 shadow-brutal">
            <h4 className="text-lg font-black mb-4 uppercase flex items-center gap-2 text-white">
              ⚙️ Automation & IaC
            </h4>
            <ul className="space-y-2">
              {PERSONAL_DATA.skillCategories.automation.map((skill) => (
                <li key={skill} className="text-sm font-bold text-white">• {skill}</li>
              ))}
            </ul>
          </div>

          {/* Storage */}
          <div className="bg-brutal-yellow border-4 border-black p-6 shadow-brutal">
            <h4 className="text-lg font-black mb-4 uppercase flex items-center gap-2">
              💾 Storage & Backup
            </h4>
            <ul className="space-y-2">
              {PERSONAL_DATA.skillCategories.storage.map((skill) => (
                <li key={skill} className="text-sm font-bold">• {skill}</li>
              ))}
            </ul>
          </div>

          {/* Frontend */}
          <div className="bg-brutal-blue border-4 border-black p-6 shadow-brutal">
            <h4 className="text-lg font-black mb-4 uppercase flex items-center gap-2 text-white">
              💻 Frontend Dev
            </h4>
            <ul className="space-y-2">
              {PERSONAL_DATA.skillCategories.frontend.map((skill) => (
                <li key={skill} className="text-sm font-bold text-white">• {skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;