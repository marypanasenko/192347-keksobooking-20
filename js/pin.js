'use strict';
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var pin = {
    title: ['Одноэтажный дом', 'Высотка', 'Многоэтажный дом', 'Котедж'],
    address: '600, 350',
    price: {
      min: 1000,
      max: 9000
    },
    type: ['palace', 'flat', 'house', 'bungalo'],
    rooms: {
      min: 1,
      max: 4
    },
    guests: {
      min: 1,
      max: 8
    },
    checkin: ['12:00', '13:00', '14:00'],
    checkout: ['12:00', '13:00', '14:00'],
    features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    description: '',
    photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
    x: {
      min: 0,
      max: 1200
    },
    y: {
      min: 130,
      max: 630
    }
  };

  var getPinArray = function (numberOfPins) {
    var pinsArray = [];
    for (var i = 1; i < numberOfPins + 1; i++) {
      var locationX = window.util.getRandomIntInclusive(pin.x.min, pin.x.max);
      var locationY = window.util.getRandomIntInclusive(pin.y.min, pin.y.max);
      var randomPins = {
        author: {
          avatar: 'img/avatars/user' + 0 + i + '.png'
        },
        offer: {
          title: window.util.getRandomStringElement(pin.title),
          address: locationX.toString() + ', ' + locationY.toString(),
          price: window.util.getRandomIntInclusive(pin.price.min, pin.price.max),
          type: window.util.getRandomStringElement(pin.type),
          rooms: window.util.getRandomIntInclusive(pin.rooms.min, pin.rooms.max),
          guests: window.util.getRandomIntInclusive(pin.guests.min, pin.guests.max),
          checkin: window.util.getRandomStringElement(pin.checkin),
          checkout: window.util.getRandomStringElement(pin.checkout),
          features: window.util.shuffleArray(pin.features.slice(0, window.util.getRandomIntInclusive(1, pin.features.length))),
          description: pin.description,
          photos: window.util.shuffleArray(pin.photos.slice(0, window.util.getRandomIntInclusive(1, pin.photos.length))),
        },
        location: {
          x: locationX,
          y: locationY
        }
      };
      pinsArray.push(randomPins);
    }
    return pinsArray;
  };
  var pinsArray = getPinArray(window.data.NUMBER_OF_PINS);

  var renderPin = function (array) {

    var pinElement = pinTemplate.cloneNode(true);

    pinElement.querySelector('img').src = array.author.avatar;
    pinElement.querySelector('img').alt = array.offer.title;
    pinElement.style.left = array.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = array.location.y - PIN_HEIGHT + 'px';

    return pinElement;
  };

  var fragmentPin = document.createDocumentFragment();
  for (var i = 0; i < window.data.NUMBER_OF_PINS; i++) {
    fragmentPin.appendChild(renderPin(pinsArray[i]));
  }
  window.pin = {
    pin: pin,
    fragmentPin: fragmentPin,
    pinsArray: pinsArray
  };
})();


