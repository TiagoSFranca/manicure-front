import actionTypes from '@/store/actionTypes'
import moment from 'moment'

export const ToDecimal = (value) => {
  value = value || "";
  value = value.replace(".", "");
  value = value.replace(",", ".");
  return Number(value);
}

export const ToCurrency = (value, showEmpty = true, removePrefix = true) => {
  if (showEmpty && !value) {
    return "";
  }
  value = value || "0";

  let newValue = value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return removePrefix ? newValue.replace(/R\$/g, "").trim() : newValue;
}

export const startLoading = (identifier) => ({ type: actionTypes.APP_LOADING, loading: { [identifier]: true } });

export const endLoading = (identifier) => ({ type: actionTypes.APP_LOADING, loading: { [identifier]: false } });

export const formatDate = (date, formatter = "DD/MM/YYYY") => moment(date).format(formatter)