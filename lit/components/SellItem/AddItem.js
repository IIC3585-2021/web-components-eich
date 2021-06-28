import {LitElement, html} from 'lit-element';

import { style } from "./sell-style";

class AddElement extends LitElement {
    static get properties(){
        return {
            createNewSellItem: {type: Function},
            onInputImage: {type: Function},
            onInputDescription: {type: Function},
            onInputPrice: {type: Function},
            onInputDiscountAmount: {type: Function},
            onInputDiscount: {type: Function}
            
        }
    }
    static get styles() {
        return [style];
    }
    constructor() {
        super();
        this.image = 'https://picsum.photos/200/300'
        this.newItem = {}
    }
    
    render() {
        return html`

           

            <div class="add-body">
                <button @click=${this.createNewSellItem}> Agregar item</button>
                <input @input=${this.onInputImage} type='text' placeholder='Image Url'/>
                <input @input=${this.onInputDescription} type='text' placeholder='Description'/>
                <input @input=${this.onInputPrice} type='text' placeholder='Price'/>
                <input @input=${this.onInputDiscount} type='text' placeholder='true or false?'/>
                <input @input=${this.onInputDiscountAmount} type='text' placeholder='Discount Amount'/>

            </div>
        `;
    }
}

customElements.define('add-element', AddElement);