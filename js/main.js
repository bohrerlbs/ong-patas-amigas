// Arquivo principal: só importa os módulos e inicia cada parte do site
import { iniciarMenu } from './modules/menu.js';
import { iniciarToast } from './modules/toast.js';
import { iniciarModal } from './modules/modal.js';
import { iniciarRotas } from './modules/rotas.js';
import { iniciarAcessibilidade } from './modules/acessibilidade.js';

iniciarAcessibilidade();
iniciarMenu();
iniciarToast();
iniciarModal();
iniciarRotas();
