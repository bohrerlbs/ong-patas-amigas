// Menu hambúrguer do celular: abre e fecha o nav quando clica no botão
const botao = document.querySelector('.menu-botao');
const nav = document.getElementById('menu-principal');

export function iniciarMenu() {
  botao.addEventListener('click', () => {
    const aberto = nav.classList.toggle('aberto');
    botao.setAttribute('aria-expanded', aberto);
  });

  // fecha com a tecla Esc
  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape') {
      fecharMenu();
    }
  });
}

export function fecharMenu() {
  nav.classList.remove('aberto');
  botao.setAttribute('aria-expanded', 'false');
}
