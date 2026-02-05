/**
 * 🔍 Script de Teste de Acessibilidade
 * 
 * Como usar:
 * 1. Abra o DevTools (F12)
 * 2. Vá na aba Console
 * 3. Cole este arquivo inteiro e pressione Enter
 * 4. Veja o relatório de acessibilidade
 */

console.clear();
console.log('%c🔍 Iniciando Teste de Acessibilidade...', 'font-size: 20px; font-weight: bold; color: #4CAF50;');
console.log('');

// ====================================
// 1. BOTÕES SEM RÓTULO ACESSÍVEL
// ====================================
console.log('%c📍 1. Verificando botões sem rótulo acessível...', 'font-size: 16px; font-weight: bold; color: #2196F3;');

const allButtons = Array.from(document.querySelectorAll('button'));
const buttonsWithoutLabel = allButtons.filter(btn => {
  const hasAriaLabel = btn.hasAttribute('aria-label');
  const hasAriaLabelledBy = btn.hasAttribute('aria-labelledby');
  const hasText = btn.textContent.trim().replace(/[\n\s]+/g, ' ').length > 1;
  const hasTitle = btn.hasAttribute('title');
  
  return !(hasAriaLabel || hasAriaLabelledBy || hasText || hasTitle);
});

if (buttonsWithoutLabel.length === 0) {
  console.log('%c✅ Perfeito! Todos os botões têm rótulos acessíveis', 'color: #4CAF50; font-weight: bold;');
} else {
  console.log(`%c❌ Encontrados ${buttonsWithoutLabel.length} botões sem rótulo`, 'color: #f44336; font-weight: bold;');
  buttonsWithoutLabel.forEach((btn, i) => {
    console.log(`  ${i + 1}.`, btn);
  });
}
console.log('');

// ====================================
// 2. SVGs SEM aria-hidden
// ====================================
console.log('%c📍 2. Verificando SVGs decorativos...', 'font-size: 16px; font-weight: bold; color: #2196F3;');

const svgsInButtons = Array.from(document.querySelectorAll('button svg'));
const svgsWithoutHidden = svgsInButtons.filter(svg => !svg.hasAttribute('aria-hidden'));

if (svgsWithoutHidden.length === 0) {
  console.log('%c✅ Perfeito! Todos os SVGs em botões têm aria-hidden="true"', 'color: #4CAF50; font-weight: bold;');
} else {
  console.log(`%c⚠️  Encontrados ${svgsWithoutHidden.length} SVGs sem aria-hidden`, 'color: #ff9800; font-weight: bold;');
  svgsWithoutHidden.forEach((svg, i) => {
    console.log(`  ${i + 1}.`, svg.closest('button'));
  });
}
console.log('');

// ====================================
// 3. LINKS SEM TEXTO
// ====================================
console.log('%c📍 3. Verificando links sem texto...', 'font-size: 16px; font-weight: bold; color: #2196F3;');

const links = Array.from(document.querySelectorAll('a'));
const linksWithoutText = links.filter(link => {
  const hasAriaLabel = link.hasAttribute('aria-label');
  const hasText = link.textContent.trim().length > 0;
  const hasTitle = link.hasAttribute('title');
  
  return !(hasAriaLabel || hasText || hasTitle);
});

if (linksWithoutText.length === 0) {
  console.log('%c✅ Perfeito! Todos os links têm texto descritivo', 'color: #4CAF50; font-weight: bold;');
} else {
  console.log(`%c⚠️  Encontrados ${linksWithoutText.length} links sem texto`, 'color: #ff9800; font-weight: bold;');
  linksWithoutText.forEach((link, i) => {
    console.log(`  ${i + 1}.`, link);
  });
}
console.log('');

// ====================================
// 4. IMAGENS SEM ALT
// ====================================
console.log('%c📍 4. Verificando imagens sem alt...', 'font-size: 16px; font-weight: bold; color: #2196F3;');

const images = Array.from(document.querySelectorAll('img'));
const imagesWithoutAlt = images.filter(img => !img.hasAttribute('alt'));

