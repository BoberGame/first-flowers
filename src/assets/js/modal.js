'use strict';

function _createModal(options) {
  const DEFAULT_WIDTH = '400px';
  const MODAL = document.createElement('div');
  const MODAL_CLOSE = `<span class="modal-close" data-close="true">&times;</span>`;
  MODAL.classList.add('vmodal');
  MODAL.insertAdjacentHTML('afterbegin', `
        <div class="modal-overlay" data-close="true">
            <div class="modal-window" style="width: ${options.width || DEFAULT_WIDTH}">
                <div class="modal-header">
                    ${options.closable ? MODAL_CLOSE : ''}
                </div>
                <div class="modal-body" data-content>
                    ${options.content || ''}
                </div>
            </div>
        </div>
    `);
  document.body.appendChild(MODAL);
  return MODAL;
}

$.modal = function(options) {
  const ANIMATION_SPEED = 300;
  const $modal = _createModal(options);
  let closing = false;
  let destroyed = false;

  const modal = {
    open() {
      if (destroyed) console.log('Modal destroyed');
      !closing && $modal.classList.add('open');
    },
    close() {
      closing = true;
      $modal.classList.remove('open');
      $modal.classList.add('hide');
      setTimeout(() => {
        $modal.classList.remove('hide');
        closing = false;
      }, ANIMATION_SPEED);
    },
  };

  const listener = (event) => {
    if (event.target.dataset.close) {
      modal.close();
    }
  };

  $modal.addEventListener('click', listener);

  return Object.assign(modal, {
    destroy() {
      $modal.parentNode.removeChild($modal);
      $modal.removeEventListener('click', listener);
      destroyed = true;
    },
    setContent(html) {
      $modal.querySelector('[data-content').innerHTML = html;
    },
  });
};
