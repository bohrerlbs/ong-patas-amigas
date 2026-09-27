// Modal dos termos: usa a tag <dialog>, que já prende o foco dentro dela
// e fecha com a tecla Esc sozinha
const modal = document.getElementById('modal-termos');

export function iniciarModal() {
  modal.querySelector('.modal-fechar').addEventListener('click', fecharModal);
  modal.querySelector('.modal-ok').addEventListener('click', fecharModal);

  // clicar no fundo escuro (fora da caixa) também fecha
  modal.addEventListener('click', (evento) => {
    if (evento.target === modal) {
      fecharModal();
    }
  });
}

export function abrirModal() {
  modal.showModal();
}

function fecharModal() {
  modal.close();
}
