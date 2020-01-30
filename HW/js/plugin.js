export function createModalWindow() {
  $.fn.closeModal = function (modal, wrapper) {
    modal.fadeOut(1000);
    setTimeout(() => modal.remove(), 1000);
    wrapper.remove();
  };

  $.fn.modal = function (options) {
    const settings = $.extend(
      {
        type: 'success',
        buttons: '2',
        modal: 'modal-window',
        close: 'modal-close',
        text: 'Are you sure you want to delete this post?',
        wrapper: 'modal-wrapper',
        svg: '<svg><use href="img/sprite.svg#close-button"></use></svg>',
        okBtn: 'modal-button ok-btn',
        cancelBtn: 'modal-button cancel-btn',
      },
      options,
    );

    const main = jQuery('main');

    function createModal() {
      let cancelBtn;

<<<<<<< HEAD
      main.one('keydown', (e) => {
=======
      main.on('keydown', (e) => {
>>>>>>> 034f284344dfea54d3d60a7e56d866303e307789
        if (e.keyCode === 27) {
          $(this).closeModal(modal, wrapper);
        }
      });

      const wrapper = $('<div />', {
        class: settings.wrapper,
<<<<<<< HEAD
      }).one('click', () => {
=======
      }).on('click', () => {
>>>>>>> 034f284344dfea54d3d60a7e56d866303e307789
        $(this).closeModal(modal, wrapper);
      });

      const okBtn = $('<button />', {
        class: settings.okBtn,
        text: 'OK',
        dataset: settings.attr1,
<<<<<<< HEAD
      }).one('click', () => {
        $(this).closeModal(modal, wrapper);
=======
>>>>>>> 034f284344dfea54d3d60a7e56d866303e307789
      });

      if (settings.buttons === '2') {
        cancelBtn = $('<button />', {
          class: settings.cancelBtn,
          text: 'Cancel',
        });
      }

      const closeBtn = $('<div />', {
        html: settings.svg,
        class: settings.close,
<<<<<<< HEAD
      }).one('click', () => {
=======
      }).on('click', () => {
>>>>>>> 034f284344dfea54d3d60a7e56d866303e307789
        $(this).closeModal(modal, wrapper);
      });

      const modal = $('<div />', {
        text: settings.text,
        class: `${settings.modal} ${settings.type}`,
      })
        .append(closeBtn)
        .append(okBtn)
        .append(cancelBtn);

      main.prepend(wrapper, modal);
    }

    createModal();

    return this;
  };
}

export function showSubscribeWindow() {
  setTimeout(showModal, 10000);

  function showModal() {
    if ($('.modal-wrapper').length > 0) {
      $('.modal-wrapper').remove();
      $('.modal-window').remove();
    }

    $().modal({
      text: 'Subscribe to this blog and be the first to know about updates',
      buttons: '1',
      type: 'info',
    });
  }
}