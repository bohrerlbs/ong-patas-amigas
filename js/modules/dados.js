// Lista dos projetos da ONG.
// Os cards da tela de projetos são montados a partir daqui (templates.js),
// então pra colocar um projeto novo é só adicionar um objeto nessa lista.
export const projetos = [
  {
    id: 'resgate',
    titulo: 'Resgate Responsável',
    descricao: 'Resgatamos animais abandonados ou em situação de risco, levamos ao veterinário e cuidamos deles até estarem prontos para adoção.',
    badges: [
      { texto: 'Em andamento', tipo: 'sucesso' },
      { texto: 'Precisa de voluntários', tipo: 'aviso' },
    ],
  },
  {
    id: 'castracao',
    titulo: 'Castração Solidária',
    descricao: 'Mutirões de castração a preço social para quem não tem condições de pagar, ajudando a diminuir o número de animais nas ruas.',
    badges: [
      { texto: 'Em andamento', tipo: 'sucesso' },
      { texto: 'Mensal', tipo: 'info' },
    ],
  },
  {
    id: 'feira',
    titulo: 'Feira de Adoção',
    descricao: 'Todo segundo sábado do mês fazemos uma feira de adoção na praça do bairro com os animais que já estão vacinados e castrados.',
    badges: [
      { texto: 'Em andamento', tipo: 'sucesso' },
      { texto: '2º sábado do mês', tipo: 'info' },
    ],
  },
];

// Estados do select do formulário
export const estados = [
  ['AC', 'Acre'], ['AL', 'Alagoas'], ['AP', 'Amapá'], ['AM', 'Amazonas'],
  ['BA', 'Bahia'], ['CE', 'Ceará'], ['DF', 'Distrito Federal'], ['ES', 'Espírito Santo'],
  ['GO', 'Goiás'], ['MA', 'Maranhão'], ['MT', 'Mato Grosso'], ['MS', 'Mato Grosso do Sul'],
  ['MG', 'Minas Gerais'], ['PA', 'Pará'], ['PB', 'Paraíba'], ['PR', 'Paraná'],
  ['PE', 'Pernambuco'], ['PI', 'Piauí'], ['RJ', 'Rio de Janeiro'], ['RN', 'Rio Grande do Norte'],
  ['RS', 'Rio Grande do Sul'], ['RO', 'Rondônia'], ['RR', 'Roraima'], ['SC', 'Santa Catarina'],
  ['SP', 'São Paulo'], ['SE', 'Sergipe'], ['TO', 'Tocantins'],
];
