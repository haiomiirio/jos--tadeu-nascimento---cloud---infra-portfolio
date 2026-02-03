import React from 'react';

interface ProjectCard {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  featured?: boolean;
}

const PROJECTS_DATA: ProjectCard[] = [
  {
    id: 'kanban-online',
    title: 'Kanban Project Online',
    description: '🎯 PROJETO FULL-STACK: Sistema completo de gerenciamento de tarefas estilo Kanban com interface drag-and-drop, persistência em tempo real e autenticação de usuários.\n\n⚙️ STACK: React, TypeScript, Redux Toolkit, LocalStorage API, Tailwind CSS\n\n✅ FEATURES: Criação de tarefas e colunas personalizadas, drag-and-drop entre colunas, filtros e busca avançada, persistência local, design responsivo e moderno.',
    technologies: ['React', 'TypeScript', 'Redux', 'Tailwind CSS', 'Vite'],
    liveUrl: 'https://haiomiirio.github.io/kanban-project-online',
    githubUrl: 'https://github.com/haiomiirio/kanban-project-online',
    imageUrl: 'https://raw.githubusercontent.com/haiomiirio/kanban-project-online/main/preview.png',
    featured: true
  }
];

const Projects: React.FC = () => {
  return (
    <section className="w-full py-8">
      {/* Header */}
      <div className="mb-12 sm:mb-16">
        <div className="inline-block bg-brutal-purple border-4 border-black px-6 py-3 mb-6 shadow-brutal">
          <h2 className="text-3xl sm:text-5xl font-black uppercase">Meus Projetos</h2>
        </div>
        <p className="text-lg sm:text-xl font-bold max-w-3xl">
          Projetos práticos que demonstram minhas habilidades técnicas em desenvolvimento web, 
          cloud e infraestrutura. Cada projeto resolve um problema real e aplica boas práticas 
          de engenharia de software.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="space-y-12">
        {PROJECTS_DATA.map((project) => (
          <div 
            key={project.id}
            className={`bg-white border-4 border-black shadow-brutalLarge hover:translate-x-1 hover:translate-y-1 hover:shadow-brutal transition-all ${
              project.featured ? 'ring-4 ring-brutal-yellow ring-offset-4 ring-offset-white' : ''
            }`}
          >
            {/* Project Image/Preview */}
            {project.liveUrl && (
              <div className="border-b-4 border-black relative overflow-hidden bg-gray-100 group">
                <div className="aspect-video w-full">
                  <iframe
                    src={project.liveUrl}
                    title={project.title}
                    className="w-full h-full border-0"
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin allow-forms"
                  />
                </div>
                {project.featured && (
                  <div className="absolute top-4 right-4 bg-brutal-yellow border-4 border-black px-4 py-2 shadow-brutal">
                    <span className="font-black text-sm uppercase">⭐ Destaque</span>
                  </div>
                )}
              </div>
            )}

            {/* Project Content */}
            <div className="p-6 sm:p-8">
              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-black uppercase mb-4 leading-tight">
                {project.title}
              </h3>

              {/* Description */}
              <div className="mb-6 whitespace-pre-line text-base sm:text-lg font-medium leading-relaxed">
                {project.description}
              </div>

              {/* Technologies */}
              <div className="mb-6">
                <h4 className="text-sm font-black uppercase mb-3 text-brutal-blue">
                  🛠️ Tecnologias:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-brutal-blueLight border-2 border-black px-3 py-1 text-sm font-bold uppercase"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-brutal-blue border-4 border-black px-6 py-3 font-black uppercase shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all inline-flex items-center gap-2"
                  >
                    <span>🚀 Ver Projeto Live</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white border-4 border-black px-6 py-3 font-black uppercase shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all inline-flex items-center gap-2"
                  >
                    <span>💻 Ver Código</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
