import GoodsElement from '../components/GoodsElement.js';
import Section from '../components/Section.js';

const goodsElements = [
  {
    name: 'Small House1',
    link: './images/card/small-house1.png',
    price: 100,
    id: 111
  },
  {
    name: 'Small House2',
    link: './images/card/small-house2.png',
    price: 200,
    id: 112
  },
  {
    name: 'Small House3',
    link: './images/card/small-house3.png',
    price: 300,
    id: 113
  },
  {
    name: 'Small House4',
    link: './images/card/small-house4.png',
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

