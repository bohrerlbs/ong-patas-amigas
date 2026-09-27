// Templates: cada função devolve o HTML (em texto) de uma tela ou de um pedaço dela.
// O rotas.js pega esse texto e coloca dentro do <main id="app">.
import { projetos, estados } from './dados.js';
import { lerCadastros } from './armazenamento.js';

// ---------- componentes reaproveitáveis ----------

export function templateBadge(badge) {
  return `<span class="badge badge-${badge.tipo}">${badge.texto}</span>`;
}

export function templateCard(projeto) {
  return `
    <article class="card col-12 col-md-6 col-lg-4" id="${projeto.id}">
      <h3>${projeto.titulo}</h3>
      <div class="badges">
        ${projeto.badges.map(templateBadge).join('')}
      </div>
      <p>${projeto.descricao}</p>
    </article>
  `;
}

export function templateAlerta(tipo, titulo, texto) {
  return `
    <div class="alerta alerta-${tipo}">
      <strong>${titulo}</strong> ${texto}
    </div>
  `;
}

// campo de texto com label e mensagem de erro (usado várias vezes no cadastro)
function templateCampo({ id, label, tipo = 'text', erro, extras = '' }) {
  return `
    <div class="campo">
      <label for="${id}">${label} *</label>
      <input type="${tipo}" id="${id}" name="${id}" aria-describedby="erro-${id}" ${extras} required>
      <span class="erro-msg" id="erro-${id}">${erro}</span>
    </div>
  `;
}

// ---------- telas ----------

export function templateInicio() {
  return `
    <h1 class="titulo-destaque">Patas Amigas</h1>
    <p>Resgatando e cuidando de cães e gatos abandonados desde 2015.</p>

    <section>
      <h2>Sobre nós</h2>
      <div class="grid">
        <img class="col-12 col-md-6" src="../img/resgate.png" alt="Voluntária segurando um filhote de cachorro caramelo no colo, ao lado de um gato cinza" width="600" height="400">
        <p class="col-12 col-md-6">A Patas Amigas é uma ONG sem fins lucrativos que começou com um grupo de vizinhos cuidando dos animais abandonados do bairro. Hoje a gente tem um abrigo temporário e vários lares provisórios.</p>
      </div>
    </section>

    <div class="grid">
      <section class="card col-12 col-md-6 col-lg-4">
        <h2>Missão</h2>
        <p>Diminuir o abandono de animais através do resgate, da castração e da adoção responsável.</p>
      </section>

      <section class="card col-12 col-md-6 col-lg-4">
        <h2>Como ajudar</h2>
        <p>Você pode ser voluntário, lar temporário ou doar ração e remédios.</p>
        <p class="acao"><a class="botao" href="#/cadastro">Quero ajudar</a></p>
      </section>

      <section class="card col-12 col-md-6 col-lg-4">
        <h2>Contato</h2>
        <address>
          <p>Rua das Acácias, 123 - Vila Esperança, São Paulo - SP</p>
          <p>Telefone: (11) 91234-5678</p>
          <p>E-mail: <a href="mailto:contato@patasamigas.org.br">contato@patasamigas.org.br</a></p>
        </address>
      </section>
    </div>
  `;
}

export function templateProjetos() {
  return `
    <h1>Nossos Projetos</h1>
    <p>Conheça o que a gente faz e veja como você pode participar.</p>

    ${templateAlerta('aviso', 'Atenção:', 'estamos precisando muito de ração para gatos filhotes. Se puder ajudar, veja a parte de doação no final da página.')}

    <section>
      <h2>Projetos em andamento</h2>
      <div class="grid">
        ${projetos.map(templateCard).join('')}
      </div>
    </section>

    <div class="grid">
      <section class="col-12 col-lg-6">
        <h2>Seja voluntário</h2>
        <p>Precisamos de ajuda em várias áreas:</p>
        <ul>
          <li>Cuidar dos animais no abrigo (limpeza, alimentação e passeios)</li>
          <li>Ajudar nas feiras de adoção</li>
          <li>Ser lar temporário</li>
          <li>Transporte de animais para o veterinário</li>
        </ul>
        <p><a class="botao" href="#/cadastro">Quero ser voluntário</a></p>
      </section>

      <section class="col-12 col-lg-6">
        <h2>Faça uma doação</h2>
        <h3>Doação em dinheiro</h3>
        <p>Qualquer valor ajuda a pagar ração, vacinas e consultas. Você pode doar pelo Pix: <strong>doacao@patasamigas.org.br</strong></p>

        <h3>Doação de itens</h3>
        <ul>
          <li>Ração para cães e gatos</li>
          <li>Remédios e vermífugos</li>
          <li>Cobertores e caminhas</li>
          <li>Produtos de limpeza</li>
        </ul>
        <p>As doações de itens podem ser entregues no nosso endereço, de segunda a sábado das 9h às 17h.</p>
      </section>
    </div>
  `;
}

