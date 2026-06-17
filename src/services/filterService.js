export function buildFilter(params={}){

    const validParams = Object.fromEntries(Object.entries(params).filter(param=> param[1] != '' && param[1] != null && param[1] != undefined))

    const queryString = new URLSearchParams(validParams).toString()
    return queryString ? `?${queryString}` : ''
}
