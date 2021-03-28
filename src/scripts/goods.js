import '../pages/goods.css';

import smallHouse1 from '../images/card/small-house1.png';
import smallHouse2 from '../images/card/small-house2.png';
import smallHouse3 from '../images/card/small-house3.png';
import smallHouse4 from '../images/card/small-house4.png';

import GoodsElement from '../components/GoodsElement.js';
import Section from '../components/Section.js';

const goodsElements = [
  {
    name: 'Small House1',
    link: smallHouse1,
    price: 100,
    id: 111
  },
  {
    name: 'Small House2',
    link: smallHouse2,
    price: 200,
    id: 112
  },
  {
    name: 'Small House3',
    link: smallHouse3,
    price: 300,
    id: 113
  },
  {
    name: 'Small House4',
    link: smallHouse4,
    price: 400,
    id: 114
  }
];

const cardsSelector = '.cards';
const cardTemplateSelector = '.card-template';

  function createElement(data) {
    const card = new GoodsElement(data, cardTemplateSelector);
    const cardElement = card.createElement();

    return cardElement;
  }


  const cardList = new Section({ data: goodsElements,
    renderer: (element) => {
      cardList.setItem(createElement(element));
    }
  },
  cardsSelector
  );

  cardList.renderItems();

