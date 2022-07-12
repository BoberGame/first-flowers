/* eslint-disable max-len */
'use strict';
const POSTCARD = document.getElementById('deliveryCheckbox');

if (POSTCARD) {
  const myModal = $.modal({
    title: 'My modal',
    closable: false,
    content: `
        <label class="delivery-form__label delivery-form__label--checkbox" for="deliveryCheckboxFirstModal">
            <input class="delivery-form__input--checkbox" name="deliveryCheckboxModal" id="deliveryCheckboxFirstModal" type="checkbox">
            <span class="delivery-form__name">Добавить в заказ открытку (бесплатно)</span>
        </label>
        <label class="delivery-form__label delivery-form__label--checkbox mt-2 mb-3" for="deliveryCheckboxSecondModal">
            <input class="delivery-form__input--checkbox" name="deliveryCheckboxModal" id="deliveryCheckboxSecondModal" type="checkbox">
            <span class="delivery-form__name">Добавить в заказ открытку (бесплатно)</span>
        </label>
        <label class="delivery-form__label" for="deliveryPostCardText">
            Текст открытки:
            <textarea class="delivery-form__input delivery-form__input--textarea mb-0 modal-textarea" maxlength="100" name="deliveryPostCardText" id="deliveryPostCardText"></textarea>
        </label>
        <span class="modal-counter">Символов: 0 из 100</span>
        `,
    width: '400px',
  });

  window.myModal = myModal;
  POSTCARD.addEventListener('click', myModal.open);
}
