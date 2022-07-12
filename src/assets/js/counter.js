'use strict';

const CARD_COUNTER = document.querySelector('.card-counter');
export const PURCHASE_FORM = document.getElementById('cardForm');
const DELIVERY_PREVIEW = document.querySelector('.delivery-right');
const CURRENCY = ' ₽';
const WORDS = [' товар', ' товара', ' товаров'];

const action = {
  minus: 'minus',
  plus: 'plus',
};

let CARD_INPUT = '';

const calculateSeparateItem = (cardItem, action) => {
  if (action !== action.minus) {
    cardItem.value++;
  }
  if (action !== action.plus) {
    if (cardItem.value >= 2) {
      cardItem.value--;
    }
  }
};

if (CARD_COUNTER) {
  CARD_INPUT = CARD_COUNTER.querySelector('.card-counter__input');
  CARD_COUNTER.addEventListener('click', (event) => {
    if (event.target.classList.contains('minus')) {
      calculateSeparateItem(CARD_INPUT, action.minus);
    }
    if (event.target.classList.contains('plus')) {
      calculateSeparateItem(CARD_INPUT, action.plus);
    }
  });
}

const getPurchaseData = () => {
  PURCHASE_FORM.addEventListener('submit', (event) => {
    const PURCHASE_INPUT = PURCHASE_FORM.querySelector('.card-form__input:checked');
    let purchasePrice = '';
    const PURCHASE_DATA = new FormData(event.target);
    PURCHASE_FORM.querySelectorAll('.card-form__price').forEach((item) => {
      if (item.parentElement === PURCHASE_INPUT.parentElement) {
        purchasePrice = item;
      }
    });

    const purchaseInputInfo = {
      price: parseInt(purchasePrice.innerHTML),
      count: parseInt(CARD_INPUT.value),
      value: PURCHASE_DATA.get('card-input-size'),
    };
    localStorage.setItem('purchaseData', JSON.stringify(purchaseInputInfo));
  });
};

const wordCorrect = (value, WORDS) => {
  value = Math.abs(value) % 100;
  const num = value % 10;
  if (value > 10 && value < 20) return WORDS[2];
  if (num > 1 && num < 5) return WORDS[1];
  if (num === 1) return WORDS[0];
  return WORDS[2];

};

PURCHASE_FORM &&
  getPurchaseData();

const calculatePrice = (price, count, delivery = 0) => {
  const calcPrice = price * count + delivery + CURRENCY;
  return calcPrice;
};

const deliveryCalc = (retrievedData) => ({
  totalPrice: document.getElementById('deliveryTotalPrice'),
  startingPrice: document.getElementById('deliveryStartingPrice'),
  calculatedPrice: document.getElementById('deliveryCalculatedPrice'),
  count: DELIVERY_PREVIEW.querySelectorAll('.delivery-right__count'),

  calcStartingPrice: calculatePrice(retrievedData.price, retrievedData.count),
  calcCalculatedPrice: calculatePrice(retrievedData.price, retrievedData.count),
  calcTotalPrice: calculatePrice(retrievedData.price, retrievedData.count),

  separateDisplay() {
    this.startingPrice.innerHTML = this.calcStartingPrice;
    this.calculatedPrice.innerHTML = this.calcCalculatedPrice;
    this.totalPrice.innerHTML = this.calculatedPrice.innerHTML;
  },
  getCorrectCount(retrievedData) {
    this.count.forEach((item) => {
      const count = retrievedData.count;
      item.innerHTML = count + wordCorrect(retrievedData.count, WORDS);
    });
  },
});

const totalInfoDisplay = () => {
  const retrievedData = JSON.parse(localStorage.getItem('purchaseData'));

  deliveryCalc(retrievedData).separateDisplay();
  deliveryCalc(retrievedData).getCorrectCount(retrievedData);
};

DELIVERY_PREVIEW &&
  totalInfoDisplay();
