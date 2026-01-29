# 📁 Estrutura do Projeto

```
src/
├── 📂 components/
│   ├── 📂 common/              # Componentes reutilizáveis
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   │
│   ├── 📂 Kanban/              # Componentes do quadro Kanban
│   │   ├── KanbanBoard.tsx
│   │   ├── KanbanCard.tsx
│   │   ├── KanbanColumn.tsx
│   │   └── KanbanForm.tsx
│   │
│   ├── 📂 Auth/                # Componentes de autenticação
│   │   └── AdminLogin.tsx
│   │
│   └── 📂 Admin/               # Componentes do painel admin
│       └── AdminPanel.tsx
│
├── 📂 pages/                   # Páginas (rotas principais)
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Resume.tsx
│   ├── Process.tsx
│   ├── FinancePage.tsx
│   ├── AuthPage.tsx
│   └── RestrictedArea.tsx
│
├── 📂 hooks/                   # Hooks customizados
│   └── useLocalStorage.ts      # Hook para localStorage
│
├── 📂 services/                # Serviços e lógica de API
│   ├── storage.ts              # Gerenciamento de armazenamento
│   ├── api.ts                  # (futuro) Chamadas de API
│   ├── auth.ts                 # (futuro) Autenticação
│   └── kanban.ts               # (futuro) Integração Kanban
│
├── 📂 styles/                  # Estilos globais
│   ├── globals.css             # Estilos globais
│   ├── variables.css           # Variáveis CSS (cores, fontes)
│   └── tailwind.config.ts      # (se usar Tailwind)
│
├── 📂 assets/                  # Arquivos estáticos
│   ├── 📂 images/
│   ├── 📂 icons/
│   └── 📂 fonts/
│
├── types.ts                    # Tipos TypeScript globais
├── constants.ts                # Constantes da aplicação
├── App.tsx                     # Componente principal
├── AiChat.tsx                  # Componente de chat AI
├── Kanban.tsx                  # Componente Kanban
├── index.tsx                   # Ponto de entrada
└── index.html                  # Template HTML
```

## 📌 Explicação das Pastas

| Pasta | Descrição |
|-------|-----------|
| **components/** | Componentes React reutilizáveis, organizados por contexto |
| **components/common/** | Header, Footer e outros componentes globais |
| **components/Kanban/** | Componentes específicos do Kanban |
| **components/Auth/** | Componentes de autenticação |
| **components/Admin/** | Componentes do painel administrativo |
| **pages/** | Páginas completas que mapeiam rotas da aplicação |
| **hooks/** | Hooks customizados (useState, useLocalStorage, etc) |
| **services/** | Lógica de API, armazenamento e autenticação |
| **styles/** | CSS global, variáveis de tema, configurações |
| **assets/** | Imagens, ícones, fontes estáticas |

## 🔧 Como Usar

### Importar um componente comum
```tsx
import Header from '@/components/common/Header';
```

### Importar um hook
```tsx
import { useLocalStorage } from '@/hooks/useLocalStorage';
```

### Importar um serviço
```tsx
import { storage } from '@/services/storage';
```

## 📝 Convenções

- **PascalCase** para componentes e tipos
- **camelCase** para funções e variáveis
- **UPPER_SNAKE_CASE** para constantes
- Um arquivo por componente/página
- Estilos junto com o componente ou em `styles/`
