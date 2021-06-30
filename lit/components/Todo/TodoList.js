
import {LitElement, html} from 'lit-element';
import './TodoItem.js';

import { style } from "./todo-style";
class TodoList extends LitElement {
    static get properties(){
        return {
            list:{type:Array}
        }
    }
    static get styles() {
        return [style];
      }
    
    deleteItem(item){
        const todoList = JSON.parse(localStorage.getItem('litTodoList')) || []
        let newTodoList = todoList.filter((element, index) => parseInt(index) !== parseInt(item.target.value))
        this.list = newTodoList
        localStorage.setItem('litTodoList', JSON.stringify(newTodoList))
    }
    render() {
        return html`
            <ul>
                ${this.list.map((todoItem, index) => html`<todo-item id=${index} item=${todoItem} .deleteItem=${this.deleteItem.bind(this)} ></todo-item>`)}
            </ul>
        `;
    }
}

customElements.define('todo-list', TodoList);