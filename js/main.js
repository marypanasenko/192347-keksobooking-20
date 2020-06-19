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

  var pageActive = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    disableForm(mapFilters, false);
    disableForm(adForm, false);
    window.form.onRoomsForGuestsValidationCheck(window.form.roomNumber, window.form.capacityGuests);
    window.form.onRoomsForGuestsValidationCheck(window.form.capacityGuests, window.form.roomNumber);
    mapPinMain.removeEventListener('mosedown', buttonPress);
    inputAddress.value = locationXMainPin + ', ' + locationYMainPin;

    var activePin = function () {
      mapPins.appendChild(window.pin.fragmentPin);
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
      document.removeEventListener('mouseup', activePin);
    };
    document.addEventListener('mouseup', activePin);
  };

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

  mapPinMain.addEventListener('mousedown', function (evt) {

    if (evt.button === 0) {
      evt.preventDefault();
      var pinAddWidth = Math.round(MAIN_PIN_WIDTH / 2);
      var pinAddHeight = MAIN_PIN_HEIGHT + MAIN_PIN_POINTER;

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var pinX = mapPinMain.offsetLeft - shift.x;
        var pinY = mapPinMain.offsetTop - shift.y;


        if (pinX > window.pin.pin.x.max - pinAddWidth) {
          pinX = window.pin.pin.x.max - pinAddWidth;
        } else if (pinX < window.pin.pin.x.min - pinAddWidth) {
          pinX = window.pin.pin.x.min - pinAddWidth;
        }
        if (pinY > window.pin.pin.y.max - pinAddHeight) {
          pinY = window.pin.pin.y.max - pinAddHeight;
        } else if (pinY < window.pin.pin.y.min - pinAddHeight) {
          pinY = window.pin.pin.y.min - pinAddHeight;
        }

        mapPinMain.style.top = pinY + 'px';
        mapPinMain.style.left = pinX + 'px';

        inputAddress.value = ((pinX + pinAddWidth) + ', ' + (pinY + pinAddHeight));

      };
      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  });

})();
