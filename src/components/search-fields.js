import { LitElement, html, css } from 'lit';
import { getData } from '../services/apiRequest';

export class SearchFields extends LitElement {
    static styles = [
        css`
            *{
                box-sizing:border-box;
                padding:0;
                margin:0;
            }

            .container{
                width:100%;
                display: flex;
                align-content:center;
                justify-content:center;
                gap:1rem;    
                flex-wrap: wrap;            
            }

            input{
                min-width:300px;
                width:520px;
                max-width: 520px;
                height:50px
            }

            select{
                min-width:100px;
                width:100px;
                height:50px
            }
        `
    ];

    constructor(){
        super();
        this.abortController = null
        this.searchTimeOut = null
    }

    firstUpdated(){
        const input = this.shadowRoot.querySelector('input')
        input.focus()  
    }

    debounceTime(){

        clearTimeout(this.searchTimeOut)

        this.searchTimeOut = setTimeout(() => {
            this.search()
        }, 500);

    }

    search(e){

        if (this.abortController) {
            this.abortController.abort()
        }

        this.abortController = new AbortController()
        const { signal } = this.abortController

        const filters = { 
            name : this.shadowRoot.querySelector('input').value ?? '',
            status : this.shadowRoot.querySelector('select').value ?? '',           
        }
        getData(filters, signal)
    }

    render() {
        return html`
            <div class="container">
                <input type="text" placeholder="Buscar por nombre..." @input="${this.debounceTime}">
                <select @change="${this.search}">
                    <option value="Alive">Vivo</option>
                    <option value="Dead">Muerto</option>
                    <option value="unknown">Desconocido</option>
                </select>
            </div>
        `;
    }
}
customElements.define('search-fields', SearchFields);
