'use strict';

const POSTCARD_FORM = document.querySelector('.delivery-form__label--checkbox');
const charCounter = (text) => text.replace(/[ ]*/g, '').length;

if (document.body.contains(POSTCARD_FORM)) {
  document.addEventListener('input', (event) => {
    if (event.target.nodeName === 'TEXTAREA') {
      const input = document.getElementById('deliveryPostCardText');
      const counter = document.querySelector('.modal-counter');
      counter.innerHTML = `Символов: ${charCounter(input.value)} из 100`;
    }
  });
}
// return text.replace(/[\.,!?; ]*/g, '').length; remove: dots, spaces, etc
