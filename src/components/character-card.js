import { LitElement, html, css } from 'lit';
import { storage } from '../services/storageService.js';

export class CharacterCard extends LitElement {

    static styles = [
        css`
            :host {
                display: block;
            }
                        
            .card {
                width: 300px;
                aspect-ratio: 1/1;
                padding: 30px;
                text-align: center;
                overflow: hidden;
                border-radius: 16px;
                background: #fff;
                box-shadow: 0 10px 25px rgb(0 0 0 / 8%);
                transition: .5s;
            }

            .image img {
                height: 220px;
                width: 220px;
                object-fit: contain;
            }

            h3,
            p {
            transition: color .25s .15s;
            }

            .image {                
                display: grid;
                place-items: center;
            }

            h3 {
            margin-bottom: 15px;
            color: #222;
            }

            p {
            color: #666;
            line-height: 1.6;
            }

            .card:hover {
                transition: .5s;
                transform: translateY(-6px);
            }

            .card:hover .image {
            color: #667eea;
            background: #fff;
            box-shadow: 0 0 0 35rem #667eea;
            }

            .card:hover h3,
            .card:hover p {
            color: #fff;
            transition: color 0s;
            }

            .info{
                display: flex;
                margin-top: 1rem;
                justify-content: space-between;
                gap: 1rem;
                flex-wrap: wrap;
            }

            .btn{                
                color: white  ;
                padding: 6px 12px; 
                font-size: .8rem;
                border: none; 
                border-radius: 8px; 
                cursor: pointer; 
                transition: background-color 0.3s ease, transform 0.2s ease; 
            }

            .btn-red{
                background-color: #820c0c                
            }

            .btn-gray{
                background-color: grey;       
            }

        `
    ];

    constructor(){
        super();
        this.character = {}
    }

    static properties = {
        character: { type: Object }
    }

    toggleFavorite() {
        const isFavorite = storage.toggleFavoriteCharacter(this.character)
        this.character = {
            ...this.character,
            favorite: isFavorite
        }
    }

    render() {
        return html`
            <div class="card">
                <div class="image">
                    <img src=${this.character?.image} alt=${this.character?.name}>
                </div>
                <div class="info">                    
                    <h3>${this.character?.name}</h3>                                
                    <button @click="${(e) => { e.stopPropagation(); this.toggleFavorite() }}"
                    class="btn ${this.character?.favorite ? 'btn-red' : 'btn-gray'}">
                        ${this.character?.favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                    </button>
                </div>
            </div>
        `;
    }
}
customElements.define('character-card', CharacterCard);
