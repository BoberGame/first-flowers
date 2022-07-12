'use strict';

const $SELECT = document.querySelector('.select');
const select = () => {
  const SELECTHEADER = $SELECT.querySelectorAll('.select__header');
  const SELECTITEM = $SELECT.querySelectorAll('.select__item');

  SELECTHEADER.forEach((item) => {
    item.addEventListener('click', selectToggle);
  });

  SELECTITEM.forEach((item) => {
    item.addEventListener('click', selectChoose);
  });

  function selectToggle() {
    this.parentElement.classList.toggle('active');
  }

  function selectChoose() {
    const TEXT = this.innerText;
    const SELECT = this.closest('.select');
    const CURRENT_TEXT = SELECT.querySelector('.select__current');
    CURRENT_TEXT.innerText = TEXT;
    SELECT.classList.remove('active');
  }

  document.addEventListener('click', (event) => {
    if (event.target.dataset.SELECT) {
      $SELECT.classList.remove('active');
    }
  });
};

$SELECT &&
  select();
