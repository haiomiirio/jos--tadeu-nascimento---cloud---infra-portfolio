# 🔐 Como Configurar GitHub Secrets

Para o chat AI funcionar em produção (GitHub Pages), você precisa adicionar a API key como secret.

## Passos:

1. **Acesse seu repositório no GitHub:**
   https://github.com/haiomiirio/jos--tadeu-nascimento---cloud---infra-portfolio

2. **Vá em Settings (Configurações):**
   - Clique na aba **Settings** (⚙️)

3. **Acesse Secrets and variables:**
   - No menu lateral esquerdo, clique em **Secrets and variables**
   - Depois clique em **Actions**

4. **Adicione o Secret:**
   - Clique no botão verde **"New repository secret"**
   - **Name:** `VITE_GEMINI_API_KEY`
   - **Secret:** `[SUA_CHAVE_API_AQUI]`
   - Clique em **"Add secret"**

5. **Pronto!** ✅
   - O próximo deploy vai usar a chave criptografada
   - A chave nunca aparecerá nos logs públicos
   - Está 100% segura

## Testar localmente:

O arquivo `.env.local` já está configurado. Para testar:

```bash
npm run dev
```

Abra o chat no site e faça uma pergunta!

---

**Nota:** Você pode deletar este arquivo depois de configurar o secret.
