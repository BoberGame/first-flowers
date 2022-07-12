'use strict';

export const orderForms = {
  formFirst: document.getElementById('orderFormFirst'),
  formSecond: document.getElementById('orderFormSecond'),
};
const ORDER_FINISH_BTN = document.getElementById('orderFinishBtn');
const ORDER_NUMBER = document.getElementById('orderNumber');

const getInfo = {
  infoFirst(info, orderData) {
    const ORDER_POSTCARD = document.getElementById('deliveryPostCardText');
    info.name = orderData.get('deliveryInputName');
    info.phone = orderData.get('deliveryInputTel');
    info.postcard = orderData.get('deliveryCheckbox');
    info.postcardText = ORDER_POSTCARD.value;
    return info;
  },
  infoSecond(info, orderData) {
    const TIME_ORDER = document.querySelector('.select__current');
    info.address = orderData.get('deliveryInputAddress');
    info.dateOrder = orderData.get('deliveryInputDateOrder');
    info.additional = orderData.get('deliveryInputAdditional');
    info.timeOrder = TIME_ORDER.innerHTML;
    return info;
  },
};

const insertLocalData = (name, newData) => {
  const localStorageData = JSON.parse(localStorage.getItem(name));
  for (const key in newData) {
    localStorageData[key] = newData[key];
  }
  localStorage.setItem(name, JSON.stringify(localStorageData));
};

const getOrderData = (form, getFunction) => {
  form.addEventListener('submit', (event) => {
    const orderFormData = new FormData(event.target);
    const orderInfo = {};
    getFunction(orderInfo, orderFormData);
    insertLocalData('purchaseData', orderInfo);
  });
};

orderForms.formFirst &&
  getOrderData(orderForms.formFirst, getInfo.infoFirst);

orderForms.formSecond &&
  getOrderData(orderForms.formSecond, getInfo.infoSecond);

const getRandomInt = (min, max) => {
  const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  ORDER_NUMBER.innerText = randomNum;
};

ORDER_FINISH_BTN &&
  ORDER_FINISH_BTN.addEventListener('click', () => {
    localStorage.removeItem('purchaseData');
  });
ORDER_NUMBER &&
  getRandomInt(100000, 999999);
