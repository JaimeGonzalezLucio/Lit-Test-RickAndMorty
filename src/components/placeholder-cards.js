import { LitElement, html, css } from 'lit';

export class PlaceholderCards extends LitElement {
    static styles = [
        css`
            .card {
                width: 380px;
                aspect-ratio: 1/1;
                padding: 30px;
                text-align: center;
                overflow: hidden;
                border-radius: 16px;
                background: #fff;
                box-shadow: 0 10px 25px rgb(0 0 0 / 8%);
                transition: .5s;
            }

        .card-img {
            height: 180px;
        }

        .card-body {
            padding: 1rem;
        }

        .placeholder {
            display: inline-block;
            min-height: 1em;
            background-color: #e0e0e0;
            border-radius: 4px;
            animation: placeholderGlow 1.5s ease-in-out infinite;
        }

        .card-text .placeholder {
            display: block;
            margin-bottom: 8px;
        }

        .button-placeholder {
            height: 38px;
            margin-top: 12px;
        }

        @keyframes placeholderGlow {
            0% {
                opacity: 1;
            }
            50% {
                opacity: 0.4;
            }
            100% {
                opacity: 1;
            }
        }
        `
    ];

    render() {
        return html`
        <div class="card placeholder-card">
            <div class="card-img placeholder"></div>

            <div class="card-body">
                <h5 class="card-title">
                <span class="placeholder col-6"></span>
                </h5>

                <p class="card-text">
                <span class="placeholder col-7"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-6"></span>
                <span class="placeholder col-8"></span>
                </p>

                <div class="placeholder button-placeholder col-6"></div>
            </div>
        </div>
    `
    }
}
customElements.define('placeholder-cards', PlaceholderCards);
