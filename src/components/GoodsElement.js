import Element from './Element.js';
import { setTotalQty } from '../utils/utils.js';

export default class GoodsElement extends Element {
  constructor(data, elementTemplateSelector) {
    super(elementTemplateSelector);
    this._title = data.name;
    this._link = data.link;
    this._price = data.price;
    this._id = data.id
    this._setTotalQty = setTotalQty;
  }

  createElement() {
    this._element = super._getTemplate();

    this._elementImage = this._element.querySelector('.card__image');
    this._elementImage.src = this._link;
    this._elementImage.alt = this._title;
    this._element.querySelector('.card__title').textContent = this._title;
    this._element.querySelector('.card__price').textContent = `\$${this._price}`;

    this._elementButton = this._element.querySelector('.card__button');
    this._elementButton.dataset.id = this._id;
    this._elementButton.querySelector('.card__button-text').textContent = 'Buy';

    this._setEventListener();

    return this._element;
  }

  _setEventListener(){
    this._elementButton.addEventListener('click', this._handleButtonClick.bind(this));
  }

  _handleButtonClick(evt){
    const cartItems = JSON.parse(localStorage.getItem('cart')) || {};

      if(cartItems.hasOwnProperty(this._id)){
        cartItems[this._id]['count'] += 1;
      }else {
        cartItems[this._id]= {count: 1, name: this._title, price: this._price, id: this._id};
      }

      localStorage.setItem('cart', JSON.stringify(cartItems));
      this._setTotalQty();
  }

}
