
import { Project, Experience } from './types';

export const PERSONAL_DATA = {
  name: "José Tadeu Nascimento",
  role: "Cloud Engineer | AWS Solutions Architect - Associate",
  location: "Brasil",
  bio: "Transformo experiência em Front-end e liderança em soluções de Cloud seguras e escaláveis. Especializado em AWS, automação e infraestrutura como código.",
  summary: "Minha jornada profissional combina o melhor de dois mundos: a precisão técnica do desenvolvimento front-end no UOL com a visão estratégica de quem já liderou equipes. Hoje, aplico essa combinação única para desenhar arquiteturas cloud resilientes, automatizar processos complexos e garantir segurança em ambientes de produção. Minha experiência anterior como Gerente me ensinou a pensar em processos, liderança e resultados — competências essenciais para um profissional de infraestrutura que precisa entregar não apenas técnica, mas também valor ao negócio.",
  skillCategories: {
    cloudCompute: [
      "AWS EC2, Lambda, ECS",
      "Auto Scaling & Load Balancing",
      "Google Cloud Compute Engine"
    ],
    networking: [
      "AWS VPC, Route53, CloudFront",
      "Cisco CCNA (Routing & Switching)",
      "DNS, Load Balancers, CDN"
    ],
    security: [
      "AWS IAM, Security Groups, KMS",
      "Segurança Digital (Bacharelado)",
      "Gestão de Acesso e Compliance"
    ],
    automation: [
      "Terraform (IaC)",
      "Docker & Container Orchestration",
      "GitHub Actions CI/CD",
      "Shell Scripting & Python"
    ],
    storage: [
      "AWS S3, EBS, EFS",
      "Backup & Disaster Recovery",
      "Storage Optimization"
    ],
    frontend: [
      "React & TypeScript",
      "Vite & Modern Build Tools",
      "UI/UX Best Practices"
    ]
  },
  skills: [
    "AWS (EC2, S3, CloudFront)", 
    "Terraform", 
    "Linux (Administração e Servidores)", 
    "Redes de Computadores", 
    "Segurança da Informação", 
    "Monitoramento de Ativos", 
    "Docker & Containerização", 
    "Suporte Nível 2 e 3",
    "Virtualização (VMware/Hyper-V)"
  ],
  socials: {
    github: "https://github.com/haiomiirio",
    linkedin: "https://www.linkedin.com/in/josé-tadeu-nascimento/",
    email: "tadeu.nascimento@exemplo.com"
  }
};

export const EXPERIENCES: Experience[] = [
  {
    id: "e1",
    company: "UOL (Universo Online)",
    role: "Estagiário Front-end",
    period: "2024 - Presente",
    description: "🎯 DESAFIO: Automatizar processos manuais de deploy e garantir consistência entre ambientes de desenvolvimento.\n\n⚙️ TECNOLOGIAS: React, TypeScript, Docker, GitHub Actions, Vite.\n\n✅ RESULTADOS: Reduzi em 40% o tempo de deploy através de pipelines automatizados com GitHub Actions. Implementei containerização com Docker garantindo paridade entre ambientes dev/prod, eliminando bugs relacionados a configuração."
  },
  {
    id: "e2",
    company: "Experiência Anterior",
    role: "Gerente de Operações",
    period: "2018 - 2023",
    description: "🎯 DESAFIO: Liderar equipes multidisciplinares e otimizar processos operacionais em ambiente de alta pressão.\n\n⚙️ COMPETÊNCIAS: Gestão de equipes, melhoria de processos, comunicação com stakeholders, resolução de conflitos.\n\n✅ RESULTADOS: Essa experiência desenvolveu minha capacidade de pensar estrategicamente sobre infraestrutura — não apenas como um problema técnico, mas como um habilitador de negócios. Aprendi a traduzir necessidades técnicas em valor para o negócio."
  },
  {
    id: "e3",
    company: "Infraestrutura & Redes",
    role: "Analista de Suporte de TI",
    period: "2016 - 2018",
    description: "🎯 DESAFIO: Manter alta disponibilidade de servidores e garantir recuperação rápida em cenários de falha.\n\n⚙️ TECNOLOGIAS: Linux, VMware, redes TCP/IP, monitoramento de ativos.\n\n✅ RESULTADOS: Implementei processo de backup automatizado reduzindo RTO (Recovery Time Objective) de 4h para 30min. Essa experiência hands-on com servidores on-premise foi fundamental para entender os desafios que Cloud resolve."
  }
];

