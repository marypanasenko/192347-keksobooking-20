'use strict';

var map = document.querySelector('.map');
var numberOfPins = 8;

var pin = {
  title: ['Одноэтажный дом', 'Высотка', 'Многоэтажный дом', 'Котедж'],
  address: '600, 350',
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
    min: 50,
    max: 1150
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

var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomStringElement = function (array) {
  return array[getRandomIntInclusive(0, array.length - 1)];
};

var getRandomLengthArray = function (array) {
  var newArray = [];
  for (var i = 0; i < getRandomIntInclusive(0, 10); i++) {
    var newElement = getRandomStringElement(array);
    newArray.push(newElement);
  }
  return newArray;
};

var getPinsArray = function () {
  var pinsArray = [];
  for (var i = 1; i < numberOfPins + 1; i++) {
    var randomPins = {
      author: {
        avatar: 'img/avatars/user' + 0 + i + '.png'
      },
      offer: {
        title: getRandomStringElement(pin.title),
        address: pin.address,
        price: getRandomIntInclusive(pin.price.min, pin.price.max),
        type: getRandomStringElement(pin.type),
        rooms: getRandomIntInclusive(pin.rooms.min, pin.rooms.max),
        guests: getRandomIntInclusive(pin.guests.min, pin.guests.max),
        checkin: getRandomStringElement(pin.checkin),
        checkout: getRandomStringElement(pin.checkout),
        features: getRandomStringElement(pin.features),
        description: pin.description,
        photos: getRandomLengthArray(pin.photos)
      },
      location: {
        x: getRandomIntInclusive(pin.x.min, pin.x.max),
        y: getRandomIntInclusive(pin.y.min, pin.y.max)
      }
    };
    pinsArray.push(randomPins);
  }
  return pinsArray;
};
var pinsArray = getPinsArray();

var renderPin = function (array) {

  var pinElement = pinTemplate.cloneNode(true);

  pinElement.querySelector('img').src = array.author.avatar;
  pinElement.querySelector('img').alt = array.offer.title;
  pinElement.style.left = array.location.x + 'px';
  pinElement.style.top = array.location.y + 'px';

  return pinElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < numberOfPins; i++) {
  fragment.appendChild(renderPin(pinsArray[i]));
}

mapPins.appendChild(fragment);
map.classList.remove('map--faded');


