import '../pages/cart.css';

import CartElement from '../components/CartElement.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import { getCartElements, countTotalQty, setTotalQty } from '../utils/utils';

const cartGoodsSelector = '.cart__goods';
const cartTemplateSelector = '.cart-template';
const cart = JSON.parse(localStorage.getItem('cart'));

const cartForm = document.querySelector('.cart__form');

const cartSubmitButton = cartForm.querySelector('.cart__button');

const totalSum = document.querySelector('.cart__total-sum');
const promocode = document.querySelector('.cart__input-promo');

const cartTitle = document.querySelector('.cart__title');

const validateData = {
  formSelector: '.cart__form',
  inputSelector: '.input',
  submitButtonSelector: '.cart__button',
  inactiveButtonClass: 'cart__button_disabled',
  inputErrorClass: 'input_error',
  inactiveInputClass: 'input_disabled',
};

const cartFormValidator = new FormValidator(validateData, cartForm);

function isCartEmpty() {
  for (let key in cart) {
    if (cart.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

function setEmptyCart() {
  if (isCartEmpty()) {
    totalSum.textContent = 0;
    cartTitle.textContent = 'Your cart is empty';
    cartFormValidator.disableButton();
    cartFormValidator.disableInputs();
  }
}

if (cart && !isCartEmpty()) {

  function createElement(data) {
    const cartElement = new CartElement(
      data,
      cartTemplateSelector,
      cart,
      applyPromo,
      setTotalQty,
      totalSum,
      function handleDeleteCard(evt) {
        evt.target.closest('.goods-item').remove();

        if (cartFormValidator.isPromoValid()) {
          totalSum.textContent -=
            cart[data.id]['price'] * cart[data.id]['count'] * 0.9;
        } else {
          totalSum.textContent -=
            cart[data.id]['price'] * cart[data.id]['count'];
        }

        delete cart[data.id];
        localStorage.setItem('cart', JSON.stringify(cart));
        setEmptyCart();
        setTotalQty();
      }
    );
    const cartGoodsElement = cartElement.createElement();
    return cartGoodsElement;
  }

  const cartGoodsList = new Section(
    {
      data: getCartElements(),
      renderer: (element) => {
        cartGoodsList.setItem(createElement(element));
      },
    },
    cartGoodsSelector
  );

  cartGoodsList.renderItems();

  cartFormValidator.enableValidation();

  function countTotalAmount() {
    const amount = getCartElements().reduce(
      (acc, { count, price }) => acc + count * price,
      0
    );
    return amount;
  }

  totalSum.textContent = countTotalAmount();

  function applyPromo() {
    if (cartFormValidator.isPromoValid()) {
      totalSum.textContent = countTotalAmount() * 0.9;
    } else {
      totalSum.textContent = countTotalAmount();
    }
  }

  function checkDiscount() {
    let discount = 0;

    if (cartFormValidator.isPromoValid()) {
      discount = totalSum.textContent / 0.9 - totalSum.textContent;
    }

    return discount;
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function handleCartSubmit() {
    const orderData = {};
    orderData['items'] = getCartElements();
    orderData['qty'] = countTotalQty();
    orderData['amount'] = `\$${totalSum.textContent}`;
    orderData['id'] = `${getRandomInt(7777)}-${getRandomInt(9999)}`;
    orderData['discount'] = `\$${checkDiscount()}`;
    localStorage.setItem('orderInfo', JSON.stringify(orderData));
  }

  promocode.addEventListener('input', applyPromo);

  cartSubmitButton.addEventListener('click', handleCartSubmit);

  setTotalQty();
} else {
  setEmptyCart();
}
