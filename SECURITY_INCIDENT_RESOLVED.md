# 🚨 INCIDENTE DE SEGURANÇA - AÇÃO URGENTE NECESSÁRIA

## ⚠️ SITUAÇÃO

Sua chave de API do Google Gemini foi **EXPOSTA PUBLICAMENTE** no GitHub e foi detectada pelo sistema de segurança do Google Cloud.

**Chave comprometida:** `AIzaSyDATIqwpm5KL1esuMvTCILby_wql2ReT94`

---

## ✅ AÇÕES JÁ TOMADAS (por mim)

1. ✅ Removi a chave do arquivo `SETUP_SECRETS.md`
2. ✅ Limpei todo o histórico do Git que continha a chave
3. ✅ Fiz force push para sobrescrever o repositório remoto
4. ✅ A chave não está mais visível no código atual ou no histórico

---

## 🔴 AÇÕES URGENTES QUE VOCÊ DEVE FAZER AGORA

### 1. REGENERAR A CHAVE IMEDIATAMENTE ⚡

A chave exposta **AINDA FUNCIONA** e pode ser usada por terceiros! Você PRECISA desativá-la:

1. **Acesse o Google Cloud Console:**
   - https://console.cloud.google.com/apis/credentials
   - Faça login com sua conta Google

2. **Localize o projeto:**
   - Projeto: `Gemini (gen-lang-client-0633409898)`

3. **Encontre a chave comprometida:**
   - Procure pela chave que termina em `...wql2ReT94`

4. **REGENERE a chave:**
   - Clique na chave
   - Clique em **"Regenerate key"** (ou "Delete" se preferir criar uma nova)
   - Isso vai **DESATIVAR** a chave antiga imediatamente

5. **Copie a nova chave gerada**

---

### 2. ADICIONAR RESTRIÇÕES À NOVA CHAVE 🔒

Proteja sua nova chave adicionando restrições:

1. No console, clique em **"Edit API key"**
2. Em **"API restrictions"**, selecione:
   - "Restrict key"
   - Marque apenas: **Generative Language API**
3. Em **"Application restrictions"** (opcional mas recomendado):
   - Selecione "HTTP referrers"
   - Adicione: `https://haiomiirio.github.io/jos--tadeu-nascimento---cloud---infra-portfolio/*`
4. Salve as alterações

---

### 3. CONFIGURAR A NOVA CHAVE NO GITHUB SECRETS 🔐

1. **Acesse:**
   - https://github.com/haiomiirio/jos--tadeu-nascimento---cloud---infra-portfolio/settings/secrets/actions

2. **Se o secret já existe:**
   - Clique em `VITE_GEMINI_API_KEY`
   - Clique em "Update"
   - Cole a **NOVA** chave
   - Salve

3. **Se o secret não existe:**
   - Clique em "New repository secret"
   - Name: `VITE_GEMINI_API_KEY`
   - Value: [Cole a nova chave aqui]
   - Clique em "Add secret"

---

### 4. REVISAR ATIVIDADE DA API 📊

Verifique se houve uso indevido da chave comprometida:

1. Acesse: https://console.cloud.google.com/apis/dashboard
2. Selecione o projeto `Gemini`
3. Verifique o gráfico de uso da **Generative Language API**
4. Veja se há picos ou uso inesperado
5. Confira a aba **Billing** para verificar custos

---

## 📋 CHECKLIST DE SEGURANÇA

- [ ] Regenerei a chave de API no Google Cloud Console
- [ ] A chave antiga foi desativada
- [ ] Adicionei restrições à nova chave (API + HTTP referrers)
- [ ] Configurei a nova chave como secret no GitHub
- [ ] Revisei o uso da API e billing
- [ ] Entendi que NUNCA devo commitar chaves de API no código

---

## 🛡️ BOAS PRÁTICAS PARA O FUTURO

### ✅ O QUE FAZER:

- Sempre use **GitHub Secrets** para chaves de produção
- Use arquivos `.env.local` para desenvolvimento (já está no `.gitignore`)
- Use placeholders em documentação (ex: `[SUA_CHAVE_AQUI]`)
- Adicione restrições às APIs keys sempre que possível

### ❌ O QUE NUNCA FAZER:

- ❌ Commitar arquivos `.env` com chaves reais
- ❌ Colocar chaves em arquivos de documentação (README, SETUP, etc.)
- ❌ Compartilhar chaves em chats, emails ou mensagens
- ❌ Publicar chaves em fóruns ou sites públicos

---

## 📞 SUPORTE

Se tiver dúvidas ou detectar uso indevido:

- **Google Cloud Support:** https://cloud.google.com/support
- **GitHub Security:** https://docs.github.com/en/code-security

---

## ✅ STATUS ATUAL

**Repositório:** ✅ Limpo (chave removida do código e histórico)  
**Chave antiga:** 🔴 AINDA ATIVA - REGENERAR AGORA!  
**Próximos passos:** Regenerar chave + configurar secret

---

**IMPORTANTE:** A chave exposta ainda funciona até você regenerá-la no Google Cloud Console. Faça isso AGORA!
