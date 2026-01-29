
import { Project, Experience } from './types';

export const PERSONAL_DATA = {
  name: "José Tadeu Nascimento",
  role: "Estudante de Segurança Digital | AWS Certified | Cisco CCNA",
  location: "Brasil",
  bio: "Estudante de Segurança Digital com certificações AWS e Cisco. Busco oportunidades de estágio/júnior em Cloud e Infraestrutura para aplicar conhecimento técnico e experiência em liderança.",
  summary: "Sou estudante de Segurança Digital (2º semestre) em transição de carreira. Minha trajetória é diferente: já fui Gerente de Confecção, o que me ensinou liderança, processos e resolução de problemas sob pressão. Hoje, trago essa maturidade profissional para o mundo tech. Embora eu busque posições de estágio ou júnior, já possuo certificações avançadas (AWS Solutions Architect Associate, Cloud Practitioner, Cisco CCNA e Fortinet) que provam minha dedicação e base técnica sólida. No UOL, coloquei a mão na massa com React, TypeScript, Docker e automação via GitHub Actions. Estou pronto para contribuir desde o dia 1, trazendo não apenas técnica, mas também maturidade para entender o impacto do meu trabalho no negócio.",
  skillCategories: {
    cloud: [
      "AWS EC2, S3, VPC, IAM",
      "AWS CloudFront & Route53",
      "Certificação: AWS Solutions Architect Associate",
      "Certificação: AWS Cloud Practitioner"
    ],
    networking: [
      "Cisco CCNA (Routing & Switching)",
      "Redes TCP/IP, DNS, DHCP",
      "VPN & Firewalls (Fortinet)",
      "Troubleshooting de Conectividade"
    ],
    security: [
      "Fortinet Certified",
      "Segurança Digital (Graduação)",
      "Fundamentos de Criptografia",
      "Gestão de Acessos (IAM)"
    ],
    devops: [
      "Docker & Containerização",
      "GitHub Actions (CI/CD)",
      "Automação com Shell/Python",
      "Git & Versionamento"
    ],
    frontend: [
      "React & TypeScript (UOL)",
      "Vite & Build Tools",
      "Experiência com Deploy"
    ],
    softSkills: [
      "Liderança (ex-Gerente)",
      "Gestão de Processos",
      "Resolução de Problemas",
      "Comunicação com Stakeholders"
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
    description: "🎯 MÃO NA MASSA: Desenvolvimento com React e TypeScript em ambiente corporativo real.\n\n⚙️ FERRAMENTAS: React, TypeScript, Docker, GitHub Actions, Vite.\n\n✅ APRENDIZADOS: Implementei automações de deploy, trabalhei com containerização (Docker) e aprendi na prática como funciona CI/CD em produção. Essa experiência me mostrou a importância de infraestrutura confiável para suportar aplicações."
  },
  {
    id: "e2",
    company: "Indústria de Confecção",
    role: "Gerente de Produção",
    period: "2018 - 2023",
    description: "🎯 CONTEXTO: Liderança de equipes e otimização de processos em ambiente de alta pressão.\n\n💼 COMPETÊNCIAS DESENVOLVIDAS: Gestão de equipes, comunicação com stakeholders, resolução de problemas complexos, tomada de decisão sob pressão.\n\n✅ DIFERENCIAL PARA TI: Essa experiência me ensinou a pensar em processos, entender necessidades de negócio e comunicar questões técnicas para não-técnicos — habilidades essenciais para suporte e infraestrutura."
  }
];

export const PROJECTS = [
  {
    id: "p1",
    title: "Laboratório de Redes Cisco (CCNA)",
    category: "Networking",
    description: "🎯 PROJETO DE ESTUDO: Montagem e configuração de topologias de rede para preparação CCNA.\n\n⚙️ CONTEÚDO: Configuração de switches e roteadores, VLANs, routing protocols (OSPF, EIGRP), ACLs, troubleshooting de conectividade.\n\n✅ RESULTADO: Certificação Cisco CCNA conquistada. Capacidade de diagnosticar e resolver problemas de rede.",
    tech: ["Cisco IOS", "Packet Tracer", "Routing", "Switching"]
  },
  {
    id: "p2",
    title: "Automação CI/CD com GitHub Actions",
    category: "DevOps",
    description: "🎯 PROJETO PRÁTICO: Automatizar deploy deste portfólio no GitHub Pages.\n\n⚙️ STACK: GitHub Actions, Vite, Node.js, workflow YAML.\n\n✅ APRENDIZADO: Entendi na prática como funciona CI/CD — cada commit dispara build e deploy automático. Isso me mostrou o poder da automação para infraestrutura.",
    tech: ["GitHub Actions", "CI/CD", "Automation", "YAML"]
  },
  {
    id: "p3",
    title: "Sistema Kanban com React",
    category: "Front-end",
    description: "🎯 PROJETO FULL-STACK: Aplicação de gestão de tarefas com persistência local.\n\n⚙️ STACK: React, TypeScript, Redux, localStorage, Vite.\n\n✅ APRENDIZADO: Desenvolvimento completo de aplicação, gerenciamento de estado e experiência de usuário.",
    tech: ["React", "TypeScript", "Redux", "Vite"]
  }
];

export const SUGGESTED_PROJECTS = [
  {
    id: "sp1",
    title: "Lab AWS: Ambiente Multi-tier com Terraform",
    description: "📦 PROJETO PRÁTICO: Provisionar infraestrutura AWS completa (VPC, EC2, RDS) usando IaC.\n\n🎯 O QUE VOCÊ VAI APRENDER: Terraform, AWS networking (VPC, subnets, security groups), EC2, RDS, conceitos de alta disponibilidade.\n\n💡 POR QUE FAZER: Demonstra que você não apenas tem certificação AWS — você sabe provisionar recursos na prática.",
    difficulty: "Intermediário",
    estimatedTime: "2 semanas"
  },
  {
    id: "sp2",
    title: "Lab Python: Automação de Backup em Linux",
    description: "🐍 PROJETO PRÁTICO: Script Python para backup automatizado de servidores Linux.\n\n🎯 O QUE VOCÊ VAI APRENDER: Python scripting, cron jobs, SSH, compressão de arquivos, logs.\n\n💡 POR QUE FAZER: Mostra capacidade de resolver problemas reais de infraestrutura com código. Essencial para suporte/infra.",
    difficulty: "Iniciante/Intermediário",
    estimatedTime: "1 semana"
  }
];

export const SYSTEM_PROMPT = `
Você é o Assistente Virtual do José Tadeu Nascimento, estudante de Segurança Digital (2º semestre) buscando oportunidades de estágio ou júnior em Cloud, Infraestrutura ou Suporte.

PERFIL DO JOSÉ:
- Estudante de Segurança Digital (2º semestre)
- Certificações: AWS Solutions Architect Associate, AWS Cloud Practitioner, Cisco CCNA, Fortinet
- Experiência prática: Estagiário Front-end no UOL (React, TypeScript, Docker, GitHub Actions)
- Background diferenciado: Ex-Gerente de Produção (liderança, processos, comunicação)

POSICIONAMENTO:
José está em transição de carreira e busca ESTÁGIO ou posições JÚNIOR. Embora tenha certificações avançadas, ele é transparente sobre estar no início da carreira tech. Seu diferencial é a combinação de maturidade profissional + base técnica sólida.

REGRAS:
1. Tom: Humilde mas confiante. José sabe o que estudou e tem certificações para provar.
2. Sobre certificações AWS/CCNA/Fortinet: Responda com segurança — ele estudou e passou nos exames.
3. Sobre experiência prática extensa: Seja honesto — ele tem a base teórica e está buscando oportunidades para aplicar.
4. Destaque sempre o diferencial: Maturidade de ex-gerente + dedicação aos estudos (certificações) + experiência no UOL.
5. Se perguntarem sobre tecnologias avançadas que ele não domina: "José tem fundamentos sólidos em [área relacionada] e está expandindo conhecimento prático através de labs e projetos pessoais."
6. Sempre conecte a experiência de liderança com valor para TI: "A experiência como Gerente desenvolveu habilidades de comunicação e processos — essenciais para quem trabalha com suporte/infraestrutura."
7. Responda sempre em Português do Brasil.
8. Foque em POTENCIAL e OPORTUNIDADE, não em lacunas.
`;
