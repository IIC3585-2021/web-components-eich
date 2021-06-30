import {LitElement, html} from 'lit-element';

import { style } from "./sell-style";

class SellElement extends LitElement {
    static get properties(){
        return {
            id: {type: Number},
            description: {type: String},
            image: {type: String},
            discount: {type: String},
            price: {type: String},
            discountAmount: {type: String},
            deleteItem: {type: Function}
        }
    }
    static get styles() {
        return [style];
    }
    constructor() {
        super();
        this.image = this.image !== ''? this.image: 'https://picsum.photos/200/300'
    }
    
    render() {
        return html`
            <div class="sell-body">
                <img src=${this.image.replace(',', '')}/>
                <div>${this.description}</div>
                ${this.discount.replace(',', '') === 'true'? html`
                    <div>
                        <div>${parseInt(this.price.replace(',', '')) * parseInt(this.discountAmount)/100}</div>
                        <div>${this.discountAmount}</div>
                    </div>
                    <div>
                        <div>${this.price.replace(',', '')}</div>
                    </div>
                
                `: html`
                <div>
                    <div>${this.price.replace(',', '')}</div>
                </div>
                `}
                <div>
                    <button .value=${this.id} @click=${this.deleteItem}>Eliminar</button>
                </div>
                
                

            </div>
        `;
    }
}

customElements.define('sell-element', SellElement);