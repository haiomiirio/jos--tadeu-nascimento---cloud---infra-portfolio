import React from 'react';
import { PERSONAL_DATA } from '../../constants';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 border-t-4 sm:border-t-8 border-black bg-white">
      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8">
        <div className="text-center md:text-left">
          <div className="bg-brutal-yellow border-4 border-black px-3 sm:px-4 py-1 inline-block mb-2 sm:mb-3 shadow-brutal -rotate-1">
            <p className="text-sm sm:text-base lg:text-lg font-black uppercase tracking-wider">
                © {new Date().getFullYear()} {PERSONAL_DATA.name}
            </p>
          </div>
          <p className="text-xs text-black uppercase tracking-wider font-black mt-1">CLOUD & INFRA PORTFOLIO</p>
        </div>
        <div className="flex gap-3 sm:gap-4">
          <a href={PERSONAL_DATA.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-black hover:bg-brutal-blue border-4 border-black px-3 sm:px-5 py-1.5 sm:py-2 transition-all font-bold uppercase text-xs tracking-wider shadow-brutalHover">LINKEDIN</a>
          <a href={PERSONAL_DATA.socials.github} target="_blank" rel="noopener noreferrer" className="text-black hover:bg-brutal-pink border-4 border-black px-3 sm:px-5 py-1.5 sm:py-2 transition-all font-bold uppercase text-xs tracking-wider shadow-brutalHover">GITHUB</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;