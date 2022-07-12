'use strict';

const TEXTAREA = document.querySelectorAll('.delivery-form__input--textarea');
TEXTAREA &&
  TEXTAREA.forEach((item) => {
    const TEXTAREA_HEIGHT = item.offsetHeight;
    item.addEventListener('input', (event) => {
      const $this = event.target;
      $this.style.height = TEXTAREA_HEIGHT + 'px';
      $this.style.height = $this.scrollHeight + 'px';
    });
  });
