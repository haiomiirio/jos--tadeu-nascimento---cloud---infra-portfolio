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
        
        <h2 className="inline-block bg-brutal-yellow border-2 border-black px-4 py-1 font-bold text-xs mb-6 uppercase tracking-widest">
          {PERSONAL_DATA.role}
        </h2>
        
        <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9] uppercase">
          {PERSONAL_DATA.name.split(' ').map((word, i) => (
            <span key={i} className={`inline-block mr-4 ${i % 2 !== 0 ? 'text-brutal-red italic' : 'text-black'}`}>
              {word}
            </span>
          ))}
        </h1>
        
        <p className="text-lg md:text-xl text-black max-w-2xl mx-auto mb-12 leading-tight font-medium bg-brutal-blueLight/30 p-4 border-2 border-black shadow-brutal">
          {PERSONAL_DATA.bio}
        </p>

        <div className="w-full max-w-3xl mx-auto mb-12 border-4 border-black bg-brutal-yellow p-8 shadow-brutal">
          <p className="text-xs font-black uppercase tracking-widest text-black mb-2">🔐 ACESSO RESTRITO</p>
          <p className="text-sm font-bold text-black">
            Bem-vindo! Esta é uma área em desenvolvimento com acesso exclusivo para administração por enquanto.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-6 justify-center">
          <button className="brutal-btn bg-brutal-yellow px-8 sm:px-10 py-3 sm:py-4 text-sm flex items-center gap-2 hover:shadow-lg transition-shadow">
            CURRÍCULO <span className="text-xl">★</span>
          </button>
          <button className="brutal-btn bg-white px-8 sm:px-10 py-3 sm:py-4 text-sm hover:shadow-lg transition-shadow">
            CONTATO
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;