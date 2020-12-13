import actionTypes from '@/store/actionTypes'
import moment from 'moment';
import i18nConstants from "@/i18n/constants";
import { SCHEDULE_STATUS } from './constants'

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

export const getScheduleStatusText = (idStatus, date) => {
  if (
    (idStatus == 1 || idStatus == 4) &&
    !moment(date).isAfter(moment(), "day")
  )
    return i18nConstants.SCHEDULE.STATUS.LATE;
  if (idStatus == 1 || idStatus == 4)
    return i18nConstants.SCHEDULE.STATUS.NO_PROBLEM;
  else if (idStatus == 2) return i18nConstants.SCHEDULE.STATUS.NEED_ITEMS;
  else if (idStatus == 3) return i18nConstants.SCHEDULE.STATUS.CANCELED;
  else if (idStatus == 5) return i18nConstants.SCHEDULE.STATUS.REALIZED;
}

export const getScheduleStatusColor = (idStatus, date) => {
  if (
    (idStatus == 1 || idStatus == 4) &&
    !moment(date).isAfter(moment(), "day")
  )
    return "error";
  if (idStatus == 1 || idStatus == 4)
    return "blue";
  else if (idStatus == 2) return "warning";
  else if (idStatus == 3) return "grey";
  else if (idStatus == 5) return "success";
  return "blue";
}

export const checkDisabledCancelScheduleFromStatus = (idScheduleStatus) => {
  let ids = [SCHEDULE_STATUS.OPENED, SCHEDULE_STATUS.OPENED_WITHOT_STOCK];
  return !ids.includes(idScheduleStatus);
}