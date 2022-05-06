import Element from './Element.js';

export default class CartElement extends Element {
  constructor(
    data,
    elementTemplateSelector,
    cart,
    setTotalQty,
    applyPromo,
    totalSum,
    handleDeleteCard,
  ) {
    super(elementTemplateSelector);
    this._title = data.name;
    this._price = data.price;
    this._id = data.id;
    this._count = data.count;
    this._cart = cart;
    this._applyPromo = applyPromo;
    this._totalSum = totalSum;
    this._handleDeleteCard = handleDeleteCard;
    this._setTotalQty = setTotalQty;
  }

  createElement() {
    this._element = super._getTemplate();

    this._element.querySelector('.goods-item__title').textContent = this._title;

    this._element.querySelector(
      '.goods-item__price'
    ).textContent = `\$${this._price}`;

    this._elementQty = this._element.querySelector('.goods-item__input');
    this._elementQty.value = this._count;
    this._elementQty.dataset.id = this._id;

    this._elementButton = this._element.querySelector(
      '.goods-item__button-delete'
    );

    this._setEventListener();

    return this._element;
  }

  _setEventListener() {
    this._elementQty.addEventListener('input', this._editCount.bind(this));
    this._elementButton.addEventListener(
      'click',
      this._handleDeleteCard.bind(this)
    );
  }

  _editCount() {
    this._cart[this._elementQty.dataset.id]['count'] = +this._elementQty.value;
    localStorage.setItem('cart', JSON.stringify(this._cart));
    this._applyPromo();
    this._setTotalQty();
  }

}
