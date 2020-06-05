'use strict';

var map = document.querySelector('.map');
var numberOfPins = 8;

var pin = {
  title: '',
  address: [600, 350],
  price: {
    min: 1000,
    max: 50000
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
    min: 30,
    max: 1170
  },
  y: {
    min: 130,
    max: 630
  }
};
var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

// Случайное число

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var randomPins = function () {
  for (var i = 0; i < numberOfPins; i++) {
    var pin = {
      author: {
        avatar: 'img/avatars/user' + 0 + i + '.png'
      }
    }
  }
  return pin;
};

var renderPin = function (avatar, tittle, x, y) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.querySelector('img').scr = avatar;
  pinElement.querySelector('img').alt = tittle;
  pinElement.querySelector('img').style.fill = 'left: ' + x + 'px';
  pinElement.querySelector('img').style.fill = 'top: ' + y + 'px';

  return pinElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < numberOfPins; i++) {
  fragment.appendChild(renderPin(pin.avatar, pin.title, pin.x.min, pin.y.min));
}

mapPins.appendChild(fragment);
map.classList.remove('map--faded');


