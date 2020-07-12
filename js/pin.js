'use strict';
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var StartCoordinate = {
    LEFT: 570,
    TOP: 375
  };

  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var renderPin = function (array) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.querySelector('img').src = array.author.avatar;
    pinElement.querySelector('img').alt = array.offer.title;
    pinElement.style.left = array.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = array.location.y - PIN_HEIGHT + 'px';

    return pinElement;
  };

  window.pin = {
    renderPin: renderPin,
    StartCoordinate: StartCoordinate
  };
})();


