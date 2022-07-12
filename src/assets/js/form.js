'use strict';

import { orderForms } from './order';
import { PURCHASE_FORM } from './counter';

const TO_ME_BTN = document.getElementById('deliveryMeBtn');
const GIFT_BTN = document.getElementById('deliveryGiftBtn');
const ORDER_FAST_BTN = document.querySelector('[data-fastOrder]');
const FORM = orderForms.formFirst;
const FORM_GIFT_ATTR = 'delivery-to-me-third.html';
const FORM_TO_ME_ATTR = 'delivery-to-me-second.html';
const CHECKBOX_ID = 'deliveryAgreeCheckBox';
const INSERT_CHECKBOX = document.getElementById('insertLabel');
const CHECKBOX = `
<label class="delivery-form__label delivery-form__label--checkbox ms-3 col-md-5" for="deliveryAgreeCheckBox">
<input class="delivery-form__input--checkbox" name="deliveryAgreeCheckbox" id="${CHECKBOX_ID}" type="checkbox">
<span class="delivery-form__name">Согласовать с получателем</span>
</label>`;
const ADDITIONAL_FIELD = `
<label class="delivery-form__label col-md-6" for="deliveryInputName">
    Дополнительная информация:
    <textarea class="delivery-form__input  delivery-form__input--textarea" name="deliveryInputAdditional" id="deliveryTextarea"></textarea>
</label>`;

let div = '';
let divAdd = '';

const createBlock = (name, obj, ...classes) => {
  name = document.createElement('div');
  name.innerHTML = obj;
  classes.forEach((item) => {
    name.classList.add(item);
  });
  return name;
};

const removeState = (obj1, obj2, state) => {
  obj1.classList.remove(state);
  obj2.classList.add(state);
};

const validateBlock = (insertObj, type, obj) => {
  insertObj.insertAdjacentElement(type, obj);
};

const removeAgreeElement = (elements) => elements.remove();

const checkBoxChangeState = () => {
  const INPUT_CHECKBOX = document.getElementById(CHECKBOX_ID);
  let oldChild;

  INPUT_CHECKBOX.addEventListener('change', () => {
    if (FORM.classList.contains('hasAddField') !== true) {
      FORM.classList.add('hasAddField');
      if (oldChild === undefined) {
        divAdd = createBlock(divAdd, ADDITIONAL_FIELD, 'row', 'my-2');
        validateBlock(INSERT_CHECKBOX, 'beforebegin', divAdd);
      } else {
        divAdd = oldChild;
        validateBlock(INSERT_CHECKBOX, 'beforebegin', divAdd);
      }
    } else {
      oldChild = divAdd.parentElement.removeChild(divAdd);
      FORM.classList.remove('hasAddField');
    }
  });
};

const changeFormAttr = (element, name, newAttr) => {
  element.setAttribute(name, newAttr);
};

GIFT_BTN &&
  GIFT_BTN.addEventListener('click', (event) => {
    event.preventDefault();
    if (!GIFT_BTN.classList.contains('active')) {
      div = createBlock(div, CHECKBOX, 'row', 'my-5');
      validateBlock(FORM, 'afterbegin', div);
      removeState(TO_ME_BTN, GIFT_BTN, 'active');
      checkBoxChangeState();
      changeFormAttr(FORM, 'action', FORM_GIFT_ATTR);
    }
  });

TO_ME_BTN &&
  TO_ME_BTN.addEventListener('click', (event) => {
    event.preventDefault();
    if (!TO_ME_BTN.classList.contains('active')) {
      removeState(GIFT_BTN, TO_ME_BTN, 'active');
      removeAgreeElement(div, divAdd);
      changeFormAttr(FORM, 'action', FORM_TO_ME_ATTR);
    }
  });

ORDER_FAST_BTN &&
  ORDER_FAST_BTN.addEventListener('click', () => {
    const FORM_FAST_ATTR = 'delivery-oneclick-first.html';
    changeFormAttr(PURCHASE_FORM, 'action', FORM_FAST_ATTR);
  });
