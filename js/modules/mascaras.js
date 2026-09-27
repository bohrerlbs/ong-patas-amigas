// Máscaras: formatam o campo enquanto a pessoa digita

function soNumeros(valor) {
  return valor.replace(/\D/g, '');
}

// 12345678901 -> 123.456.789-01
export function mascaraCPF(valor) {
  let v = soNumeros(valor).slice(0, 11);
  v = v.replace(/(\d{3})(\d)/, '$1.$2');
  v = v.replace(/(\d{3})(\d)/, '$1.$2');
  v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  return v;
}

// 11912345678 -> (11) 91234-5678  |  1133334444 -> (11) 3333-4444
export function mascaraTelefone(valor) {
  const v = soNumeros(valor).slice(0, 11);
  if (v.length > 10) {
    return v.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  }
  if (v.length > 6) {
    return v.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
  }
  if (v.length > 2) {
    return v.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
  }
  if (v.length > 0) {
    return `(${v}`;
  }
  return v;
}

// 01310100 -> 01310-100
export function mascaraCEP(valor) {
  const v = soNumeros(valor).slice(0, 8);
  if (v.length > 5) {
    return v.replace(/^(\d{5})(\d{1,3})$/, '$1-$2');
  }
  return v;
}
