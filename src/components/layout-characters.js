import { html, LitElement, css } from 'lit'
import { repeat } from 'lit/directives/repeat.js'

import { getData } from '../services/apiRequest.js'
import { Loader } from './character-loader.js'

import { CharacterCard } from '../components/character-card.js'
import { PlaceholderCards } from './placeholder-cards.js'
import { SearchFields } from './search-fields.js'
import { normalizeFavoriteCharacters } from '../models/normalizeFavoriteCharacters.js'
import { favorites_changed_event, storage } from '../services/storageService.js'
class LayoutCharacters extends LitElement{

    constructor(){
        super()  
        this.results = []
        this.errorMessage = ''
        this.loading = true
        this.abortController = null

        this.favoritesCount = storage.getFavoriteCharactersCount()
        this.favoritesCards = false
        this.handleFavoritesChanged = this.handleFavoritesChanged.bind(this)
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

            .header{
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
                flex-wrap:wrap;
            }

            .btn-favorites{
                background-color: #000000; 
                color: white; 
                padding: 12px 24px; 
                font-size: 1.2rem;
                border: none; 
                border-radius: 8px; 
                cursor: pointer; 
                transition: background-color 0.3s ease, transform 0.2s ease; 
            }
        `
    ]

    static properties = {
        results: { type: Array },
        loading: { type: Boolean },
        errorMessage: { type: String },
        favoritesCount: { type : Number},
        favoritesCards: { type: Boolean }
    }

    connectedCallback() {
        super.connectedCallback()
        storage.addEventListener(favorites_changed_event, this.handleFavoritesChanged)
    }

    disconnectedCallback() {
        storage.removeEventListener(favorites_changed_event, this.handleFavoritesChanged)
        super.disconnectedCallback()
    }

    async firstUpdated() {                
        await this.loadCharacters()
    }

    async loadCharacters(filters = {}) {
        if (this.abortController) {
            this.abortController.abort()
        }

        const controller = new AbortController()
        this.abortController = controller
        this.loading = true
        this.errorMessage = ''

        try {
            const resp = await getData(filters, controller.signal)

            if (this.abortController !== controller) {
                return
            }

            this.results = normalizeFavoriteCharacters(resp.data, storage.getFavoriteCharactersIds())
            this.favoritesCount = storage.getFavoriteCharactersCount()
            this.errorMessage = ''
        } catch (error) {         
            if (controller.signal.aborted) {
                return
            }

            this.results = []
            this.errorMessage = error.message
        } finally {
            if (this.abortController === controller) {
                this.loading = false
            }
        }
    }

    handleFiltersChanged(event) {
        this.loadCharacters(event.detail)
    }

    handleFavoritesChanged(event) {
        this.favoritesCount = event.detail.count
        this.results = normalizeFavoriteCharacters(this.results, event.detail.favoriteIds)
    }

    render(){       
        
        let bodyContent
        
        if(this.loading){
            bodyContent = html`
                <custom-loader></custom-loader>
                <div class="layout">
                    ${Array.from({ length : 8 }).map(() => html`<placeholder-cards></placeholder-cards>`)}
                </div>
            `
        }else if(this.errorMessage){
            bodyContent = html`
                <h1 class="text-danger">${this.errorMessage}</h1>                
            `
        }else{
            bodyContent = html`
                <div class="layout">
                    ${repeat(this.results, (item)=> item.id, (item)=>html`<character-card .character=${item}></character-card>`)}
                </div>
            `
        }


        return html`        
            <div class="header">
                <search-fields @filters-changed="${this.handleFiltersChanged}"></search-fields>
                <button class="btn-favorites">Favoritos ${this.favoritesCount}</button>
            </div>
            ${bodyContent}
        `

    }

}

customElements.define('layout-characters', LayoutCharacters)
