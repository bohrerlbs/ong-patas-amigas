# 🐾 ONG Patas Amigas

Site da **Patas Amigas**, uma ONG fictícia de resgate, castração e adoção de cães e gatos. O projeto foi feito na disciplina de **Desenvolvimento Front-End para Web** e foi evoluindo a cada experiência prática:

| Etapa | O que foi feito |
|---|---|
| Exp. I | Estrutura em HTML5 semântico (3 páginas e formulário com validação nativa) |
| Exp. II | Estilização com CSS3: design system em variáveis, Grid de 12 colunas, Flexbox e componentes |
| Exp. III | JavaScript: SPA, templates dinâmicos, validação do formulário e localStorage |
| Exp. IV | Git/GitHub, acessibilidade (WCAG 2.1 AA), otimização e deploy |

## Funcionalidades

- **Página única (SPA)**: Início, Projetos e Cadastro trocam de tela sem recarregar a página
- **Cards dos projetos gerados pelo JavaScript** a partir de uma lista de dados
- **Formulário de cadastro** de voluntários e doadores com:
  - máscara de CPF, telefone e CEP enquanto a pessoa digita
  - validação com mensagem de erro em cada campo
  - conferência dos dígitos verificadores do CPF e de CPF já cadastrado
  - rascunho salvo automaticamente (não perde o que digitou se recarregar a página)
- **Cadastros salvos no localStorage** do navegador
- Menu responsivo com dropdown no computador e menu hambúrguer no celular
- Modal, alertas, badges e notificação (toast)
- Layout responsivo do celular até telas grandes

## Tecnologias

- HTML5
- CSS3 (variáveis, Grid e Flexbox)
- JavaScript puro (ES6 Modules), sem bibliotecas externas

## Estrutura de pastas

```
ong-patas-amigas/
├── html/
│   └── index.html          página única da aplicação
├── css/
│   ├── reset.css           zera os estilos padrão do navegador
│   ├── variaveis.css       design system (cores, fontes, espaçamentos)
│   └── style.css           estilos dos componentes e layout
├── img/
│   └── resgate.png
└── js/
    ├── main.js             arquivo principal, inicia os módulos
    └── modules/
        ├── rotas.js        navegação da SPA pelo hash (#/inicio, #/projetos...)
        ├── templates.js    HTML de cada tela e dos componentes
        ├── dados.js        lista de projetos e de estados
        ├── formulario.js   eventos e validação do cadastro
        ├── mascaras.js     máscaras de CPF, telefone e CEP
        ├── validacoes.js   validação dos dígitos do CPF
        ├── armazenamento.js tudo que usa o localStorage
        ├── menu.js         menu hambúrguer
        ├── modal.js        modal dos termos
        └── toast.js        notificação
```

## Pré-requisitos

- [Git](https://git-scm.com/) pra clonar o repositório
- Um navegador atualizado (Chrome, Firefox ou Edge)
- [VS Code](https://code.visualstudio.com/) com a extensão **Live Server**, ou qualquer outro servidor local

O projeto não tem dependências pra instalar (não usa npm nem bibliotecas externas).

## Como rodar o projeto

Como o JavaScript usa `import` e `export`, o site precisa ser aberto por um servidor local (abrindo o arquivo direto com dois cliques os módulos são bloqueados pelo navegador).

1. Clone o repositório:
   ```bash
   git clone https://github.com/bohrerlbs/ong-patas-amigas.git
   ```
2. Abra a pasta no **VS Code** e instale a extensão **Live Server** (Ritwick Dey).
3. Clique com o botão direito em `html/index.html` e escolha **Open with Live Server**.

## Como usar

- Navegue pelo menu entre **Início**, **Projetos** e **Cadastro**.
- No submenu de Projetos, cada link leva direto pro card do projeto.
- Em **Cadastro**, preencha o formulário. Os campos com erro ficam vermelhos com a explicação embaixo. Quando der certo aparece uma notificação no canto da tela e o contador de cadastros aumenta.
- Os dados ficam salvos no navegador. Pra ver: `F12 → Application → Local Storage`, chaves `patasAmigas.cadastros` e `patasAmigas.rascunho`.

## Manutenção

- **Adicionar um projeto novo:** coloque mais um objeto na lista `projetos` em `js/modules/dados.js`. O card é criado sozinho.
- **Trocar cores, fontes ou espaçamentos:** mude as variáveis em `css/variaveis.css`.
- **Criar uma tela nova:** crie a função do template em `templates.js` e adicione a rota no objeto `rotas` em `rotas.js`.
- **Mudar uma regra de validação:** os atributos (`required`, `pattern`...) ficam no `templateCadastro()` e as regras extras em `formulario.js` e `validacoes.js`.

## Fluxo de trabalho (Git)

O repositório segue o **GitFlow**:

- `main`: versão estável, que vai pro ar
- `develop`: onde as funcionalidades são juntadas e testadas
- `feature/nome-da-melhoria`: uma branch pra cada melhoria, que entra na `develop` por pull request

Os commits seguem o padrão de **commits semânticos**:

| Prefixo | Uso |
|---|---|
| `feat:` | nova funcionalidade |
| `fix:` | correção de bug |
| `docs:` | documentação |
| `style:` | mudança visual/CSS sem alterar lógica |
| `refactor:` | reorganização de código sem mudar o comportamento |
| `chore:` | configuração e tarefas gerais |

## Autor

Leonardo Bohrer
