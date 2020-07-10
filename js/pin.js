'use strict';
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var START_COORDINATES = {
    left: 570,
    top: 375
  };

  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var pin = {
    x: {
      min: 0,
      max: 1200
    },
    y: {
      min: 130,
      max: 630
    }
  };

  var renderPin = function (array) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.querySelector('img').src = array.author.avatar;
    pinElement.querySelector('img').alt = array.offer.title;
    pinElement.style.left = array.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = array.location.y - PIN_HEIGHT + 'px';

    return pinElement;
  };

  window.pin = {
    pin: pin,
    renderPin: renderPin,
    START_COORDINATES: START_COORDINATES

  };
})();