export function templateCadastro() {
  const total = lerCadastros().length;

  return `
    <h1>Seja Voluntário</h1>
    <p>Preencha o formulário abaixo para se cadastrar como voluntário ou doador. Os campos com * são obrigatórios.</p>
    <p class="contador">Já temos <strong id="total-cadastros">${total}</strong> pessoa(s) cadastrada(s) pra ajudar.</p>

    ${templateAlerta('info', 'Fica tranquilo:', 'seus dados são usados só pela Patas Amigas pra entrar em contato com você.')}

    <!-- o alerta de erro aparece aqui quando o envio dá errado -->
    <div id="form-alerta" tabindex="-1"></div>

    <form id="form-cadastro" novalidate>
      <fieldset>
        <legend>Dados pessoais</legend>
        ${templateCampo({ id: 'nome', label: 'Nome completo', erro: 'Digite seu nome completo (pelo menos 3 letras).', extras: 'minlength="3" maxlength="100" autocomplete="name"' })}
        ${templateCampo({ id: 'email', label: 'E-mail', tipo: 'email', erro: 'Digite um e-mail válido, tipo nome@exemplo.com.', extras: 'placeholder="seuemail@exemplo.com" autocomplete="email"' })}
        ${templateCampo({ id: 'cpf', label: 'CPF', erro: 'Digite o CPF no formato 000.000.000-00.', extras: 'placeholder="000.000.000-00" pattern="[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}-[0-9]{2}" maxlength="14" inputmode="numeric"' })}
        ${templateCampo({ id: 'nascimento', label: 'Data de nascimento', tipo: 'date', erro: 'Escolha uma data de nascimento válida.', extras: 'min="1920-01-01" max="2010-12-31"' })}
        ${templateCampo({ id: 'telefone', label: 'Telefone', tipo: 'tel', erro: 'Digite o telefone no formato (00) 00000-0000.', extras: 'placeholder="(00) 00000-0000" pattern="\\([0-9]{2}\\) [0-9]{4,5}-[0-9]{4}" maxlength="15" autocomplete="tel"' })}
      </fieldset>

      <fieldset>
        <legend>Endereço</legend>
        ${templateCampo({ id: 'cep', label: 'CEP', erro: 'Digite o CEP no formato 00000-000.', extras: 'placeholder="00000-000" pattern="[0-9]{5}-[0-9]{3}" maxlength="9" inputmode="numeric" autocomplete="postal-code"' })}
        ${templateCampo({ id: 'endereco', label: 'Endereço', erro: 'Digite seu endereço.', extras: 'placeholder="Rua, número e complemento" autocomplete="street-address"' })}
        ${templateCampo({ id: 'cidade', label: 'Cidade', erro: 'Digite sua cidade.' })}

        <div class="campo">
          <label for="estado">Estado *</label>
          <select id="estado" name="estado" aria-describedby="erro-estado" required>
            <option value="">Selecione</option>
            ${estados.map(([sigla, nome]) => `<option value="${sigla}">${nome}</option>`).join('')}
          </select>
          <span class="erro-msg" id="erro-estado">Selecione seu estado.</span>
        </div>
      </fieldset>

      <fieldset>
        <legend>Como você quer ajudar?</legend>

        <div class="campo grupo">
          <div class="opcoes">
            <div class="opcao">
              <input type="radio" id="voluntario" name="tipo_ajuda" value="voluntario" aria-describedby="erro-tipo_ajuda" required>
              <label for="voluntario">Quero ser voluntário</label>
            </div>
            <div class="opcao">
              <input type="radio" id="doador" name="tipo_ajuda" value="doador">
              <label for="doador">Quero ser doador</label>
            </div>
            <div class="opcao">
              <input type="radio" id="lar" name="tipo_ajuda" value="lar_temporario">
              <label for="lar">Quero ser lar temporário</label>
            </div>
          </div>
          <span class="erro-msg" id="erro-tipo_ajuda">Escolha uma forma de ajudar.</span>
        </div>

        <div class="campo">
          <label for="mensagem">Conte um pouco sobre você (opcional)</label>
          <textarea id="mensagem" name="mensagem" rows="4" maxlength="500"></textarea>
        </div>
      </fieldset>

      <div class="campo grupo">
        <div class="opcao">
          <input type="checkbox" id="termos" name="termos" aria-describedby="erro-termos" required>
          <label for="termos">Concordo em compartilhar meus dados com a ONG Patas Amigas *</label>
        </div>
        <span class="erro-msg" id="erro-termos">Você precisa concordar com os termos pra continuar.</span>
      </div>
      <p><button type="button" class="link-botao" id="abrir-termos">Ler os termos de uso dos dados</button></p>

      <button class="botao" type="submit" id="botao-enviar">Enviar cadastro</button>
    </form>
  `;
}

export function templateNaoEncontrado() {
  return `
    <h1>Página não encontrada</h1>
    <p>Essa página não existe. Que tal voltar pro <a href="#/inicio">início</a>?</p>
  `;
}
