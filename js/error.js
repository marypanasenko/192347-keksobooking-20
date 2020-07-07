'use strict';
(function () {
  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  var errorHandler = function (errorMessage) {
    var errorElement = errorTemplate.cloneNode(true);
    errorElement.querySelector('.error__message').textContent = errorMessage;
    document.querySelector('main').appendChild(errorElement);

    var errorPopup = document.querySelector('.error');
    var errorButton = document.querySelector('.error__button');

    var removeErrorOnButtonHandler = function () {
      errorPopup.remove();
      document.removeEventListener('mousedown', removeErrorOnButtonHandler);
    };

    var removeErrorOnDocumentHandler = function (evt) {
      if (evt.target !== errorButton) {
        errorPopup.remove();
        document.removeEventListener('mousedown', removeErrorOnDocumentHandler);
      }
    };
    var onEscPress = function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        errorPopup.remove();
        document.removeEventListener('keydown', onEscPress);
      }
    };
    errorButton.addEventListener('mousedown', removeErrorOnButtonHandler);
    document.addEventListener('mousedown', removeErrorOnDocumentHandler);
    document.addEventListener('keydown', onEscPress);
  };
  window.error = {
    errorHandler: errorHandler
  };
})();

