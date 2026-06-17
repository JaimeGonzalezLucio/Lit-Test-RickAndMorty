import { html, LitElement, css } from 'lit'
import { repeat } from 'lit/directives/repeat.js'

import { getData } from '../services/apiRequest.js'
import { Loader } from './character-loader.js'

import { CharacterCard } from '../components/character-card.js'
import { PlaceholderCards } from './placeholder-cards.js'
import { SearchFields } from './search-fields.js'

class LayoutCharacters extends LitElement{

    constructor(){
        super()  
        this.results = []
        this.errorMessage = ''
        this.loading = true
    }

    static styles = [
        css`
            .layout{
                display: flex;
                align-items:center;
                justify-content: center;
                gap:1rem;
                flex-wrap: wrap;
                margin-top:2rem
            }

            .text-danger{
                color: red
            }
        `
    ]

    static properties = {
        results: { type: Array },
        loading: { type: Boolean },
        errorMessage: { type: String }
    }

    async firstUpdated() {                
        try {
            const resp = await getData()
            this.results = resp.data
            this.errorMessage= resp.message            
        } catch (error) {         
            this.errorMessage = error.message
        }finally{
            this.loading = false
        }
    }

    render(){        

        if(this.errorMessage){
            return html`
                <h1 class="text-danger">${this.errorMessage}</h1>
            `
        }

        if(this.loading){
            return html`
                <custom-loader></custom-loader>
                <div class="layout">
                    ${Array.from({ length : 8 }).map(() => html`<placeholder-cards></placeholder-cards>`)}
                </div>
            `
        }        

        if (!this.results?.length) {
            return html`
                <h2>No se encontraron personajes</h2>
            `;
        }

        return html`        
            <search-fields></search-fields>        
            <div class="layout">
                ${repeat(this.results, (item)=> item.id, (item)=>html`<character-card .character=${item}></character-card>`)}
            </div>
        `
    }

}

customElements.define('layout-characters', LayoutCharacters)