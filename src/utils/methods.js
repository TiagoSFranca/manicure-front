import actionTypes from '@/store/actionTypes'
import moment from 'moment';
import i18nConstants from "@/i18n/constants";
import { MATERIAL_STATUS, SCHEDULE_STATUS } from './constants'

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

export const getScheduleStatusText = (idStatus) => {
  switch (idStatus) {
    case SCHEDULE_STATUS.LATE:
      return i18nConstants.SCHEDULE.STATUS.LATE;
    case SCHEDULE_STATUS.WITHOT_STOCK:
      return i18nConstants.SCHEDULE.STATUS.NEED_ITEMS;
    case SCHEDULE_STATUS.CANCELED:
      return i18nConstants.SCHEDULE.STATUS.CANCELED;
    case SCHEDULE_STATUS.FINISHED:
      return i18nConstants.SCHEDULE.STATUS.REALIZED;
    case SCHEDULE_STATUS.OK:
      return i18nConstants.SCHEDULE.STATUS.NO_PROBLEM;
    default:
      return i18nConstants.SCHEDULE.STATUS.NO_PROBLEM;
  }
}

export const getScheduleStatusColor = (idStatus) => {
  switch (idStatus) {
    case SCHEDULE_STATUS.LATE:
      return "error";
    case SCHEDULE_STATUS.WITHOT_STOCK:
      return "warning";
    case SCHEDULE_STATUS.CANCELED:
      return "grey";
    case SCHEDULE_STATUS.FINISHED:
      return "success";
    case SCHEDULE_STATUS.OK:
      return "blue";
    default:
      return "blue"
  }
}

export const checkDisabledCancelScheduleFromStatus = (idScheduleStatus) => {
  let ids = [SCHEDULE_STATUS.OK, SCHEDULE_STATUS.WITHOT_STOCK];
  return !ids.includes(idScheduleStatus);
}

export const getMaterialStatusColor = (idStatus) => {
  if (idStatus == MATERIAL_STATUS.OK)
    return "success";
  else if (idStatus == MATERIAL_STATUS.WARNING)
    return "warning";
  else return "error"
}

export const getMaterialStatusText = (idStatus) => {
  if (idStatus == MATERIAL_STATUS.OK)
    return i18nConstants.MATERIAL.STATUS.OK;
  else if (idStatus == MATERIAL_STATUS.WARNING)
    return i18nConstants.MATERIAL.STATUS.WARNING;
  else
    return i18nConstants.MATERIAL.STATUS.ERROR;
}

export const randomColor = () => {
  return `#${(Math.random() * 0xFFFFFF << 0).toString(16)}`;
}