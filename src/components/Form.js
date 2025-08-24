import { Component } from '../core/Component';

export class Form extends Component {
  setup(props) {
    this.state = {
      amount: '',
    }
    this.$rootElement = document.createElement('form');
    this.$rootElement.className = 'donate-form';

    const inputLabel = document.createElement('label');
    inputLabel.className = 'donate-form__input-label';
    inputLabel.textContent = 'Введите сумму в $'

    this.$input = document.createElement('input');
    this.$input.className = 'donate-form__donate-input';
    this.$input.name = 'amount';
    this.$input.type = 'number';
    this.$input.max = '100';
    this.$input.min = '1';
    this.$input.required = true;

    this.$rootElement.append(inputLabel);
    inputLabel.append(this.$input);

    this.$button = document.createElement('button');
    this.$button.className = 'donate-form__submit-button';
    this.$button.textContent = 'Задонатить';
    this.$button.type = 'submit';
    this.$button.disabled = true;

    this.$rootElement.append(this.$button);

    this.$input.addEventListener('input', this.handleInput.bind(this));
    this.$rootElement.addEventListener('submit', this.handleSubmit.bind(this));
  }

  get isValid() {
    const amount = Number(this.state.amount);
    return !isNaN(amount) && amount >= 1 && amount <= 100;
  }

  handleInput(event) {
    this.state.amount = event.target.value;

    this.$button.disabled = !this.isValid;
  }

  handleSubmit(event) {
    event.preventDefault();

    if(this.isValid) {
      this.props.onSubmit(Number(this.state.amount));
      this.state.amount = '';
      this.$input.value = '';
      this.$button.disabled = true;
    }
  }
}