import { html, LitElement, css } from 'lit'
import { repeat } from 'lit/directives/repeat.js'

import { getData } from '../services/apiRequest.js'
import { Loader } from './character-loader.js'

import { CharacterCard } from './character-card.js'
import { ModalCharacter } from './modal-character.js'
import { PlaceholderCards } from './placeholder-cards.js'
import { PaginatorComponent } from './paginator-component.js'
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
        this.favorites = false
        this.selectedCharacter = null
        this.isModalOpen = false

        this.currentFilters = {}
        this.currentPage = 1
        this.paginationInfo = {
            count: 0,
            pages: 0,
            next: null,
            prev: null,
            currentPage: 1
        }

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
        favorites: { type: Boolean },
        selectedCharacter: { type: Object },
        isModalOpen: { type: Boolean },
        currentPage: { type: Number },
        paginationInfo: { type: Object }
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

    loadFavoriteCharacters() {
        if (this.abortController) {
            this.abortController.abort()
            this.abortController = null
        }

        this.favorites = true
        this.loading = false
        this.errorMessage = ''

        this.currentPage = 1
        this.paginationInfo = {
            count: storage.getFavoriteCharactersCount(),
            pages: 0,
            next: null,
            prev: null,
            currentPage: 1
        }

        this.results = normalizeFavoriteCharacters(
            storage.getFavoriteCharacters(),
            storage.getFavoriteCharactersIds()
        )
    }

    async loadCharacters(filters = {}) {
        if (this.abortController) {
            this.abortController.abort()
        }

        this.favorites = false
        this.loading = true
        this.errorMessage = ''

        const controller = new AbortController()
        this.abortController = controller

        try {
            const resp = await getData({
                ...filters,
                page: this.currentPage
            }, controller.signal)

            if (this.abortController !== controller) {
                return
            }

            this.results = normalizeFavoriteCharacters(resp.data, storage.getFavoriteCharactersIds())
            this.paginationInfo = resp.info
            this.currentPage = resp.info.currentPage
            this.favoritesCount = storage.getFavoriteCharactersCount()
            this.errorMessage = resp.message

        } catch (error) {
            if (controller.signal.aborted) {
                return
            }

            this.results = []
            this.paginationInfo = {
                count: 0,
                pages: 0,
                next: null,
                prev: null,
                currentPage: this.currentPage
            }
            this.errorMessage = error.message
        } finally {
            if (this.abortController === controller) {
                this.loading = false
            }
        }
    }

    handleFiltersChanged(event) {
        this.currentFilters = event.detail
        this.currentPage = 1
        this.loadCharacters(this.currentFilters)
    }

    handlePageChanged(event) {
        this.currentPage = event.detail.page
        this.loadCharacters(this.currentFilters)
    }

    handleFavoritesChanged(event) {
        this.favoritesCount = event.detail.count

        if (this.favorites) {
            this.results = normalizeFavoriteCharacters(event.detail.favoriteCharacters, event.detail.favoriteIds)
            this.paginationInfo = {
                count: event.detail.count,
                pages: 0,
                next: null,
                prev: null,
                currentPage: 1
            }
            return
        }

        this.results = normalizeFavoriteCharacters(this.results, event.detail.favoriteIds)
    }

    handleCharacterSelected(event) {
        this.selectedCharacter = event.detail
        this.isModalOpen = true
    }

    handleModalClosed() {
        this.isModalOpen = false
        this.selectedCharacter = null
    }

    handleFavoritesToggle() {
        if (this.favorites) {
            this.loadCharacters(this.currentFilters)
            return
        }

        this.loadFavoriteCharacters()
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
        }else if(!this.results?.length){
            bodyContent = html`
                <h1 class="text-danger">
                    ${this.favorites ? 'No tienes favoritos guardados' : 'No se encontraron personajes'}
                </h1>
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
                ${!this.favorites ? html` <search-fields @filters-changed="${this.handleFiltersChanged}"></search-fields>` : html`<div></div>`}
                <button class="btn-favorites" @click="${this.handleFavoritesToggle}">
                    ${this.favorites ? 'Ver todos' : `Favoritos ${this.favoritesCount}`}
                </button>
            </div>

            <div @character-selected="${this.handleCharacterSelected}">
                ${bodyContent}
            </div>

            <modal-character .characterData=${this.selectedCharacter} .isOpen=${this.isModalOpen} @modal-closed="${this.handleModalClosed}" ></modal-character>

            ${!this.favorites ? html` <paginator-component .currentPage=${this.currentPage} .totalPages=${this.paginationInfo.pages} .totalCount=${this.paginationInfo.count} @page-changed="${this.handlePageChanged}"></paginator-component>` : html``}
        `
    }

}

customElements.define('layout-characters', LayoutCharacters)
