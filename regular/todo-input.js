const templateTodoInput = document.createElement('template');

templateTodoInput.innerHTML = /*html*/`
<style>
    

</style>

<div class="wrapper visible">
    <input type='text' class='input-todo'/>
    <button class='add-button'>Agregar</button>
</div>
`


class ToDoInput extends HTMLElement{

    constructor(){
        console.log("JIJI")
        super();
        this.attachShadow({"mode": "open"})
        this.shadowRoot.appendChild(templateTodoInput.content.cloneNode(true))
    }

    connectedCallback() {
        console.log("QUE WEA 3")
        const handleFunction = this.getAttribute("handleInput");
        const addFunction = this.getAttribute('addFunction');

        this.shadowRoot.querySelector('input').addEventListener('keydown', (e) => {handleFunction(e)})

        this.shadowRoot.querySelector('button').addEventListener('click', addFunction());

    }
}

window.customElements.define('todo-input', ToDoInput);