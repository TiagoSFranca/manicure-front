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
  OPENED: 1,
  OPENED_WITHOT_STOCK: 2,
  CANCELED: 3,
  FINISHED: 4
}
