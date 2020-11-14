export const products = [
    {
        id: 1,
        name: 'TESTE',
        originalValue: 32,
        saleValue: 55,
        onSale: true,
        endSale: new Date(2020, 10, 5).toJSON(),
        active: true,
        comments: 'NCAONDOWQNUN NAODNIWQN '
    }, {
        id: 2,
        name: 'TESTE_02',
        originalValue: 32,
        saleValue: 55,
        onSale: false,
        endSale: new Date(2020, 11, 10).toJSON(),
        active: false,
        comments: 'NCAONDOWQNUN '
    }
]

export const combos = [
    {
        id: 1,
        name: "COMBO APOCALIPSE NOME GIGANTE PRA CARALHO MAIOR AINDA POIS FICOU PEQUENO",
        description: "COISAS E MAIS COISAS"
    },
    {
        id: 2,
        name: "COMBO APOCALIPSE NOME GIGANTE PRA CARALHO MAIOR AINDA POIS FICOU PEQUENO",
        description: "COISAS E MAIS COISAS"
    },
    {
        id: 3,
        name: "COMBO APOCALIPSE NOME GIGANTE PRA CARALHO MAIOR AINDA POIS FICOU PEQUENO",
        description: "COISAS E MAIS COISAS"
    }
]

export default {
    products,
    combos
}