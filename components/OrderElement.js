import Element from './Element.js';

export default class OrderElement extends Element {
  constructor(data, elementTemplateSelector) {
    super(elementTemplateSelector);
    this._title = data.name;
    this._count = data.count;
    this._price = data.price;
    this._total = data.price * data.count
  }

  createElement() {
    this._element = super._getTemplate();

    this._element.querySelector('.order__item-qty').textContent = this._count;
    this._element.querySelector('.order__item-details_content_name').textContent = this._title;
    this._element.querySelector('.order__item-details_content_total').textContent = `\$${this._total}`;
    this._element.querySelector('.order__item-price').textContent = this._price;

    return this._element;
  }

}
