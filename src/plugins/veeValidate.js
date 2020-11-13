import Vue from 'vue';
import { ValidationProvider, extend, ValidationObserver } from 'vee-validate';
import { required, email, max, max_value } from 'vee-validate/dist/rules';
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

extend('max', {
    ...max,
    message: "Máximo de {length} characteres"
});

extend('max_value', {
    ...max_value,
    message: "Máximo de {max} characteres"
});

// Register it globally
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);