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

  var renderPin = function (object) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.querySelector('img').src = object.author.avatar;
    pinElement.querySelector('img').alt = object.offer.title;
    pinElement.style.left = object.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = object.location.y - PIN_HEIGHT + 'px';

    return pinElement;
  };

  window.pin = {
    renderPin: renderPin,
    StartCoordinate: StartCoordinate
  };
})();


