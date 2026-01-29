# Instruções rápidas para agentes AI (Copilot)

Este arquivo resume conhecimento essencial para ser produtivo rapidamente neste repositório React + Vite + TypeScript.

- **Arquitetura (visão geral):** SPA React com Vite; estado global via Redux (slice `kanban`) e persistência local via `localStorage`.
  - Entrada: [src/index.tsx](src/index.tsx#L1) monta `App`.
  - App central: [src/App.tsx](src/App.tsx#L1) gerencia navegação interna por `activePage` (estado local), autenticação simples e passa dados para páginas.
  - Persistência: [src/services/storage.ts](src/services/storage.ts#L1) usa `localStorage` com chaves constantes (`tadeu_kanban_v3`, `tadeu_finance_v1`, `tadeu_users`).
  - Redux: [src/redux/store.ts](src/redux/store.ts#L1) registra o reducer `kanban` implementado em [src/redux/slices/kanbanSlice.ts](src/redux/slices/kanbanSlice.ts#L1) — responsável por tarefas, colunas, zoom/pan, menu.

- **Padrões e convenções do projeto:**
  - IDs gerados inline com `Math.random().toString(36).substr(2, 9)` (ver usos em `App.tsx`).
  - Mensagens e textos são frequentemente armazenados/formatados em UPPERCASE (ex.: `AiChat.tsx`).
  - Persistência local centralizada em `services/storage.ts`; prefira reutilizar esse módulo ao alterar leitura/escrita de dados do cliente.
  - UI usa classes utilitárias (estilo Tailwind-like) e componentes em `src/components/*`.

- **Integração com AI / dependências externas:**
  - Biblioteca: `@google/genai` (dependência no `package.json`). O componente [src/AiChat.tsx](src/AiChat.tsx#L1) instancia `GoogleGenAI` e chama `models.generateContent` com `model: 'gemini-3-flash-preview'`.
  - Variáveis de ambiente: `README.md` menciona `GEMINI_API_KEY` em `.env.local`, mas `AiChat.tsx` usa `process.env.API_KEY` — isso é uma discrepância detectável. Vite normalmente expõe variáveis com prefixo `VITE_`.
    - Ao testar/rodar localmente, confirme qual `env` está sendo usado ou atualize o código para usar `import.meta.env.VITE_GEMINI_API_KEY` se necessário.

- **Fluxos críticos / comandos de desenvolvimento:**
  - Instalação: `npm install` (ver README.md).
  - Dev server: `npm run dev` (executa `vite`).
  - Build/preview: `npm run build` / `npm run preview`.
  - Repare que não há testes automatizados neste repositório — alterações devem ser validadas manualmente via `npm run dev`.

- **Pontos a verificar antes de mudanças automáticas:**
  - Checar inconsistência de env vars para a integração AI (`GEMINI_API_KEY` vs `API_KEY`).
  - `Admin` usa senha hardcoded `1234` em `App.tsx` (linha de `handleLogin`) — evite expor essa lógica em commits de produção.
  - Dados do usuário e senhas são armazenados em `localStorage` (ver `storage.registerUser`/`login`); mudanças de autenticação requerem cuidado.

- **Arquivos de referência (principais):**
  - `package.json` — scripts e dependências.
  - [src/App.tsx](src/App.tsx#L1) — fluxo de navegação e handlers centrais.
  - [src/services/storage.ts](src/services/storage.ts#L1) — persistência e keys.
  - [src/AiChat.tsx](src/AiChat.tsx#L1) — integração com `@google/genai`.
  - [src/redux/slices/kanbanSlice.ts](src/redux/slices/kanbanSlice.ts#L1) — estado canônico do Kanban.

- **Como a IA pode ajudar (tarefas seguras e específicas):**
  - Identificar inconsistências (ex.: env var, uso de `localStorage` vs Redux).
  - Refatorar chamadas repetidas de geração de IDs para uma função utilitária compartilhada.
  - Atualizar `AiChat.tsx` para usar `import.meta.env.VITE_*` de forma compatível com Vite (apontar localmente onde ajustar).
  - Gerar PRs com mudanças pequenas e testes de smoke (ex.: ajustes de env, mensagens de erro mais claras).

Se algo estiver faltando ou você quer que eu inclua exemplos de PRs/patches automáticos, diga quais áreas priorizar (AI, autenticação, kanban, persistência, etc.).
