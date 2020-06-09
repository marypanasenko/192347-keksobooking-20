'use strict';
var NUMBER_OF_PINS = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var map = document.querySelector('.map');
var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

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
    min: 100,
    max: 1100
  },
  y: {
    min: 200,
    max: 600
  }
};

var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomStringElement = function (array) {
  return array[getRandomIntInclusive(0, array.length - 1)];
};

var shuffleArray = function (array) {
  var copy = [];
  var n = array.length;
  var i;
  // While there remain elements to shuffle…
  while (n) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * n--);
    // And move it to the new array.
    copy.push(array.splice(i, 1)[0]);
  }
  return copy;
};

var getOfferType = function (array) {
  var value;
  if (array.offer.type === 'flat') {
    value = 'Квартира';
  } else if (array.offer.type === 'bungalo') {
    value = 'Бунгало';
  } else if (array.offer.type === 'house') {
    value = 'Дом';
  } else if (array.offer.type === 'palace') {
    value = 'Дворец';
  }
  return value;
};

var getPinsArray = function () {
  var pinsArray = [];
  for (var i = 1; i < NUMBER_OF_PINS + 1; i++) {
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
        features: shuffleArray(pin.features.slice(0, getRandomIntInclusive(1, pin.features.length))),
        description: pin.description,
        photos: shuffleArray(pin.photos.slice(0, getRandomIntInclusive(1, pin.photos.length))),
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
  pinElement.style.left = array.location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = array.location.y - PIN_HEIGHT + 'px';

  return pinElement;
};

var renderCard = function (array) {

  var cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = array.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = array.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = array.offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__type').textContent = getOfferType(array);
  cardElement.querySelector('.popup__text--capacity').textContent = array.offer.rooms + ' комнаты для ' + array.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + array.offer.checkin + ', выезд до ' + array.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = array.offer.features;
  cardElement.querySelector('.popup__description').textContent = array.offer.description;

  cardElement.querySelector('.popup__photo').src = array.offer.photos[0];
  if (array.offer.photos.length > 1) {
    for (var j = 1; j < array.offer.photos.length; j++) {
      var cardImgElement = cardTemplate.querySelector('.popup__photo').cloneNode();
      cardImgElement.src = array.offer.photos[j];
      cardElement.querySelector('.popup__photos').appendChild(cardImgElement);
    }
  }

  cardElement.querySelector('.popup__avatar').src = array.author.avatar;

  cardElement.style.left = array.location.x + 'px';
  cardElement.style.top = array.location.y + 'px';

  return cardElement;
};

var fragmentPin = document.createDocumentFragment();
for (var i = 0; i < NUMBER_OF_PINS; i++) {
  fragmentPin.appendChild(renderPin(pinsArray[i]));
}

var mapFiltersContainer = document.querySelector('.map__filters-container');
var fragmentCard = document.createDocumentFragment();
for (var j = 0; j < NUMBER_OF_PINS; j++) {
  fragmentCard.appendChild(renderCard(pinsArray[j]));
}

mapPins.appendChild(fragmentPin);

map.insertBefore(fragmentCard, mapFiltersContainer);

map.classList.remove('map--faded');