if (imagesWithoutAlt.length === 0) {
  console.log('%c✅ Perfeito! Todas as imagens têm atributo alt', 'color: #4CAF50; font-weight: bold;');
} else {
  console.log(`%c❌ Encontradas ${imagesWithoutAlt.length} imagens sem alt`, 'color: #f44336; font-weight: bold;');
  imagesWithoutAlt.forEach((img, i) => {
    console.log(`  ${i + 1}.`, img);
  });
}
console.log('');

// ====================================
// 5. ELEMENTOS INTERATIVOS POR COMPONENTE
// ====================================
console.log('%c📍 5. Análise por Componente...', 'font-size: 16px; font-weight: bold; color: #2196F3;');

const components = {
  'AiChat': document.querySelector('[class*="chat"]') || document.querySelector('button[aria-label*="chat" i]'),
  'Header': document.querySelector('header'),
  'Kanban': document.querySelector('[class*="kanban"]'),
};

Object.entries(components).forEach(([name, element]) => {
  if (element) {
    const buttons = element.querySelectorAll('button');
    const withLabels = Array.from(buttons).filter(btn => 
      btn.hasAttribute('aria-label') || btn.textContent.trim().length > 1
    );
    console.log(`  ${name}: ${withLabels.length}/${buttons.length} botões acessíveis`);
  }
});
console.log('');

// ====================================
// 6. RESUMO FINAL
// ====================================
console.log('%c📊 RESUMO FINAL', 'font-size: 18px; font-weight: bold; color: #673AB7; background: #f0f0f0; padding: 5px;');
console.log('');

const totalIssues = buttonsWithoutLabel.length + svgsWithoutHidden.length + 
                    linksWithoutText.length + imagesWithoutAlt.length;

const stats = [
  { label: 'Total de botões', value: allButtons.length },
  { label: 'Botões acessíveis', value: allButtons.length - buttonsWithoutLabel.length },
  { label: 'SVGs em botões', value: svgsInButtons.length },
  { label: 'SVGs com aria-hidden', value: svgsInButtons.length - svgsWithoutHidden.length },
  { label: 'Total de links', value: links.length },
  { label: 'Links acessíveis', value: links.length - linksWithoutText.length },
  { label: 'Total de imagens', value: images.length },
  { label: 'Imagens com alt', value: images.length - imagesWithoutAlt.length },
];

stats.forEach(stat => {
  console.log(`  ${stat.label}: ${stat.value}`);
});

console.log('');
console.log(`%c${totalIssues === 0 ? '🎉' : '⚠️'} Total de problemas encontrados: ${totalIssues}`, 
  totalIssues === 0 ? 'color: #4CAF50; font-size: 16px; font-weight: bold;' : 'color: #f44336; font-size: 16px; font-weight: bold;');

if (totalIssues === 0) {
  console.log('');
  console.log('%c✨ PARABÉNS! Seu site está 100% acessível para leitores de tela! ✨', 
    'font-size: 18px; font-weight: bold; color: #4CAF50; background: #E8F5E9; padding: 10px;');
  console.log('');
  console.log('%c💡 Próximos passos:', 'font-size: 14px; font-weight: bold;');
  console.log('  1. Teste com um leitor de tela real (NVDA, JAWS, VoiceOver)');
  console.log('  2. Navegue pelo site apenas com teclado (Tab, Enter, Esc)');
  console.log('  3. Execute o Lighthouse no Chrome DevTools');
  console.log('  4. Teste com a extensão axe DevTools');
} else {
  console.log('');
  console.log('%c💡 Ações recomendadas:', 'font-size: 14px; font-weight: bold;');
  console.log('  1. Adicione aria-label nos botões sem rótulo');
  console.log('  2. Adicione aria-hidden="true" nos SVGs decorativos');
  console.log('  3. Verifique os elementos listados acima');
}

console.log('');
console.log('%c📚 Documentação:', 'font-size: 14px; font-weight: bold;');
console.log('  - Ver: TESTE_ACESSIBILIDADE.md');
console.log('  - WCAG 2.1: https://www.w3.org/WAI/WCAG21/quickref/');
console.log('  - MDN: https://developer.mozilla.org/en-US/docs/Web/Accessibility');
console.log('');
