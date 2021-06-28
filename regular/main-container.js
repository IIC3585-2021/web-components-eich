const mainTemplate = document.createElement('template');


mainTemplate.innerHTML = /*html*/`

<style>
    .main-template-container{
        background-color: blue;
    }        

</style>

<div class='main-template-container'>


    <button onclick="">Sell Items </button>
    <button onclick="">Todo Lists </button>
    <sell-item url="https://picsum.photos/200" discount="100" price="10000">
        <p>Rico perfume que puede venir de cualquier lado de donde quieras</p>
    </sell-item>
    
    <todo-list title="TODO" prompt="Add new list item:" />
    <div class='elected'></div>

</div>

`

class MainTemplate extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({"mode": "open"});
        this.shadowRoot.appendChild(mainTemplate.content.cloneNode(true))
    }
}

window.customElements.define('main-container', MainTemplate);