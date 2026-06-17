import { normalizeCharacters } from "../models/normalizeCharacters.js"
import { ErrorManagement } from "./errorService.js"
import { buildFilter } from "./filterService.js"

const urlBase= 'https://rickandmortyapi.com/api'

export async function getData(params = {}, signal = null) {     
           
    try {
        const resp = await fetch(urlBase + `/character${buildFilter(params)}`, { signal })                

        if (!resp.ok) {
            return { data: [] , message: ErrorManagement(resp.status) }            
        }

        const data = await resp.json()
        return { data: normalizeCharacters(data.results), message:'' }

    } catch (error) {
        throw new Error(error.message);
    }  
}
