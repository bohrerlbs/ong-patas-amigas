// Recursos de acessibilidade que não são de nenhuma tela específica

export function iniciarAcessibilidade() {
  iniciarPularConteudo();
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
