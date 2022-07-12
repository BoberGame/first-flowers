'use strict';

const LOAD_BTN = document.querySelectorAll('.catalog-load__btn');
const requestURLS = {
  urlFirst: 'data.html',
  urlSecond: 'data-2.html',
  urlThird: 'data-3.html',
};

const DATA_SLICE_PATH_FISRT = '<div class="col-lg-3 col-sm-6 gy-5">';
const DATAS_LICE_PATH_SECOND = '</div><!-- End -->';
const REQUEST_TIME = 300;
let dataBody;

const findIndexData = (data, pathFirst, pathSecond) => {
  const dataStart = data.indexOf(pathFirst);
  const dataEnd = data.indexOf(pathSecond);
  dataBody = data.slice(dataStart, dataEnd);
  return dataBody;
};

const insertData = (body, container) => {
  const div = document.createElement('div');
  div.innerHTML = body;
  div.classList.add('row', 'gx-4', 'mb-5');
  document.querySelector(container).appendChild(div);
};

const sendRequest = (method, url, container) => fetch(url)
  .then((data) => data.text())
  .then((data) => {
    setTimeout(() => {
      findIndexData(data, DATA_SLICE_PATH_FISRT, DATAS_LICE_PATH_SECOND);
      insertData(dataBody, container);
    }, REQUEST_TIME);
  })
  .catch((error) => {
    console.log('Error', error);
  });

LOAD_BTN.forEach((item) => {
  item.addEventListener('click', (event) => {
    event.preventDefault();
    if (item.id === 'load_BtnFirst') {
      sendRequest('GET', requestURLS.urlFirst, '#loadContainer');
    }
    if (item.id === 'load_BtnSecond') {
      sendRequest('GET', requestURLS.urlSecond, '#loadContainerSecond');
    }
    if (item.id === 'load_BtnThird') {
      sendRequest('GET', requestURLS.urlThird, '#loadContainerThird');
    }
  });
});
