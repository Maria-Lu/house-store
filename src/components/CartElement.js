import Element from './Element.js';

export default class CartElement extends Element {
  constructor(data, elementTemplateSelector, cart, applyPromo) {
    super(elementTemplateSelector);
    this._title = data.name;
    this._price = data.price;
    this._id = data.id;
    this._count = data.count;
    this._cart = cart;
    this._applyPromo = applyPromo
  }

  createElement() {
    this._element = super._getTemplate();

    this._element.querySelector('.cart__goods-title').textContent = this._title;
    this._element.querySelector('.cart__goods-price').textContent = `\$${this._price}`;

    this._elementQty = this._element.querySelector('.cart__input_type_qty');
    this._elementQty.value = this._count;
    this._elementQty.dataset.id = this._id;

    this._setEventListener();

    return this._element;
  }

  _setEventListener(){
    this._elementQty.addEventListener('input', this._editCount.bind(this));
  }

  _editCount() {
    this._cart[this._elementQty.dataset.id]['count'] = +this._elementQty.value;
    localStorage.setItem('cart', JSON.stringify(this._cart));
    this._applyPromo();
  }

}
