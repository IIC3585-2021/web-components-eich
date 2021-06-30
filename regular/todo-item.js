const templateTodoItem = document.createElement('template');

templateTodoItem.innerHTML = /*html*/`
<style>
    

</style>

<div class="wrapper visible">
    <p class='information'></p>
    <button class='delete-button'>Eliminar</button>
</div>
`


class ToDoItem extends HTMLElement{

    constructor(){
        console.log("QUE WEA")
        super();
        this.attachShadow({"mode": "open"})
        this.shadowRoot.appendChild(templateTodoItem.content.cloneNode(true))
        this.id = 0;
    }

    connectedCallback() {
        console.log("QUE WEA 2")
        const text = this.getAttribute("title");
        const deleteFunction = this.getAttribute("function");
        this.id = this.getAttribute('id')

        this.shadowRoot.querySelector('p').textContent = text;
        this.shadowRoot.querySelector('button').addEventListener('click', deleteFunction());

    }
}

window.customElements.define('todo-item', ToDoItem);
