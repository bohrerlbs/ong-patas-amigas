// Formulário de cadastro: máscaras, validação com mensagens e salvar no localStorage
import { mascaraCPF, mascaraTelefone, mascaraCEP } from './mascaras.js';
import { validarCPF } from './validacoes.js';
import { salvarCadastro, cpfJaCadastrado, lerCadastros, salvarRascunho, lerRascunho, apagarRascunho } from './armazenamento.js';
import { mostrarToast } from './toast.js';
import { abrirModal } from './modal.js';
import { templateAlerta } from './templates.js';

// chamado pelo rotas.js toda vez que a tela de cadastro aparece
export function iniciarFormulario() {
  const form = document.getElementById('form-cadastro');

  aplicarMascara('cpf', mascaraCPF);
  aplicarMascara('telefone', mascaraTelefone);
  aplicarMascara('cep', mascaraCEP);

  // guarda a mensagem padrão de cada campo pra poder voltar pra ela depois
  form.querySelectorAll('.erro-msg').forEach((msg) => {
    msg.dataset.padrao = msg.textContent;
  });

  // valida o campo quando a pessoa sai dele (e não enquanto ainda tá digitando)
  form.querySelectorAll('input:not([type="radio"]):not([type="checkbox"]), select').forEach((campo) => {
    campo.addEventListener('blur', () => validarCampo(campo));
  });

  // radio e checkbox validam quando muda
  form.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach((campo) => {
    campo.addEventListener('change', () => validarCampo(campo));
  });

  document.getElementById('abrir-termos').addEventListener('click', abrirModal);
  form.addEventListener('submit', enviarFormulario);

  // rascunho: volta o que já tinha sido digitado e continua salvando a cada mudança
  restaurarRascunho(form);
  form.addEventListener('input', () => salvarRascunho(pegarDados(form)));
  form.addEventListener('change', () => salvarRascunho(pegarDados(form)));
}

// pega os dados do formulário e transforma num objeto (sem o checkbox dos termos)
function pegarDados(form) {
  const dados = Object.fromEntries(new FormData(form));
  delete dados.termos;
  return dados;
}

function restaurarRascunho(form) {
  const rascunho = lerRascunho();
  // se não tem rascunho ou se tá tudo vazio, não faz nada
  if (!rascunho || !Object.values(rascunho).some((valor) => valor !== '')) {
    return;
  }

  Object.entries(rascunho).forEach(([nome, valor]) => {
    const campo = form.elements[nome];
    if (campo) {
      // no radio, o form.elements devolve o grupo todo e o .value marca o certo
      campo.value = valor;
    }
  });

  document.getElementById('form-alerta').innerHTML = templateAlerta('info', 'Bem-vindo de volta!', 'Recuperamos o que você já tinha preenchido.');
}

function aplicarMascara(id, funcaoMascara) {
  const campo = document.getElementById(id);
  campo.addEventListener('input', () => {
    campo.value = funcaoMascara(campo.value);
  });
}

// devolve o texto do erro, ou '' se o campo estiver certo
function descobrirErro(campo) {
  const msg = campo.closest('.campo').querySelector('.erro-msg');

  if (!campo.checkValidity()) {
    return msg.dataset.padrao;
  }
  if (campo.id === 'cpf' && !validarCPF(campo.value)) {
    return 'Esse CPF não existe, confere os números.';
  }
  if (campo.id === 'cpf' && cpfJaCadastrado(campo.value)) {
    return 'Esse CPF já está cadastrado.';
  }
  return '';
}

// mostra ou esconde o erro de um campo e devolve true se estiver tudo certo
function validarCampo(campo) {
  const caixa = campo.closest('.campo');
  const msg = caixa.querySelector('.erro-msg');
  const erro = descobrirErro(campo);

  caixa.classList.toggle('com-erro', erro !== '');
  caixa.classList.toggle('ok', erro === '' && !caixa.classList.contains('grupo'));
  msg.textContent = erro || msg.dataset.padrao;

  // no radio o aria-invalid vai no primeiro, que é o que tem o aria-describedby
  campo.setAttribute('aria-invalid', erro !== '');

  return erro === '';
}

function enviarFormulario(evento) {
  // não deixa o navegador recarregar a página (é uma SPA)
  evento.preventDefault();

  const form = evento.target;
  const alerta = document.getElementById('form-alerta');

  // valida todos os campos obrigatórios (do radio, só o primeiro já basta)
  const campos = [...form.querySelectorAll('input[required], select[required]')]
    .filter((campo) => campo.type !== 'radio' || campo.id === 'voluntario');
  const comErro = campos.filter((campo) => !validarCampo(campo));

  if (comErro.length > 0) {
    alerta.innerHTML = templateAlerta('erro', 'Ops!', `Tem ${comErro.length} campo(s) com erro. Confira as mensagens em vermelho.`);
    comErro[0].focus();
    return;
  }

  alerta.innerHTML = '';

  const dados = pegarDados(form);
  dados.dataCadastro = new Date().toISOString();

  // desativa o botão enquanto "envia", pra pessoa não clicar duas vezes
  const botao = document.getElementById('botao-enviar');
  botao.disabled = true;
  botao.textContent = 'Enviando...';

  // simula o tempo que um servidor levaria pra responder
  setTimeout(() => {
    salvarCadastro(dados);
    apagarRascunho();

    const primeiroNome = dados.nome.split(' ')[0];
    mostrarToast(`Obrigado, ${primeiroNome}! Seu cadastro foi feito.`);

    form.reset();
    form.querySelectorAll('.campo').forEach((caixa) => caixa.classList.remove('ok', 'com-erro'));
    document.getElementById('total-cadastros').textContent = lerCadastros().length;

    botao.disabled = false;
    botao.textContent = 'Enviar cadastro';
  }, 800);
}
