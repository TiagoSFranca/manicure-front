import i18n from '@/plugins/i18n';
import i18nConstants from '@/i18n/constants';

export const clientId = "vue"

export const paginacao = {
  MINIMO: 6,
  MEDIO: 12,
  MAXIMO: 18,
}

export const SCHEDULE_STATUS = {
  FINISHED: 1,
  CANCELED: 2,
  LATE: 3,
  WITHOT_STOCK: 4,
  OK: 5,
}

export const MATERIAL_STATUS = {
  OK: 1,
  WARNING: 2,
  ERROR: 3
}

export const MATERIAL_SCHEDULE_STATUS = {
  REGISTER: 1,
  REMOVE: 2,
  LIST: [
    {
      label: "REGISTER",
      value: 1
    },
    {
      label: "REMOVE",
      value: 2
    },
  ]
}

export const AGENDA_TYPES = {
  MONTH: {
    label: i18n.t(i18nConstants.AGENDA.TYPES.MONTH),
    value: "month"
  },
  WEEK: {
    label: i18n.t(i18nConstants.AGENDA.TYPES.WEEK),
    value: "week"
  },
  DAY: {
    label: i18n.t(i18nConstants.AGENDA.TYPES.DAY),
    value: "day"
  },
}