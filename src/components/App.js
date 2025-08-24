import { Component } from '../core/Component';
import { Form } from './Form';
import { List } from './List';
import { ListItem } from './ListItem';

export class App extends Component {
  setup(props) {
    this.state = {
      total: 0,
      donates: [],
    }
    this.$rootElement = document.createElement('div');
    this.$rootElement.className = 'app';

    const $totalHeading = document.createElement('h1');
    $totalHeading.className = 'total-amount';
    $totalHeading.textContent = 'Итого: ';

    this.$total = document.createElement('span');
    this.$total.textContent = this.state.total;

    this.$rootElement.append($totalHeading);
    $totalHeading.append(this.$total);
    
    const donateForm = new Form({
      onSubmit: this.onItemCreate.bind(this),
    });
    this.$rootElement.append(donateForm.$rootElement);

    this.donateList = new List();
    this.$rootElement.append(this.donateList.$rootElement);
  }
  
  onItemCreate(amount) {
    const item = new ListItem({ 
      amount, 
      onDelete: this.onItemDelete.bind(this),
    });
    this.state.donates.push({
      id: item.state.id,
      amount: amount,
      element: item,
    });

    this.donateList.addItem(item);

    this.state.total += amount;
    this.$total.textContent = this.state.total;
  }

  onItemDelete(id, amount) {
      const donateIndex = this.state.donates.findIndex(donate => donate.id === id);
      
      if(donateIndex !== -1) {
        const [deletedDonate] = this.state.donates.splice(donateIndex, 1);

        this.state.total -= amount;
        this.$total.textContent = this.state.total;

        this.donateList.removeItem(deletedDonate.element)
      }
    };
}