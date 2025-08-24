import { Component } from '../core/Component';

export class List extends Component {
  setup() {
    this.$rootElement = document.createElement('div');
    this.$rootElement.className = 'donates-container';

    const createH2 = document.createElement('h2');
    createH2.className = 'donates-container__title';
    createH2.textContent = 'Список донатов';

    this.$listContainer = document.createElement('div');
    this.$listContainer.className = 'donates-container__donates';
    
    this.$rootElement.append(createH2);
    this.$rootElement.append(this.$listContainer);
  }

  addItem(item) {
    this.$listContainer.append(item.$rootElement);
  }

  removeItem(item) {
    if(item.$rootElement.parentNode === this.$listContainer) {
      this.$listContainer.removeChild(item.$rootElement);
    }
  }
}