import { Component } from '../core/Component';

export class ListItem extends Component {
  setup(props) {
    this.state = {
      id: Date.now(),
      date: new Date(),
      amount: props.amount,
    }

    this.$rootElement = document.createElement('div');
    this.$rootElement.className = 'donate-item';

    const formatDate = (date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');

      return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;    
    };

    this.$rootElement.innerHTML = `${formatDate(this.state.date)} -&nbsp;<b>$${this.state.amount}</b>`;

    this.$deleteButton = document.createElement('button');
    this.$deleteButton.className = 'delete-button';
    this.$deleteButton.textContent = 'Удалить';

    this.$rootElement.append(this.$deleteButton);

    this.$deleteButton.addEventListener('click', () => {
      if(props.onDelete) {
        props.onDelete(this.state.id, this.state.amount);
      }
    });
  }
}