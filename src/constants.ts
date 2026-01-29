
import { Project, Experience } from './types';

export const PERSONAL_DATA = {
  name: "José Tadeu Nascimento",
  role: "Estudante e Profissional em Cloud, Segurança e Infraestrutura",
  location: "Brasil",
  bio: "Profissional focado em suporte de TI e infraestrutura, atualmente em transição para Cloud e Segurança Cibernética. Perfil dedicado ao aprendizado contínuo e à evolução técnica.",
  summary: "Possuo experiência sólida em infraestrutura tradicional, redes e suporte. Atualmente curso Análise e Desenvolvimento de Sistemas e aprofundo meus estudos no ecossistema AWS e ferramentas de automação.",
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
    github: "https://github.com",
    linkedin: "https://www.linkedin.com/in/jos%C3%A9-tadeu-nascimento/",
    email: "tadeu.nascimento@exemplo.com"
  }
};

export const EXPERIENCES: Experience[] = [
  {
    id: "e1",
    company: "Infraestrutura & Redes",
    role: "Analista de Suporte de TI",
    period: "2020 - Presente",
    description: "Administração de servidores, gestão de ativos de rede, suporte técnico avançado e implementação de melhorias na infraestrutura local."
  },
  {
    id: "e2",
    company: "TI Corporativa",
    role: "Técnico de Suporte",
    period: "2016 - 2020",
    description: "Manutenção de hardware e software, suporte ao usuário final e configuração de redes locais."
  }
];

export const SYSTEM_PROMPT = `
Você é o Assistente Virtual do José Tadeu Nascimento. José é um profissional em transição para as áreas de Cloud e Segurança.
Seu objetivo é responder perguntas de forma honesta, técnica e direta.
REGRAS:
1. Nunca chame José de "especialista", "sênior" ou "autoridade". Use "Estudante" ou "Profissional em transição/evolução".
2. Seja transparente: Se perguntarem algo avançado que não está no currículo, diga que José está estudando esse tópico.
3. Responda sempre em Português do Brasil.
4. Mantenha o tom de quem está em busca de crescimento e aprendizado contínuo.
`;
