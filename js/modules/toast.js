// Toast: notificação que aparece no canto da tela e some sozinha
const toast = document.getElementById('toast');
const texto = document.getElementById('toast-texto');
let temporizador;

export function iniciarToast() {
  toast.querySelector('.toast-fechar').addEventListener('click', esconderToast);
}

export function mostrarToast(mensagem) {
  texto.textContent = mensagem;
  toast.classList.add('visivel');

  // se já tinha um toast aberto, reinicia o tempo
  clearTimeout(temporizador);
  temporizador = setTimeout(esconderToast, 5000);
}

function esconderToast() {
  toast.classList.remove('visivel');
}
