'use strict';
(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_POINTER = 22;


  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');

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

  inputAddress.value = locationXMainPin + ', ' + locationYCenterMainPin;

  var removeCard = function () {
    var card = document.querySelector('.map__card');
    var pinActive = document.querySelector('.map__pin--active');
    if (pinActive) {
      pinActive.classList.remove('map__pin--active');
    }
    if (card) {
      card.remove();
    }
    document.removeEventListener('keydown', onCardEscPress);
  };

  var onCardEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      removeCard();
    }
  };

  var pageActive = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    mapPins.appendChild(window.pin.fragmentPin);
    disableForm(mapFilters, false);
    disableForm(adForm, false);
    window.form.onRoomsForGuestsValidationCheck(window.form.roomNumber, window.form.capacityGuests);
    window.form.onRoomsForGuestsValidationCheck(window.form.capacityGuests, window.form.roomNumber);
    mapPinMain.removeEventListener('mosedown', buttonPress);
    inputAddress.value = locationXMainPin + ', ' + locationYMainPin;

    var mapPin = mapPins.querySelectorAll('button:not(.map__pin--main)');

    var onPinClick = function (pinOnMap, array) {
      pinOnMap.addEventListener('click', function () {
        removeCard();
        pinOnMap.classList.add('map__pin--active');
        var newCard = (window.card.renderCard(array));
        var mapFiltersContainer = document.querySelector('.map__filters-container');
        map.insertBefore(newCard, mapFiltersContainer);

        var popupClose = document.querySelector('.popup__close');

        popupClose.addEventListener('click', function (evt) {
          evt.preventDefault();
          removeCard();
        });
        document.addEventListener('keydown', onCardEscPress);
      });
    };
    for (var j = 0; j < window.data.NUMBER_OF_PINS; j++) {
      onPinClick(mapPin[j], window.pin.pinsArray[j]);
    }
  };


  disableForm(mapFilters, true);
  disableForm(adForm, true);

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
})();
