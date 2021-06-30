import {LitElement, html} from 'lit-element';

import { style } from "./sell-style";
import './SellElement.js';
import './AddItem.js';

class SellList extends LitElement {
    static get properties(){
        return {
            list:{type:Array},
            newItem: {type: Object}
        }
    }
    static get styles() {
        return [style];
    }
    constructor() {
        super();
        this.image = 'https://picsum.photos/200/300'
        this.list = JSON.parse(localStorage.getItem('litSellList')) || []
        this.image = '';
        this.description = '';
        this.price = '';
        this.discount = false;
        this.discountAmount = '';
        this.discountAux = '';
    }

    handleKeyPress(e) {
        if (e.target.value !== '' && e.key === 'Enter') {
            this.createNewSellItem();
        }
    }

    handleInputImage(e) {
        this.image = e.target.value;
    }

    handleInputDescription(e) {
        this.description = e.target.value;
    }

    handleInputPrice(e) {
        this.price = e.target.value;
    }
    handleInputDiscount(e) {
        this.discountAux = e.target.value;
        if(this.discountAux === 'true'){
            this.discount = 'true';
        } else {
            this.discount = 'false';
        }
    }
    handleInputDiscountAmount(e) {
        this.discountAmount = e.target.value;
    }

    createNewSellItem(){
        const sellList = JSON.parse(localStorage.getItem('litSellList')) || []
        this.newItem = {"description": this.description, "price": this.price, "image": this.image, "discount": this.discount, "discountAmount": this.discountAmount}
        sellList.push(this.newItem)
        this.list = sellList
        localStorage.setItem('litSellList', JSON.stringify(sellList))
        this.image = ""
        this.description = ""
        this.price = ""
        this.newItem = {}
    }

    deleteItem(item){
        const sellList = JSON.parse(localStorage.getItem('litSellList')) || []
        let newSellList = sellList.filter((element, index) => parseInt(index) !== parseInt(item.target.value))
        this.list = newSellList
        localStorage.setItem('litSellList', JSON.stringify(newSellList))
    }

    
    render() {
        return html`
        <div>
            <h1>😎 Lit Sell 😎</h1>
            <add-element .onInputImage=${this.handleInputImage.bind(this)} .createNewSellItem=${this.createNewSellItem.bind(this)}
            .onInputDescription=${this.handleInputDescription.bind(this)}
            .onInputPrice=${this.handleInputPrice.bind(this)}
            .onInputDiscount=${this.handleInputDiscount.bind(this)}
            .onInputDiscountAmount=${this.handleInputDiscountAmount.bind(this)}> </add-element>
            <ul>
                ${this.list.map((item, index) => html`<sell-element 
                                                id=${index}
                                                description=${item.description}
                                                image=${item.image},
                                                discount=${item.discount},
                                                price=${item.price},
                                                discountAmount=${item.discountAmount}
                                                .deleteItem=${this.deleteItem.bind(this)}></sell-element>`)}
            </ul>
        </div>
        `;
    }
}

customElements.define('sell-list', SellList);