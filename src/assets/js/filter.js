'use strict';

const FILTER = document.querySelector('.filter');

if (FILTER) {
  const FILTER_LINK = FILTER.querySelectorAll('.filter__link');
  const FILTER_MENU = FILTER.querySelector('.filter__menu');
  const FILTER_ITEM = document.querySelectorAll('.catalog-item');
  const FILTER_CLOSE = document.querySelector('.filter__close');
  const FILTER_BTN = document.querySelector('.filter__btn');
  const FILTER_CLEAR = document.querySelector('.filter__link--clear');

  const removeClass = (item, name) => {
    item.classList.remove(name);
  };

  FILTER_BTN.addEventListener('click', () => {
    if (!FILTER_MENU.classList.contains('show')) {
      FILTER_MENU.classList.add('show');
    } else {
      removeClass(FILTER_MENU, 'show');
    }
  });

  FILTER_CLOSE.addEventListener('click', () => {
    removeClass(FILTER_MENU, 'show');
  });

  FILTER_LINK.forEach((filterLinkItem) => {
    filterLinkItem.addEventListener('click', (event) => {
      event.preventDefault();
      const FILTER_ATR = event.target.dataset.filter;
      const CONTAINS_ACTIVE = filterLinkItem.classList.contains('active');
      const CONTAINS_CL = filterLinkItem.classList.contains('filter__link--clear');

      FILTER_ITEM.forEach((filterItemElem) => {
        if (filterLinkItem.classList.contains('active')) {
          removeClass(filterItemElem, 'hide');
        } else if (filterItemElem.dataset.item !== FILTER_ATR) {
          filterItemElem.classList.add('hide');
        } else {
          removeClass(filterItemElem, 'hide');
        }

        FILTER_CLEAR.addEventListener('click', () => {
          removeClass(filterLinkItem, 'active');
          removeClass(filterItemElem, 'hide');
        });
      });

      if (!CONTAINS_ACTIVE && !CONTAINS_CL) {
        filterLinkItem.classList.add('active');
      } else {
        removeClass(filterLinkItem, 'active');
      }
    });
  });
}
