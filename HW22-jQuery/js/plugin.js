(function ($) {
  $.fn.modal = function (options) {
    const settings = $.extend({
      type: 'success',
      buttons: '2',
      modal: 'modal-window',
      close: 'modal-close',
      text: 'Are you sure you want to delete this post?',
      wrapper: 'modal-wrapper',
      svg: '<svg><use href="img/sprite.svg#close-button"></use></svg>',
      btn: 'modal-button',
    }, options);

    const main = $('main');

    function createModal() {
      let cancelBtn;

      main.on('keydown', (e) => {
        if (e.keyCode === 27) {
          $(this).closeModal(modal, wrapper);
        }
      });

      const wrapper = $('<div />', {
        class: settings.wrapper,
      }).on('click', () => {
        $(this).closeModal(modal, wrapper);
      });

      const okBtn = $('<button />', {
        class: settings.btn,
        text: 'OK',
      });

      if (settings.buttons === '2') {
        cancelBtn = $('<button />', {
          class: settings.btn,
          text: 'Cancel',
        });
      }

      const closeBtn = $('<div />', {
        html: settings.svg,
        class: settings.close,
      }).on('click', () => {
        $(this).closeModal(modal, wrapper);
      });

      const modal = $('<div />', {
        text: settings.text,
        class: `${settings.modal} ${settings.type}`,
      }).append(closeBtn).append(okBtn).append(cancelBtn);

      main.prepend(wrapper, modal);
    }

    createModal();

    return this;
  };

  $.fn.closeModal = function (modal, wrapper) {
    modal.fadeOut(1000);
    setTimeout(() => modal.remove(), 1000);
    wrapper.remove();
  };
})(jQuery);

$('body').on('click', '.user-info__del-btn', deletePost);

function deletePost() {
  jQuery().modal();
}

$(document).ready(() => {
  setTimeout(showSubscribeWindow, 10000);
});

function showSubscribeWindow() {
  if ($('.modal-wrapper').length > 0) {
    $('.modal-wrapper').remove();
    $('.modal-window').remove();
  }

  jQuery().modal({
    text: 'Subscribe to this blog and be the first to know about updates',
    buttons: '1',
    type: 'info',
  });
}

$(window).on('unload', () => {
  $('body').off('click', '**');
  $('main').off('click', '.modal-wrapper', jQuery().closeModal);
  $('main').off('click', '.modal-close', jQuery().closeModal);
  $('main').off('keydown', 'main', jQuery().closeModal);
});