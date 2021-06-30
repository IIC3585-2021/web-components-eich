const templateTodo = document.createElement('template');

templateTodo.innerHTML = /*html*/`
<style>
    .input-container{
        display: flex;
        flex-direction: row;
    }
    .to-do-container{
        background-color: grey;
        width: 40%;
        border-radius: 5px;
        padding-top: 1%;
        padding-bottom: 1%;
        padding-left: 1%;
    }
    .wrapper {
        position: fixed;
        border-radius: 5px;
        padding-top: 1%;
        padding-bottom: 1%;
        padding-left: 1%;
        width: 30%;
        background-color: gray;
        opacity: 0;
        visibility: hidden;
        transform: scale(1.1);
        transition: visibility 0s linear .25s,opacity .25s 0s,transform .25s;
        z-index: 1;
        margin-top: 10px;
        }
    .visible {
    opacity: 1;
    visibility: visible;
    transform: scale(1);
    transition: visibility 0s linear 0s,opacity .25s 0s,transform .25s;
    }

</style>

<div class="wrapper visible">
    <div>
        <p class="title"></p>
    </div>
    <div class="list">
        <ul class='list-ul'>
        </ul>
        </div>
    <div class="input-container">
        <div class="prompt"></div><input type='text' class='input' id='input'/><button class='add'>Agregar</button>
    </div>
</div>
`


class ToDoList extends HTMLElement{

    constructor(){
        console.log("WOW")
        super();
        this.attachShadow({"mode": "open"})
        this.shadowRoot.appendChild(templateTodo.content.cloneNode(true))
        this.list = JSON.parse(localStorage.getItem('litTodoList-regular')) || [];
    }

    static get observedAttributes () {
        return ["title", "prompt", "visible"];
    }

    get todos2() {
        let todo = this.shadowRoot.querySelector(".list").querySelector('.list-ul')
        return todo
    }
    

    todos(val) {
        let todos2 = this.todos2
        console.log("QUE", val, todos2.querySelectorAll('li').length)
        if (val !== '') {
            let new_li = document.createElement('li')
            let new_li_button = document.createElement('button')
            new_li_button.innerHTML = 'Eliminar'
            new_li_button.className = `${todos2.querySelectorAll('li').length + 1}`
            new_li_button.onclick = function(){
                console.log("333", document.querySelector('main-container').shadowRoot.querySelector('.main-template-container'))
                const path = document.querySelector('main-container').shadowRoot.querySelector('.main-template-container').querySelector('todo-list').shadowRoot.querySelector(".list").querySelector('.list-ul').querySelectorAll('li')
                console.log("VEAMOS", path, typeof path)
                const array = Array.from(path)
                console.log("DALEE", array, typeof array)
                const new_list = array.map((todo, index) => {
                    if (parseInt(todo.querySelector('button').className) !== parseInt(new_li_button.className)) {
                        console.log("??", todo.innerHTML, todo.textContent.replace('Eliminar', ''))
                        let new_text = todo.textContent.replace('Eliminar', '')
                        return `<li>${new_text} <button class=${index}>Eliminar</buton></li>`
                    } 
                }).filter(todo => todo !== undefined).join('')
                console.log("WOW", new_list)
                document.querySelector('main-container').shadowRoot.querySelector('.main-template-container').querySelector('todo-list').shadowRoot.querySelector(".list").querySelector('.list-ul').innerHTML = new_list;
              };
              
            new_li.innerHTML = val
            console.log("WWW", new_li)
            new_li.appendChild(new_li_button)
            todos2.appendChild(new_li)
            this.shadowRoot.querySelector(".input").textContent = '';

        }
        
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "title") {
          this.shadowRoot.querySelector(".title").textContent = newValue;
        } else if (name === "input") {
            this.shadowRoot.querySelector(".input").textContent = newValue;
        } else if (name === "visible"){
            if (newValue === null) {
                this.shadowRoot.querySelector(".wrapper").classList.remove("visible");
            } else {
            this.shadowRoot.querySelector(".wrapper").classList.add("visible");
            }
        }
        
      }

    connectedCallback() {
        let title = this.getAttribute("title")
        let prompt = this.getAttribute("prompt")

        let title_info = this.shadowRoot.querySelector(".title")
        let prompt_info = this.shadowRoot.querySelector(".prompt")

        title_info.textContent = title
        prompt_info.textContent = prompt

        // Setup a click listener on <app-drawer> itself.
        this.shadowRoot.querySelector('.add').addEventListener('click', e => {
            // Don't toggle the drawer if it's disabled.
            let input = this.shadowRoot.querySelector('.input').textContent
            if (input !== '') {
                this.todos(input)
            return;
            }
        });

        this.shadowRoot.querySelector('.input').addEventListener('keydown', e => {
            let old_value = this.shadowRoot.querySelector(".input").textContent;
            this.shadowRoot.querySelector(".input").textContent = old_value + e.key;
        })



    }
}

window.customElements.define('todo-list', ToDoList);