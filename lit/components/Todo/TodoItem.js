
import {LitElement, html} from 'lit-element';
import { style } from "./todo-style";

class TodoItem extends LitElement {
  static get properties() {
    return {
        id: {type: Number}, 
        item: {type: String},
        deleteItem: {type: Function}
    };
  }
  static get styles() {
    return [style];
  }
  render() {
    return html`
      <div class="todo-item">
        <span>${this.item}</span>
        <button
        .value=${this.id} 
        @click=${this.deleteItem}
        >Eliminar</button>
      </div>
    `;
  }
}

customElements.define('todo-item', TodoItem);