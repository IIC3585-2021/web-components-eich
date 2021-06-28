
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
        console.log("···", item.target.value, this)
        const todoList = JSON.parse(localStorage.getItem('litTodoList')) || []
        console.log("···1", this.list, todoList)
        console.log("??", item.target.value)
        let newTodoList = todoList.filter((element, index) => parseInt(index) !== parseInt(item.target.value))
        console.log("FINAL", newTodoList)
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