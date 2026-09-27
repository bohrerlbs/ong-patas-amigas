// Rotas da SPA: troca o conteúdo do <main id="app"> de acordo com o # da URL,
// sem recarregar a página. Ex: #/inicio, #/projetos, #/cadastro, #/projetos/feira
import { templateInicio, templateProjetos, templateCadastro, templateNaoEncontrado } from './templates.js';
import { iniciarFormulario } from './formulario.js';
import { fecharMenu } from './menu.js';

const rotas = {
  inicio: { titulo: 'Início', template: templateInicio },
  projetos: { titulo: 'Projetos', template: templateProjetos },
  cadastro: { titulo: 'Cadastro', template: templateCadastro, depois: iniciarFormulario },
};

export function iniciarRotas() {
  // toda vez que o # da URL muda (clique num link do menu, voltar do navegador...)
  window.addEventListener('hashchange', carregarRota);
  carregarRota();
}

function carregarRota() {
  // "#/projetos/feira" vira ["projetos", "feira"]
  const partes = location.hash.replace('#/', '').split('/');
  const nome = partes[0] || 'inicio';
  const detalhe = partes[1];

  const app = document.getElementById('app');
  const rota = rotas[nome];

  if (rota) {
    app.innerHTML = rota.template();
    document.title = `Patas Amigas - ${rota.titulo}`;
    // algumas telas precisam de JS depois de aparecer (ex: eventos do formulário)
    if (rota.depois) {
      rota.depois();
    }
  } else {
    app.innerHTML = templateNaoEncontrado();
    document.title = 'Patas Amigas - Página não encontrada';
  }

  marcarLinkAtivo(nome);
  fecharMenu();

  // se veio pelo submenu (ex: #/projetos/feira), destaca o card e rola até ele
  const card = detalhe ? document.getElementById(detalhe) : null;
  if (card) {
    card.classList.add('destaque');
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  window.scrollTo(0, 0);
  // manda o foco pro conteúdo novo, assim o leitor de tela sabe que a tela mudou
  app.focus({ preventScroll: true });
}

function marcarLinkAtivo(nome) {
  document.querySelectorAll('.menu > li > a').forEach((link) => {
    if (link.getAttribute('href') === `#/${nome}`) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}
