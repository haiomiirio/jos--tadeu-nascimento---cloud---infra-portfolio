import React from 'react';

const AboutPortfolio: React.FC = () => {
  return (
    <section className="w-full py-8">
      <div className="inline-block bg-white border-4 border-black px-4 sm:px-6 py-2 mb-8 sm:mb-16 -rotate-1 shadow-brutal">
        <h2 className="text-2xl sm:text-4xl font-black uppercase">SOBRE O PORTFÓLIO</h2>
      </div>

      {/* Como foi feito */}
      <div className="mb-12">
        <div className="bg-white border-4 border-black p-8 shadow-brutalLarge mb-8">
          <h3 className="text-2xl font-black mb-6 uppercase flex items-center gap-3">
            <span className="text-3xl">🚀</span> Como foi construído
          </h3>
          <p className="text-lg leading-tight mb-4 font-bold">
            Este portfólio foi desenvolvido por mim <span className="bg-brutal-yellow px-2">com auxílio de Inteligência Artificial</span> como um <span className="bg-brutal-yellow px-2">projeto real</span> para demonstrar 
            minhas habilidades técnicas em <span className="bg-brutal-blueLight px-2">React</span>, <span className="bg-brutal-pink px-2">TypeScript</span> e <span className="bg-brutal-purple px-2 text-white">DevOps</span>.
          </p>
          <p className="text-base leading-snug text-gray-700">
            Não apenas criei um site estático — desenvolvi uma aplicação completa com gerenciamento de estado, 
            autenticação, integração com IA e deploy automatizado. A IA foi uma parceira no desenvolvimento, mas todas as decisões técnicas, 
            arquitetura e implementação foram coordenadas por mim. Isso mostra que sei construir soluções reais, não apenas tutoriais.
          </p>
        </div>

        {/* Stack Técnico */}
        <div className="bg-brutal-yellow border-4 border-black p-8 shadow-brutal mb-8">
          <h3 className="text-2xl font-black mb-6 uppercase flex items-center gap-3">
            <span className="text-3xl">⚙️</span> Stack Técnico Utilizado
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-black text-lg mb-3 uppercase">Frontend</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-black"></span>
                  <span className="font-bold">React 19 + TypeScript</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-black"></span>
                  <span className="font-bold">Vite (Build Tool moderno)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-black"></span>
                  <span className="font-bold">Redux Toolkit (Estado Global)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-black"></span>
                  <span className="font-bold">CSS Utility-First (Brutal Design)</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-lg mb-3 uppercase">DevOps & Cloud</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-black"></span>
                  <span className="font-bold">GitHub Actions (CI/CD)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-black"></span>
                  <span className="font-bold">GitHub Pages (Hospedagem)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-black"></span>
                  <span className="font-bold">Git & Versionamento</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-black"></span>
                  <span className="font-bold">Env Variables (Segredos)</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-lg mb-3 uppercase">Integrações</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-black"></span>
                  <span className="font-bold">Google Gemini AI (Chat)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-black"></span>
                  <span className="font-bold">LocalStorage API</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-black"></span>
                  <span className="font-bold">Sistema de Autenticação</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-lg mb-3 uppercase">Funcionalidades</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-black"></span>
                  <span className="font-bold">Kanban Board (Redux)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-black"></span>
                  <span className="font-bold">Gestão Financeira</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-black"></span>
                  <span className="font-bold">Área Administrativa</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Design */}
        <div className="bg-brutal-pink border-4 border-black p-8 shadow-brutal mb-8">
          <h3 className="text-2xl font-black mb-6 uppercase flex items-center gap-3">
            <span className="text-3xl">🎨</span> Design & UI/UX
          </h3>
          <p className="text-lg leading-tight mb-4 font-bold">
            O design deste portfólio é baseado em um <span className="bg-white px-2 border-2 border-black">template público do Figma</span> com 
            estilo <span className="bg-brutal-yellow px-2">"Brutal Design"</span> — caracterizado por bordas grossas, 
            cores vibrantes e tipografia pesada.
          </p>
          <p className="text-base leading-snug">
            Adaptei o template para React/TypeScript, implementando componentes reutilizáveis e responsivos. 
            Todos os elementos foram codificados do zero, não utilizei bibliotecas de UI prontas.
          </p>
        </div>

        {/* Pipeline de Deploy */}
        <div className="bg-brutal-purple border-4 border-black p-8 shadow-brutal text-white">
          <h3 className="text-2xl font-black mb-6 uppercase flex items-center gap-3">
            <span className="text-3xl">🔄</span> Pipeline de Deploy Automatizado
          </h3>
          <div className="space-y-4">
            <div className="bg-white/10 border-2 border-white/20 p-4 rounded">
              <p className="font-black mb-2">1. COMMIT → GitHub</p>
              <p className="text-sm">Push para branch main dispara workflow automático</p>
            </div>
            <div className="bg-white/10 border-2 border-white/20 p-4 rounded">
              <p className="font-black mb-2">2. BUILD → Vite</p>
              <p className="text-sm">Otimização, minificação e geração de assets</p>
            </div>
            <div className="bg-white/10 border-2 border-white/20 p-4 rounded">
              <p className="font-black mb-2">3. DEPLOY → GitHub Pages</p>
              <p className="text-sm">Site atualizado automaticamente em produção</p>
            </div>
          </div>
        </div>
      </div>

      {/* Conclusão */}
      <div className="bg-brutal-red border-4 border-black p-8 shadow-brutalLarge text-white text-center">
        <h3 className="text-3xl font-black mb-4 uppercase">🎯 O QUE ISSO PROVA?</h3>
        <p className="text-lg font-bold max-w-3xl mx-auto leading-tight">
          Este portfólio não é apenas um currículo online — é um <span className="bg-white text-black px-2">projeto de software completo</span>. 
          Demonstra que sei trabalhar com ferramentas modernas, implementar CI/CD, integrar APIs externas e entregar código limpo e funcional. 
          <span className="block mt-4 text-xl">Estou pronto para contribuir desde o primeiro dia! 🚀</span>
        </p>
      </div>
    </section>
  );
};

export default AboutPortfolio;
