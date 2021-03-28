import CartElement from '../components/CartElement.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';

const cartGoodsSelector = '.cart__goods';
const cartTemplateSelector = '.cart-template';
const cart = JSON.parse(localStorage.getItem('cart'));

const cartForm = document.querySelector('.cart__form');

const cartSubmitButton = cartForm.querySelector('.cart__button');

const totalSum = document.querySelector('.cart__total-sum');
const promocode = document.querySelector('.cart__input_type_promo');

const cartTitle = document.querySelector('.cart__title');

const validateData = {
  formSelector: '.cart__form',
  inputSelector: '.cart__input',
  submitButtonSelector: '.cart__button',
  inactiveButtonClass: 'cart__button_disabled',
  inputErrorClass: 'cart__input_type_error'
};

const cartFormValidator = new FormValidator(validateData, cartForm);

if(cart !== null) {

  const cartElements = Object.values(cart);

  function createElement(data) {
    const cartElement = new CartElement(data, cartTemplateSelector, cart, applyPromo);
    const cartGoodsElement = cartElement.createElement();

    return cartGoodsElement;
  }

  const cartGoodsList = new Section({ data: cartElements,
    renderer: (element) => {
      cartGoodsList.setItem(createElement(element));
    }
  },
  cartGoodsSelector
  );

  cartGoodsList.renderItems();

  cartFormValidator.enableValidation();

  totalSum.textContent = `\$${countTotalAmount()}`;

  function countTotalAmount(){
    const amount = cartElements.reduce((acc,{count, price}) => acc + count*price, 0);
    return amount;
  }

  function countTotalQty(){
    const qty = cartElements.reduce((acc,{count}) => acc + count, 0);
    return qty;
  }

  function applyPromo() {
    if(cartFormValidator.isPromoValid()){
      totalSum.textContent = `\$${countTotalAmount()*0.9}`;
    } else {
      totalSum.textContent = `\$${countTotalAmount()}`;
    }
  }

  function checkDiscount() {
    let discount = 0;
    if(cartFormValidator.isPromoValid()){
      discount = countTotalAmount()*0.1;
    }
    return discount;
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function handleCartSubmit(){
    const orderData = {};
    orderData['items'] = Object.values(JSON.parse(localStorage.getItem('cart')));
    orderData['qty'] = countTotalQty();
    orderData['amount'] = totalSum.textContent;
    orderData['id'] = `${getRandomInt(7777)}-${getRandomInt(9999)}`;
    orderData['discount'] = `\$${checkDiscount()}`;
    localStorage.setItem('orderInfo', JSON.stringify(orderData));
  }

promocode.addEventListener('input', applyPromo);

cartSubmitButton.addEventListener('click', handleCartSubmit);

} else {
  cartFormValidator.disableButton();
  totalSum.textContent = '$0';
  cartTitle.textContent = 'Your cart is empty';
}




