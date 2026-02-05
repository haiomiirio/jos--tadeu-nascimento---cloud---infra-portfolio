# 🔍 Guia de Teste de Acessibilidade

## ✅ Como Verificar as Melhorias

### 1. **Inspeção Manual no Navegador**

#### Abra o DevTools (F12) e teste:
```
1. Clique com botão direito em qualquer botão com ícone
2. Selecione "Inspecionar elemento"
3. Verifique se há atributo `aria-label` no <button>
4. Verifique se os <svg> têm `aria-hidden="true"`
```

#### Exemplo do que você deve ver:
```html
✅ CORRETO:
<button aria-label="Fechar menu">
  <svg aria-hidden="true">...</svg>
</button>

❌ INCORRETO:
<button>
  <svg>...</svg>
</button>
```

---

### 2. **Teste com Leitor de Tela**

#### Windows:
- **NVDA** (gratuito): https://www.nvaccess.org/download/
- **JAWS** (pago): https://www.freedomscientific.com/products/software/jaws/

#### macOS:
- **VoiceOver** (nativo): Cmd + F5

#### Linux:
- **Orca** (nativo): Super + Alt + S

#### Teste:
1. Ative o leitor de tela
2. Navegue pelo site usando Tab
3. Ao focar nos botões, você deve ouvir:
   - "Fechar menu, botão"
   - "Excluir tarefa, botão"
   - "Mover tarefa para direita, botão"
   - etc.

---

### 3. **Ferramentas Automáticas**

#### Chrome DevTools (Lighthouse)
```
1. Abra DevTools (F12)
2. Vá na aba "Lighthouse"
3. Marque "Accessibility"
4. Clique "Generate report"
5. Meta: Score de 90+ em Accessibility
```

#### Extensão axe DevTools
```
1. Instale: https://www.deque.com/axe/devtools/
2. Abra DevTools (F12)
3. Vá na aba "axe DevTools"
4. Click "Scan ALL of my page"
5. Veja se há problemas de acessibilidade
```

---

### 4. **Teste de Navegação por Teclado**

Navegue APENAS com teclado (sem mouse):
```
Tab          → Avançar para próximo elemento interativo
Shift + Tab  → Voltar para elemento anterior
Enter/Space  → Ativar botão/link
Esc          → Fechar modais/menus
```

**Checklist:**
- [ ] Todos os botões são acessíveis por Tab?
- [ ] O foco visual está claro?
- [ ] Você consegue usar todas as funcionalidades?

---

### 5. **Verificação Específica por Componente**

#### 🔘 AiChat.tsx
- [ ] Botão flutuante: "Abrir chat de suporte" / "Fechar chat de suporte"
- [ ] Botão fechar (X): "Fechar chat"
- [ ] Botão enviar (✓): "Enviar mensagem"

#### 🎯 Header.tsx
- [ ] Menu mobile: "Abrir menu" / "Fechar menu"

#### 📋 Kanban.tsx
- [ ] Botão olho: "Marcar como público" / "Marcar como privado"
- [ ] Setas: "Mover tarefa para esquerda" / "Mover tarefa para direita"
- [ ] Lixeira: "Excluir tarefa"

#### 🗂️ KanbanBoard.tsx
- [ ] Menu: "Expandir menu" / "Minimizar menu"
- [ ] Adicionar tarefa: "Adicionar nova tarefa"
- [ ] Adicionar coluna: "Adicionar nova coluna"
- [ ] Deletar coluna: "Excluir coluna {nome}"

#### 📝 Column.tsx
- [ ] Minimizar: "Expandir coluna" / "Minimizar coluna"

#### 🎴 KanbanCard.tsx
- [ ] Cadeado: "Marcar como público" / "Marcar como privado"
- [ ] Setas: "Mover tarefa para trás" / "Mover tarefa para frente"
- [ ] X: "Excluir tarefa"

---

### 6. **Teste Rápido via Console**

Cole no console do navegador:
```javascript
// Verifica todos os botões sem aria-label
const buttonsWithoutLabel = Array.from(document.querySelectorAll('button'))
  .filter(btn => {
    const hasAriaLabel = btn.hasAttribute('aria-label');
    const hasText = btn.textContent.trim().length > 0;
    const hasTitle = btn.hasAttribute('title');
    return !(hasAriaLabel || hasText || hasTitle);
  });

console.log('Botões sem rótulo acessível:', buttonsWithoutLabel.length);
buttonsWithoutLabel.forEach((btn, i) => {
  console.log(`${i + 1}.`, btn);
});

// Verifica SVGs sem aria-hidden
const svgsWithoutHidden = Array.from(document.querySelectorAll('button svg'))
  .filter(svg => !svg.hasAttribute('aria-hidden'));

console.log('SVGs sem aria-hidden:', svgsWithoutHidden.length);
svgsWithoutHidden.forEach((svg, i) => {
  console.log(`${i + 1}.`, svg);
});
```

**Resultado esperado:**
- Botões sem rótulo: 0 (ou apenas botões que têm texto visível)
- SVGs sem aria-hidden: 0

---

### 7. **Validadores Online**

#### WAVE (WebAIM)
```
https://wave.webaim.org/
→ Cole a URL do seu site publicado
→ Veja se há alertas de acessibilidade
```

#### aXe Browser Extension
```
https://www.deque.com/axe/browser-extensions/
→ Instale a extensão
→ Escaneie a página
→ Resolva problemas encontrados
```

---

## 📊 Critérios de Sucesso (WCAG 2.1)

✅ **Nível A (Mínimo)**
- [x] Todos os botões têm rótulos acessíveis
- [x] Imagens decorativas (ícones) marcadas com aria-hidden

✅ **Nível AA (Recomendado)**
- [x] Contraste de cores adequado
- [x] Navegação por teclado funcional
- [x] Foco visível

🎯 **Nível AAA (Ideal)**
- [ ] Instruções adicionais para leitores de tela
- [ ] Descrições expandidas onde necessário

---

## 🐛 Problemas Comuns

### Botão não é lido corretamente
```html
❌ Problema:
<button><svg>...</svg></button>

✅ Solução:
<button aria-label="Fechar menu">
  <svg aria-hidden="true">...</svg>
</button>
```

### SVG é lido pelo leitor de tela
```html
❌ Problema:
<svg><path d="..."/></svg>

✅ Solução:
<svg aria-hidden="true"><path d="..."/></svg>
```

---

## 📚 Recursos Adicionais

- **WCAG 2.1**: https://www.w3.org/WAI/WCAG21/quickref/
- **MDN Accessibility**: https://developer.mozilla.org/en-US/docs/Web/Accessibility
- **A11y Project**: https://www.a11yproject.com/
- **WebAIM**: https://webaim.org/

---

## ✨ Status Atual

✅ **Implementado:**
- aria-labels em todos os botões com ícones
- aria-hidden em todos os SVGs decorativos
- Navegação por teclado funcional

🎉 **Projeto pronto para usuários de leitores de tela!**
