// Tudo que mexe com o localStorage fica aqui
const CHAVE = 'patasAmigas.cadastros';

export function lerCadastros() {
  try {
    // o localStorage só guarda texto, então salvo a lista em JSON
    return JSON.parse(localStorage.getItem(CHAVE)) || [];
  } catch {
    // se o JSON estiver quebrado ou o navegador bloquear, começa com lista vazia
    return [];
  }
}

export function salvarCadastro(cadastro) {
  const lista = lerCadastros();
  lista.push(cadastro);
  localStorage.setItem(CHAVE, JSON.stringify(lista));
}

export function cpfJaCadastrado(cpf) {
  return lerCadastros().some((cadastro) => cadastro.cpf === cpf);
}

// ---------- rascunho do formulário ----------
// guarda o que a pessoa já digitou, pra não perder se recarregar ou fechar a aba
const CHAVE_RASCUNHO = 'patasAmigas.rascunho';

export function salvarRascunho(dados) {
  localStorage.setItem(CHAVE_RASCUNHO, JSON.stringify(dados));
}

export function lerRascunho() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE_RASCUNHO));
  } catch {
    return null;
  }
}

export function apagarRascunho() {
  localStorage.removeItem(CHAVE_RASCUNHO);
}

// ---------- preferência de alto contraste ----------
const CHAVE_CONTRASTE = 'patasAmigas.altoContraste';

// devolve true, false ou null (quando a pessoa ainda não escolheu)
export function lerPreferenciaContraste() {
  const valor = localStorage.getItem(CHAVE_CONTRASTE);
  return valor === null ? null : valor === 'true';
}

export function salvarPreferenciaContraste(ligado) {
  localStorage.setItem(CHAVE_CONTRASTE, ligado);
}
