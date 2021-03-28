import OrderElement from '../components/OrderElement.js';
import Section from '../components/Section.js';


const orderInfo = JSON.parse(localStorage.getItem('orderInfo'));

const orderAmount = document.querySelector('.order__amount');
const orderId = document.querySelector('.order__id');
const orderDiscount = document.querySelector('.order__discount');

const orderQty = document.querySelector('.order__qty');

const orderTemplateSelector = '.order-item-template';
const orderItemsSelector = '.order__items';

if(orderInfo !== null) {

  const orderElements = orderInfo['items'];

  function createElement(data) {
    const orderElement = new OrderElement(data, orderTemplateSelector);
    const orderItemElement = orderElement.createElement();

    return orderItemElement;
  }

  const orderItemList = new Section({ data: orderElements,
    renderer: (element) => {
      orderItemList.setItem(createElement(element));
    }
  },
  orderItemsSelector
  );

  orderItemList.renderItems();

  function setQty(){
    if(orderInfo['qty'] === 1) {
      orderQty.textContent = `${orderInfo['qty']} house`
    } else {
      orderQty.textContent = `${orderInfo['qty']} houses`
    }
  }

  setQty();
  orderAmount.textContent = `${orderInfo['amount']}`;
  orderDiscount.textContent = `${orderInfo['discount']}`;
  orderId.textContent = orderInfo['id'];

  localStorage.clear();

}
