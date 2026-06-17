import { LitElement, html, css } from 'lit';

export class Loader extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }

            #loader {
                margin: 0px;    
                position: absolute!important;     
                top:0;
                left:0;
                width: 100%;     
                z-index: 10000;
            }

            .loading-bar-container {
                height: 15px;
                width: 100%;
                background-color: #1b3888;
                position: absolute;
                overflow: hidden;
            }

            .loading-bar {
                height: 100%;
                width: 50%;
                background-color: #494949;
                position: absolute;
                left: -50%;
                animation: loading 2s ease-in 0.5s infinite;
            }

            @keyframes loading {
                0% {
                    transform:translateX(0)
                }
                to {
                    transform:translateX(400%)
                }
            }
        `
    ];

    render() {
        return html`
            <div id="loader">
                <div class="loading-bar-container">
                    <div class="loading-bar"></div>
                </div>
            </div>
        `
    }
}
customElements.define('custom-loader', Loader);