export const PROJECTS = [
  {
    id: "p1",
    title: "Sistema de Gestão Kanban",
    category: "Full Stack",
    description: "🎯 DESAFIO: Criar aplicação full-stack para gestão de tarefas com persistência local e interface responsiva.\n\n⚙️ STACK: React, TypeScript, Redux, localStorage API, Vite.\n\n✅ RESULTADO: Aplicação com drag-and-drop, gerenciamento de estado complexo e experiência de usuário fluida. Demonstra domínio de arquitetura front-end e padrões modernos.",
    tech: ["React", "TypeScript", "Redux", "Vite"]
  },
  {
    id: "p2",
    title: "Automação CI/CD com GitHub Actions",
    category: "DevOps",
    description: "🎯 DESAFIO: Automatizar build, testes e deploy de aplicação React no GitHub Pages.\n\n⚙️ STACK: GitHub Actions, Vite, Node.js, workflow YAML.\n\n✅ RESULTADO: Pipeline completamente automatizado — cada push na main dispara build otimizado e deploy em produção. Zero intervenção manual.",
    tech: ["GitHub Actions", "CI/CD", "Automation"]
  },
  {
    id: "p3",
    title: "Integração AI com Google Gemini",
    category: "IA & APIs",
    description: "🎯 DESAFIO: Implementar chat inteligente integrado ao portfólio para responder perguntas sobre experiência profissional.\n\n⚙️ STACK: Google Gemini API, React, TypeScript, variáveis de ambiente.\n\n✅ RESULTADO: Interface de chat funcional com IA contextualizada. Demonstra capacidade de integrar APIs externas e lidar com segredos/env vars.",
    tech: ["Google Gemini", "API Integration", "React"]
  }
];

export const SUGGESTED_PROJECTS = [
  {
    id: "sp1",
    title: "Multi-Region Disaster Recovery com Terraform",
    description: "📦 PROJETO: Infraestrutura AWS multi-região com failover automático.\n\n🎯 O QUE VOCÊ VAI APRENDER: Terraform modules, AWS Route53 health checks, S3 replication, RDS read replicas, disaster recovery patterns.\n\n💡 POR QUE IMPORTA: Mostra entendimento de alta disponibilidade e business continuity — conceitos críticos para infra.",
    difficulty: "Intermediário",
    estimatedTime: "2-3 semanas"
  },
  {
    id: "sp2",
    title: "Observability Stack com Prometheus + Grafana",
    description: "📊 PROJETO: Deploy de aplicação containerizada com monitoramento completo (métricas, logs, traces).\n\n🎯 O QUE VOCÊ VAI APRENDER: Docker Compose, Prometheus, Grafana, alerting, log aggregation, AWS CloudWatch integration.\n\n💡 POR QUE IMPORTA: Observability é essencial para SRE/DevOps. Demonstra que você pensa além do deploy — você garante que sistemas funcionem.",
    difficulty: "Intermediário",
    estimatedTime: "1-2 semanas"
  }
];

export const SYSTEM_PROMPT = `
Você é o Assistente Virtual do José Tadeu Nascimento, um Cloud Engineer certificado AWS com experiência prática em Front-end (UOL) e background em liderança.

PERFIL DO JOSÉ:
- AWS Solutions Architect - Associate & Cloud Practitioner
- Cisco CCNA (Redes)
- Bacharelado em Segurança Digital (em andamento)
- Experiência Front-end: React, TypeScript, Docker, GitHub Actions
- Background em gestão e liderança de equipes

Seu objetivo é responder perguntas de forma confiante, técnica e focada em resolução de problemas.

REGRAS:
1. Tom profissional e moderno. José é um profissional qualificado com certificações robustas e experiência prática.
2. Destaque a combinação única: técnica (front-end + cloud) + soft skills (liderança, processos).
3. Se perguntarem sobre tecnologias que José domina (AWS, Docker, React, Redes), responda com confiança.
4. Se perguntarem sobre tecnologias avançadas que não estão explícitas no currículo, seja honesto: "José tem fundamentos sólidos em [área relacionada] e está expandindo conhecimento em [tecnologia específica]".
5. Sempre conecte experiências passadas com valor atual. Ex: "A experiência como Gerente desenvolveu habilidades de comunicação essenciais para um Cloud Engineer que precisa traduzir requisitos técnicos para stakeholders".
6. Responda sempre em Português do Brasil.
7. Foque em RESULTADOS e IMPACTO, não apenas responsabilidades.
`;
