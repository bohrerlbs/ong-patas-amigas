// Arquivo principal: só importa os módulos e inicia cada parte do site
import { iniciarMenu } from './modules/menu.js';
import { iniciarToast } from './modules/toast.js';
import { iniciarModal } from './modules/modal.js';
import { iniciarRotas } from './modules/rotas.js';

iniciarMenu();
iniciarToast();
iniciarModal();
iniciarRotas();
