'use strict';

var NUMBER_OF_PINS = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;
var MAIN_PIN_POINTER = 22;
var NUMBER_OF_ROOMS = '100';
var NOT_FOR_GUESTS = '0';
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var map = document.querySelector('.map');
var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

var mapPins = document.querySelector('.map__pins');
var adForm = document.querySelector('.ad-form');
var roomNumber = adForm.querySelector('#room_number');
var capacityGuests = adForm.querySelector('#capacity');
var mapFilters = document.querySelector('.map__filters');
var mapPinMain = document.querySelector('.map__pin--main');
var inputAddress = document.querySelector('#address');

var locationXMainPin = Math.round(parseFloat(mapPinMain.style.left) + MAIN_PIN_WIDTH / 2);
var locationYCenterMainPin = Math.round(parseFloat(mapPinMain.style.top) + MAIN_PIN_HEIGHT / 2);
var locationYMainPin = parseFloat(mapPinMain.style.top) + MAIN_PIN_HEIGHT + MAIN_PIN_POINTER;

var disableForm = function (elementClass, trueOrFalse) {
  var formElements = elementClass.children;
  for (var i = 0; i < formElements.length; i++) {
    formElements[i].disabled = trueOrFalse;
  }
};

disableForm(mapFilters, true);
disableForm(adForm, true);

inputAddress.value = locationXMainPin + ', ' + locationYCenterMainPin;

var onRoomsForGuestsValidationCheck = function (listenedElement, element) {
  listenedElement.addEventListener('change', function () {
    var rooms = roomNumber.value;
    var guests = capacityGuests.value;

    if (guests > rooms) {
      listenedElement.setCustomValidity('Выберете больше комнат ' + capacityGuests[capacityGuests.selectedIndex].innerHTML + ' или уменьшите количество комнат');
    } else if (rooms === NUMBER_OF_ROOMS && guests !== NOT_FOR_GUESTS) {
      listenedElement.setCustomValidity('Эта позиция не для гостей');
    } else if (guests === NOT_FOR_GUESTS && rooms !== NUMBER_OF_ROOMS) {
      listenedElement.setCustomValidity('Вам потребуется 100 комнат');
    } else {
      listenedElement.setCustomValidity('');
      element.setCustomValidity('');
    }
  });
};

mapPinMain.addEventListener('mousedown', buttonPress, false);

function buttonPress(e) {
  if (e.button === 0) {
    pageActive();
  }
}

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    pageActive();
  }
});

var pageActive = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  mapPins.appendChild(fragmentPin);
  disableForm(mapFilters, false);
  disableForm(adForm, false);
  onRoomsForGuestsValidationCheck(roomNumber, capacityGuests);
  onRoomsForGuestsValidationCheck(capacityGuests, roomNumber);
  mapPinMain.removeEventListener('mosedown', buttonPress);
  inputAddress.value = locationXMainPin + ', ' + locationYMainPin;
};

cardTemplate.querySelector('.popup__features').innerHTML = '';

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
    min: 130,
    max: 630
  }
};

// var offerType = {
//   flat: 'Квартира',
//   bungalo: 'Бунгало',
//   house: 'Дом',
//   palace: 'Дворец'
// };

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

var getPinArray = function (numberOfPins) {
  var pinsArray = [];
  for (var i = 1; i < numberOfPins + 1; i++) {
    var locationX = getRandomIntInclusive(pin.x.min, pin.x.max);
    var locationY = getRandomIntInclusive(pin.y.min, pin.y.max);
    var randomPins = {
      author: {
        avatar: 'img/avatars/user' + 0 + i + '.png'
      },
      offer: {
        title: getRandomStringElement(pin.title),
        address: locationX.toString() + ', ' + locationY.toString(),
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
        x: locationX,
        y: locationY
      }
    };
    pinsArray.push(randomPins);
  }
  return pinsArray;
};
var pinsArray = getPinArray(NUMBER_OF_PINS);

var renderPin = function (array) {

  var pinElement = pinTemplate.cloneNode(true);

  pinElement.querySelector('img').src = array.author.avatar;
  pinElement.querySelector('img').alt = array.offer.title;
  pinElement.style.left = array.location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = array.location.y - PIN_HEIGHT + 'px';

  return pinElement;
};

// var renderCard = function (array) {
//
//   var cardElement = cardTemplate.cloneNode(true);
//
//   cardElement.querySelector('.popup__title').textContent = array.offer.title;
//   cardElement.querySelector('.popup__text--address').textContent = array.offer.address;
//   cardElement.querySelector('.popup__text--price').textContent = array.offer.price + ' ₽/ночь';
//   cardElement.querySelector('.popup__type').textContent = offerType[array.offer.type];
//   cardElement.querySelector('.popup__text--capacity').textContent = array.offer.rooms + ' комнаты для ' + array.offer.guests + ' гостей';
//   cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + array.offer.checkin + ', выезд до ' + array.offer.checkout;
//
//   if (array.offer.features.length >= 1) {
//     for (var j = 0; j < array.offer.features.length; j++) {
//       var cardLiElement = document.createElement('li');
//       cardLiElement.classList.add('popup__feature');
//       cardLiElement.classList.add('popup__feature--' + array.offer.features[j]);
//       cardElement.querySelector('.popup__features').appendChild(cardLiElement);
//     }
//   }
//
//   cardElement.querySelector('.popup__description').textContent = array.offer.description;
//
//   cardElement.querySelector('.popup__photo').src = array.offer.photos[0];
//   if (array.offer.photos.length > 1) {
//     for (var i = 1; i < array.offer.photos.length; i++) {
//       var cardImgElement = cardTemplate.querySelector('.popup__photo').cloneNode();
//       cardImgElement.src = array.offer.photos[i];
//       cardElement.querySelector('.popup__photos').appendChild(cardImgElement);
//     }
//   }
//
//   cardElement.querySelector('.popup__avatar').src = array.author.avatar;
//
//   return cardElement;
// };

var fragmentPin = document.createDocumentFragment();
for (var i = 0; i < NUMBER_OF_PINS; i++) {
  fragmentPin.appendChild(renderPin(pinsArray[i]));
}

// var mapFiltersContainer = document.querySelector('.map__filters-container');
//
// var newCard = (renderCard(pinsArray[0]));

// map.insertBefore(newCard, mapFiltersContainer);
