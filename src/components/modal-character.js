import { LitElement, html, css } from 'lit';

export class ModalCharacter extends LitElement {
    static styles = [
        css`
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(5px);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.3s ease;
            }

            .modal-overlay.open {
                opacity: 1;
                pointer-events: auto;
            }

            .modal-content {
                background: #24282f;
                color: #ffffff;
                width: 90%;
                max-width: 450px;
                overflow: hidden;
                position: relative;
                transition: transform 0.3s ease;
            }

            .close-btn {
                position: absolute;
                top: 10px;
                right: 15px;
                font-size: 24px;
                cursor: pointer;
            }

            .character-img {
                width: 100%;
                height: 250px;
                object-fit: contain
            }

            .character-details {
                padding: 20px;
            }

            h2 {
                margin: 0 0 10px 0;
                color: #c87e10;
            }

            .status {
                display: flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 15px;
                font-weight: bold;
            }
            
            .status span{
                background-color: white;
                color: black;
                padding: .2rem .5rem;
                border-radius:.2rem;
            }

            .info-label {
                color: #fff;
                margin-top: 10px;
            }

        `
    ];

    static properties = {
        characterData: { type: Object },
        isOpen: { type: Boolean }
    };

    constructor() {
        super();
        this.characterData = null;
        this.isOpen = false;
    }

    closeModal() {
        this.dispatchEvent(new CustomEvent('modal-closed', {
            bubbles: true,
            composed: true
        }));
    }

    render() {
        if (!this.characterData || !this.isOpen) {
            return html``;
        }

        return html`
            <div class="modal-overlay open" @click="${this.closeModal}">
                <div class="modal-content" @click="${(e) => e.stopPropagation()}">
                    <button class="close-btn" @click="${this.closeModal}">X</button>

                    <img class="character-img" src="${this.characterData?.image}" alt="${this.characterData?.name}">

                    <div class="character-details">
                        <h2>${this.characterData?.name}</h2>

                        <div class="status">
                            <span>${this.characterData?.status} </span>
                            <span>${this.characterData?.species}</span>
                        </div>

                        <div class="info-label">Genero: ${this.characterData?.gender}</div>                        

                        <div class="info-label">Origen: ${this.characterData?.origin?.name}</div>                        
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('modal-character', ModalCharacter);
