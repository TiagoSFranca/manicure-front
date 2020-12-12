import Vue from 'vue';
import VueI18n from 'vue-i18n';
import ptBr from '@/i18n/pt-br'

Vue.use(VueI18n);

const messages = { 'en': { welcomeMsg: 'Welcome to Your Vue.js App' }, 'pt-br': ptBr };

export default new VueI18n({
  locale: 'pt-br', // set locale    
  fallbackLocale: 'pt-br', // set fallback locale    
  messages, // set locale messages
});