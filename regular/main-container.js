const mainTemplate = document.createElement('template');


mainTemplate.innerHTML = /*html*/`

<style>
    .main-template-container{
        height: 100%;
    }
    .nav-bar{
        background-color: gray;
        display: flex;
        justify-content: center;
    }
  

</style>

<div class='main-template-container'>

    <div class="nav-bar">
        <button id="button-sell" >Sell Items </button>
        <button id="button-todo" >Todo Lists </button>
    </div>
    <div class="sells-container">
    <sell-item url="https://picsum.photos/200" discount="100" price="10000">
        <p id="primero">Rico perfume que puede venir de cualquier lado de donde quieras</p>
    </sell-item>
    <sell-item url="https://picsum.photos/200" discount="500" price="10000">
        <p>Rico2222 perfume que puede venir de cualquier lado de donde quieras</p>
    </sell-item>
    </div>
    
    <todo-list title="TODO" prompt="Add new list item:" />
    <div class='elected'></div>

</div>

`

class MainTemplate extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({"mode": "open"});
        this.shadowRoot.appendChild(mainTemplate.content.cloneNode(true))
        this.shadowRoot.querySelector('#button-sell').addEventListener('click', () => {this.showItems()})
        this.shadowRoot.querySelector('#button-todo').addEventListener('click', () => {this.showTodo()})
        this.shadowRoot.querySelector('.sells-container').hidden = true;
        this.shadowRoot.querySelector('todo-list').hidden = true;
    }

    showItems(){
        this.shadowRoot.querySelector('.sells-container').hidden = false;
        this.shadowRoot.querySelector('todo-list').hidden = true;
    }

    showTodo(){
        this.shadowRoot.querySelector('.sells-container').hidden = true;
        this.shadowRoot.querySelector('todo-list').hidden = false;
    }
}

window.customElements.define('main-container', MainTemplate);