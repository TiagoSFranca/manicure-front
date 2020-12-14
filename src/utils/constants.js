export const clientId = "vue"

export const paginacao = {
  MINIMO: 6,
  MEDIO: 12,
  MAXIMO: 18,
}

export const paginacaoList = {
  paginacao: [
    {
      text: paginacao.MINIMO + ' Itens',
      value: paginacao.MINIMO
    },
    {
      text: paginacao.MEDIO + ' Itens',
      value: paginacao.MEDIO
    },
    {
      text: paginacao.MAXIMO + ' Itens',
      value: paginacao.MAXIMO
    }
  ]
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
