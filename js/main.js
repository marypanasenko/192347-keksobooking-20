'use strict';

var map = document.querySelector('.map');
var numberOfPins = 8;

var pin = {
  title: 'Новый дом',
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

console.log(pin.x.min);
var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

// Случайное число
var mapPin = document.querySelector('.map__pin');
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getPinsArray = function () {
  var pinsArray = [];
  for (var i = 1; i < numberOfPins + 1; i++) {
    var randomPins = {
      author: {
        avatar: 'img/avatars/user' + 0 + i + '.png'
      },
      offer: {
        title: pin.title,
        address: pin.address
      }
    }
    pinsArray.push(randomPins);
  }
  return pinsArray;
};
var pinsArray = getPinsArray();
console.log(pinsArray);

var renderPin = function (pinsArray) {

  var pinElement = pinTemplate.cloneNode(true);

  pinElement.querySelector('img').scr = pinsArray.author.avatar;
  pinElement.querySelector('img').alt = pinsArray.offer.title;
  // pinElement.style.left = x + 'px';
  // pinElement.style.top = y + 'px';

  return pinElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < numberOfPins; i++) {
  fragment.appendChild(renderPin(pinsArray[i]));
}

mapPins.appendChild(fragment);
map.classList.remove('map--faded');


