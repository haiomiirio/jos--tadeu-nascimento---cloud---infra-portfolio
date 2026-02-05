# Como Configurar API Key do Gemini

## ⚠️ AÇÃO NECESSÁRIA

Para o chat AI funcionar no site em produção, você precisa configurar o secret no GitHub:

### Passo a passo:

1. **Obtenha sua API Key do Gemini:**
   - Acesse: https://aistudio.google.com/app/apikey
   - Faça login com sua conta Google
   - Clique em "Create API Key"
   - Copie a chave gerada

2. **Configure o Secret no GitHub:**
   - Acesse: https://github.com/haiomiirio/jos--tadeu-nascimento---cloud---infra-portfolio/settings/secrets/actions
   - Clique em **"New repository secret"**
   - **Name:** `VITE_GEMINI_API_KEY`
   - **Value:** Cole a chave da API que você copiou
   - Clique em **"Add secret"**

3. **Faça o commit e push das mudanças:**
   ```bash
   git add .
   git commit -m "fix: migrar Tailwind para npm e adicionar favicon"
   git push
   ```

4. **Aguarde o deploy:**
   - O GitHub Actions vai rodar automaticamente
   - Em ~2-3 minutos seu site estará atualizado
   - Acesse: https://haiomiirio.github.io/jos--tadeu-nascimento---cloud---infra-portfolio/

## ✅ Problemas Corrigidos

1. **Tailwind CSS CDN removido** - Agora usa Tailwind via npm (mais rápido e sem warnings)
2. **Favicon adicionado** - Criado favicon com suas iniciais "JT" no estilo brutal
3. **Configuração preparada** - Quando você adicionar o secret, o chat AI vai funcionar

## 🧪 Testar Localmente

Para testar com a API Key em desenvolvimento:

1. Crie o arquivo `.env.local` na raiz do projeto:
   ```
   VITE_GEMINI_API_KEY=sua_chave_aqui
   ```

2. Execute:
   ```bash
   npm run dev
   ```

3. Acesse: http://localhost:3000
