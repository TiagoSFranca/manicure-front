import { paginacao } from '@/utils/constants/'

export const ToDecimal = (value) => {
    value = value || "";
    value = value.replace(".", "");
    value = value.replace(",", ".");
    return Number(value);
}


export const mountPaginationQuery = (filtro) => {
    let query = ''
    if (filtro) {
        if (filtro.itensPorPagina)
            query += "&itensPorPagina=" + filtro.itensPorPagina
        else
            query += "&itensPorPagina=" + paginacao.MINIMO
        if (filtro.pagina)
            query += "&pagina=" + filtro.pagina
        else
            query += "&pagina=" + 1
    }
    else {
        query += "&itensPorPagina=" + paginacao.MINIMO
        query += "&pagina=" + 1
    }
    return query
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