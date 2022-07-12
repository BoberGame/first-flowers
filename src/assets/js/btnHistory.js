'use strict';

const BACK_BTN = document.querySelectorAll('[data-back]');
const moveBtn = () => {
  history.back();
};

BACK_BTN.forEach((btn) => {
  btn.addEventListener('click', moveBtn);
});
