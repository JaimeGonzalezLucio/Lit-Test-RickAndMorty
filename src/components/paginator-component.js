import { LitElement, html, css } from 'lit';

export class PaginatorComponent extends LitElement {
    static properties = {
        currentPage: { type: Number },
        totalPages: { type: Number },
        totalCount: { type: Number }
    };

    static styles = [
        css`
            .paginator {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                flex-wrap: wrap;
                margin-top: 2rem;
                margin-bottom: 5rem;
            }

            button {
                min-width: 42px;
                padding: 0.5rem 1rem;
                border: 1px solid gray;
                border-radius: 5px;
                background: #ffffff;
                cursor: pointer;
                transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
            }

            button.active {
                background: #000000;
                border-color: #000000;
                color: #ffffff;
            }

            button:disabled {
                opacity: 0.9;
                cursor: not-allowed;
            }
        `
    ];

    constructor() {
        super();
        this.currentPage = 1;
        this.totalPages = 0;
        this.totalCount = 0;
    }

    changePage(page) {
        if (page === this.currentPage || page < 1 || page > this.totalPages) {
            return;
        }

        this.dispatchEvent(new CustomEvent('page-changed', {
            detail: { page },
            bubbles: true,
            composed: true
        }));
    }

    render() {
        if (this.totalPages <= 1) {
            return html``;
        }

        return html`
            <div class="paginator">
                <button ?disabled=${this.currentPage === 1} @click=${() => this.changePage(this.currentPage - 1)}>
                    Anterior
                </button>

                <span>
                    Pagina ${this.currentPage} de ${this.totalPages}
                </span>

                <button ?disabled=${this.currentPage === this.totalPages} @click=${() => this.changePage(this.currentPage + 1)}>
                    Siguiente
                </button>
            </div>
        `;
    }
}

customElements.define('paginator-component', PaginatorComponent);
