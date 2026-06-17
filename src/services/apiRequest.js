import { normalizeCharacters } from "../models/normalizeCharacters.js"
import { ErrorManagement } from "./errorService.js"
import { buildFilter } from "./filterService.js"

const urlBase= 'https://rickandmortyapi.com/api'

export async function getData(params = {}, signal = null) {     
    const currentPage = Number(params.page ?? 1) || 1
           
    try {
        const resp = await fetch(urlBase + `/character${buildFilter(params)}`, { signal })                

        if (!resp.ok) {
            return {
                data: [],
                info: {
                    count: 0,
                    pages: 0,
                    next: null,
                    prev: null,
                    currentPage
                }, message: ErrorManagement(resp.status)
            }
        }

        const data = await resp.json()
        return {
            data: normalizeCharacters(data.results),
            info: { ...data.info, currentPage }, message:''
        }

    } catch (error) {
        throw new Error(error.message);
    }  
}
