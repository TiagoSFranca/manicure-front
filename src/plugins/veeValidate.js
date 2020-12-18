import Vue from 'vue';
import { ValidationProvider, extend, ValidationObserver } from 'vee-validate';
import { required, email, max, max_value, length, min } from 'vee-validate/dist/rules';
import { ToDecimal } from '@/utils/methods'

// Add a rule.
extend('greater_than', {
  params: ["compare"],
  validate: (value, { compare }) => {
    let compareNumb = ToDecimal(compare)
    return (value ? value : 0) > compareNumb
  },
  message: 'Valor deve ser maior que {compare}'
});
extend('greater_than_or_equal', {
  params: ["compare"],
  validate: (value, { compare }) => {
    let compareNumb = ToDecimal(compare)
    return (value ? value : 0) >= compareNumb
  },
  message: 'Valor deve ser maior ou igual a {compare}'
});
extend('lower_than_other', {
  params: ["compare", "other"],
  validate: (value, { compare }) => {
    let compareNumb = parseFloat(compare)
    return (value ? value : 0) < compareNumb
  },
  message: 'Valor deve ser menor que {other}'
});

// Override the default message.
extend('required', {
  ...required,
  message: 'Campo obrigatório'
});

extend('email', {
  ...email,
  message: 'Formato de e-mail inválido'
});

extend('max', {
  ...max,
  message: "Máximo de {length} characteres"
});

extend('max_value', {
  ...max_value,
  message: "Máximo de {max} characteres"
});

extend('length', {
  ...length,
  message: "Necessário {length} characteres"
});

extend('min', {
  ...min,
  message: "Mínimo de {length} characteres"
});
// Register it globally
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);