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

    var buttonErrorCloseHandler = function () {
      errorPopup.remove();
      document.removeEventListener('mousedown', buttonErrorCloseHandler);
    };

    var buttonErrorOnDocumentCloseHandler = function (evt) {
      if (evt.target !== errorButton) {
        errorPopup.remove();
        document.removeEventListener('mousedown', buttonErrorOnDocumentCloseHandler);
      }
    };

    errorButton.addEventListener('mousedown', buttonErrorCloseHandler);
    document.addEventListener('mousedown', buttonErrorOnDocumentCloseHandler);
    document.addEventListener('keydown', function (evt) {
      window.util.escPressHandler(evt, errorPopup);
    });
  };
  window.error = {
    errorHandler: errorHandler
  };
})();

