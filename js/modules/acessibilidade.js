// Recursos de acessibilidade que não são de nenhuma tela específica
import { lerPreferenciaContraste, salvarPreferenciaContraste } from './armazenamento.js';

export function iniciarAcessibilidade() {
  iniciarPularConteudo();
  iniciarAltoContraste();
}

// Link "Pular para o conteúdo": como o # da URL é usado pelas rotas,
// o href="#app" normal seria lido como uma tela que não existe.
// Então o clique é tratado aqui e só manda o foco pro <main>.
function iniciarPularConteudo() {
  const link = document.querySelector('.pular-conteudo');
  const app = document.getElementById('app');

  link.addEventListener('click', (evento) => {
    evento.preventDefault();
    app.focus();
  });
}

// Modo de alto contraste: coloca data-contraste="alto" no <html>,
// e o variaveis.css troca as cores quando esse atributo existe.
function iniciarAltoContraste() {
  const botao = document.querySelector('.botao-contraste');

  // se a pessoa já escolheu antes, usa a escolha dela.
  // se não, segue a configuração de contraste do sistema operacional
  const salvo = lerPreferenciaContraste();
  const sistemaPedeMaisContraste = window.matchMedia('(prefers-contrast: more)').matches;
  aplicarContraste(salvo !== null ? salvo : sistemaPedeMaisContraste);

  botao.addEventListener('click', () => {
    const ligado = botao.getAttribute('aria-pressed') !== 'true';
    aplicarContraste(ligado);
    salvarPreferenciaContraste(ligado);
  });
}

function aplicarContraste(ligado) {
  const botao = document.querySelector('.botao-contraste');

  if (ligado) {
    document.documentElement.dataset.contraste = 'alto';
  } else {
    delete document.documentElement.dataset.contraste;
  }
  // aria-pressed avisa o leitor de tela se o botão está ligado ou desligado
  botao.setAttribute('aria-pressed', ligado);
}
