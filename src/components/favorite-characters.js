import { LitElement, html, css } from 'lit';

export class FavoriteCharacters extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];

    render() {
        return html``;
    }
}
customElements.define('favorite-characters', FavoriteCharacters);
