import { LitElement, html, css } from 'lit';
import { storageService } from '../services/storageService';

const storage = new storageService()

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

            .info span  {
                padding:.5rem;
                border-radius: 5px;
                font-weight: 600
            }

            .info span:nth-child(1){
                background-color: green;
                color: white
            }

            .info span:nth-child(2){
                background-color: black;
                color: white
            }

            .info span:nth-child(3){
                background-color: blue;
                color: white
            }

            .info span:nth-child(4){
                background-color: yellow;
                color: black
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

    addFavorite(){
        storage.saveCharacter(this.character)
    }

    render() {
        return html`
            <div class="card">
                <div class="image">
                    <img src=${this.character?.image} alt=${this.character?.name}>
                </div>
                <div class="info">                    
                    <h3>${this.character?.name}</h3>                                
                    <button @click="${(e) => { e.stopPropagation(); this.addFavorite }}">Agregar a favoritos</button>
                </div>
            </div>
        `;
    }
}
customElements.define('character-card', CharacterCard);
