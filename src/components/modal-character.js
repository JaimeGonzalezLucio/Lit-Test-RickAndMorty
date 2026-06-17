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
                border-radius: 8px;
                width: 90%;
                max-width: 450px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
                position: relative;
                transform: scale(0.8);
                transition: transform 0.3s ease;
                font-family: sans-serif;
            }

            .modal-overlay.open .modal-content {
                transform: scale(1);
            }

            .close-btn {
                position: absolute;
                top: 10px;
                right: 15px;
                background: none;
                border: none;
                color: #9e9e9e;
                font-size: 24px;
                cursor: pointer;
                transition: color 0.2s;
            }

            .close-btn:hover {
                color: #ff9800;
            }

            .character-img {
                width: 100%;
                height: 250px;
                object-fit: cover;
            }

            .character-details {
                padding: 20px;
            }

            h2 {
                margin: 0 0 10px 0;
                color: #ff9800;
            }

            .status {
                display: flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 15px;
                font-weight: bold;
            }

            .status-icon {
                height: 10px;
                width: 10px;
                border-radius: 50%;
            }

            .Alive { 
                background: #55cc44; 
            }

            .Dead { 
                background: #d63d2e; 
            }
            
            .unknown { 
                background: #9e9e9e; 
            }

            .info-label {
                color: #9e9e9e;
                font-size: 14px;
                margin-top: 10px;
            }

            .info-value {
                font-size: 16px;
                margin-bottom: 10px;
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
        this.isOpen = false;
        this.dispatchEvent(new CustomEvent('modal-closed', {
            bubbles: true,
            composed: true
        }));
    }

    render() {
        if (!this.characterData) return html``;

        return html`
            <div class="modal-overlay ${this.isOpen ? 'open' : ''}" @click="${this._closeModal}">
                
                <div class="modal-content" @click="${(e) => e.stopPropagation()}">
                    <button class="close-btn" @click="${this._closeModal}">X</button>
                    
                    <img class="character-img" src="${this.characterData?.image}" alt="${this.characterData?.name}">
                    
                    <div class="character-details">
                        <h2>${this.characterData?.name}</h2>
                        
                        <div class="status">
                            <span class="status-icon ${this.characterData?.status}"></span>
                            ${this.characterData?.status} - ${this.characterData?.species}
                        </div>

                        <div class="info-label">Género:</div>
                        <div class="info-value">${this.characterData?.gender}</div>

                        <div class="info-label">Origen:</div>
                        <div class="info-value">${this.characterData?.origin?.name || 'Desconocido'}</div>

                        <div class="info-label">Última ubicación conocida:</div>
                        <div class="info-value">${this.characterData?.location?.name || 'Desconocido'}</div>
                    </div>
                </div>
            </div>
        `;
    }
}
customElements.define('modal-character', ModalCharacter);
