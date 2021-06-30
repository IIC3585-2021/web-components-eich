const template = document.createElement('template');


template.innerHTML = /*html*/`
<style>
    .item-container{
        padding-top: 1%;
        padding-bottom: 1%;
        border-radius: 5px;
        background-color: grey;
        width: 20%;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        opacity: 0;
        visibility: hidden;
        transform: scale(1.1);
        transition: visibility 0s linear .25s,opacity .25s 0s,transform .25s;
        z-index: 1;
        margin-top: 10px;
    }


    .image-container{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .visible-item {
        opacity: 1;
        visibility: visible;
        transform: scale(1);
        transition: visibility 0s linear 0s,opacity .25s 0s,transform .25s;
    }

    img{
        width: 70%;
    }

    .body-container{
        background-color: #e1eeff;
        border-radius: 5px;
        width: 90%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .discount-container{
        width: 90%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .description{
        width: 100%;
    }
    .normal-price{
        width: 90%;
    }
    

</style>

<div class='item-container visible-item'>
    <div class="image-container">
        <img />
    </div>
    <div class="body-container">
        <slot></slot>
        <div class="discount-container">
            <div class="new-price"></div>
            <div class="discount"></div>
        </div>
        <div class="normal-price"></div>
    </div>
</div>
`



class SellItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({"mode": "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }

    static get observedAttributes () {
        return ["description", "url", "price", "discount", "discount-available", "visible-item"];
    }

    connectedCallback() {
        let url = this.getAttribute("url")
        let price = this.getAttribute("price")
        let discount = this.getAttribute("discount")

        const image_n = this.shadowRoot.querySelector("img");
        const price_n = this.shadowRoot.querySelector(".new-price");
        const discount_n = this.shadowRoot.querySelector(".discount");
        const normal_price_n = this.shadowRoot.querySelector(".normal-price");

        image_n.setAttribute('src', url)
        if (discount.length > 0){
            let promotion_price = parseFloat(price) * (parseInt(discount)/ 100)
            price_n.textContent = promotion_price
            discount_n.textContent = discount
            normal_price_n.textContent = price
        }
        

    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "title") {
          this.shadowRoot.querySelector(".title").textContent = newValue;
        } else if (name === "visible") {
          if (newValue === null) {
            this.shadowRoot.querySelector(".item-container").classList.remove("visible");
          } else {
            this.shadowRoot.querySelector(".item-container").classList.add("visible");
          }
        }
      }
}

window.customElements.define('sell-item', SellItem);