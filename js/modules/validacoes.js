// Validações que o HTML sozinho não consegue fazer

// Confere os 2 dígitos verificadores do CPF (o pattern só confere o formato)
export function validarCPF(cpf) {
  const n = cpf.replace(/\D/g, '');

  // precisa ter 11 números e não pode ser tudo igual (111.111.111-11 passa na conta mas não existe)
  if (n.length !== 11 || /^(\d)\1{10}$/.test(n)) {
    return false;
  }

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += Number(n[i]) * (10 - i);
  }
  let digito1 = (soma * 10) % 11;
  if (digito1 === 10) digito1 = 0;
  if (digito1 !== Number(n[9])) {
    return false;
  }

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += Number(n[i]) * (11 - i);
  }
  let digito2 = (soma * 10) % 11;
  if (digito2 === 10) digito2 = 0;

  return digito2 === Number(n[10]);
}
