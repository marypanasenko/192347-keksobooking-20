'use strict';
(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_POINTER = 22;
  var ANY = 'any';
  var HousePriceValue = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high'
  };

  var main = document.querySelector('main');
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');

  var mapFilters = document.querySelector('.map__filters');
  var mapPinMain = document.querySelector('.map__pin--main');

  var inputAddress = document.querySelector('#address');
  var selectHouseType = document.querySelector('#housing-type');
  var selectHousePrice = document.querySelector('#housing-price');
  var selectHouseRooms = document.querySelector('#housing-rooms');
  var selectHouseGuests = document.querySelector('#housing-guests');

  var locationXMainPin = Math.round(parseFloat(mapPinMain.style.left) + MAIN_PIN_WIDTH / 2);
  var locationYCenterMainPin = Math.round(parseFloat(mapPinMain.style.top) + MAIN_PIN_HEIGHT / 2);
  var locationYMainPin = parseFloat(mapPinMain.style.top) + MAIN_PIN_HEIGHT + MAIN_PIN_POINTER;

  inputAddress.value = locationXMainPin + ', ' + locationYCenterMainPin;

  window.util.disableForm(mapFilters, true);
  window.util.disableForm(adForm, true);

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
  var loadedPins = [];

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

  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  var formMessage = function () {
    var successElement = successTemplate.cloneNode(true);
    main.appendChild(successElement);

    var successPopup = document.querySelector('.success');
    var successPopupMessage = document.querySelector('.success__message');

    var removeSuccessPopupOnDocumentHandler = function (evt) {
      if (evt.target !== successPopupMessage) {
        successPopup.remove();
        document.removeEventListener('mousedown', removeSuccessPopupOnDocumentHandler);
      }
    };
    var onEscPress = function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        successPopup.remove();
        document.removeEventListener('keydown', onEscPress);
      }
    };
    document.addEventListener('mousedown', removeSuccessPopupOnDocumentHandler);
    document.addEventListener('keydown', onEscPress);
  };


  var deletePins = function () {
    var mapPin = mapPins.querySelectorAll('button:not(.map__pin--main)');
    for (var j = 0; j < mapPin.length; j++) {
      mapPin[j].remove();
    }
  };
  var adFormReset = document.querySelector('.ad-form__reset');

  var pageReset = function () {
    adFormReset.removeEventListener('click', pageReset);
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.util.disableForm(mapFilters, true);
    window.util.disableForm(adForm, true);
    adForm.reset();
    mapFilters.reset();

    mapPinMain.style.left = window.pin.START_COORDINATES.left + 'px';
    mapPinMain.style.top = window.pin.START_COORDINATES.top + 'px';
    inputAddress.value = locationXMainPin + ', ' + locationYMainPin;
    removeCard();
    deletePins();
    mapPinMain.addEventListener('mousedown', buttonPress);
  };

  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  var errorHandler = function (errorMessage) {
    var errorElement = errorTemplate.cloneNode(true);
    errorElement.querySelector('.error__message').textContent = errorMessage;
    main.appendChild(errorElement);

    var errorPopup = document.querySelector('.error');
    var errorButton = document.querySelector('.error__button');

    var removeErrorOnButtonHandler = function () {
      errorPopup.remove();
      document.removeEventListener('mousedown', removeErrorOnButtonHandler);
    };

    var removeErrorOnDocumentHandler = function (evt) {
      if (evt.target !== errorButton) {
        errorPopup.remove();
        document.removeEventListener('mousedown', removeErrorOnDocumentHandler);
      }
    };
    var onEscPress = function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        errorPopup.remove();
        document.removeEventListener('keydown', onEscPress);
      }
    };
    errorButton.addEventListener('mousedown', removeErrorOnButtonHandler);
    document.addEventListener('mousedown', removeErrorOnDocumentHandler);
    document.addEventListener('keydown', onEscPress);
  };

  var render = function (data) {
    var lengthData = data.length >= window.data.NUMBER_OF_PINS ? window.data.NUMBER_OF_PINS : data.length;
    var fragmentPin = document.createDocumentFragment();
    var pinsNode = mapPins.querySelectorAll('button:not(.map__pin--main)');
    pinsNode.forEach(function (element) {
      element.remove();
    });
    for (var i = 0; i < lengthData; i++) {
      fragmentPin.appendChild(window.pin.renderPin(data[i]));
    }
    document.querySelector('.map__pins').appendChild(fragmentPin);
    var renderedPins = mapPins.querySelectorAll('button:not(.map__pin--main)');
    for (var j = 0; j < lengthData; j++) {
      onPinClick(renderedPins[j], data[j]);
    }
  };

  var successHandler = function (data) {
    loadedPins = data;
    render(data);
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.util.disableForm(mapFilters, false);
    window.util.disableForm(adForm, false);
    window.form.onRoomsForGuestsValidationCheck(window.form.roomNumber, window.form.capacityGuests);
    window.form.onRoomsForGuestsValidationCheck(window.form.capacityGuests, window.form.roomNumber);
    adFormReset.addEventListener('click', pageReset);
    inputAddress.value = locationXMainPin + ', ' + locationYMainPin;
    mapPinMain.removeEventListener('mousedown', buttonPress);

  };

  var pageActive = function () {
    window.backend.load(successHandler, errorHandler);
  };

  var onChangeHandler = window.util.debounce(function () {
    var houseType = selectHouseType.value;
    var housePrice = selectHousePrice.value;
    var houseRooms = selectHouseRooms.value.toString();
    var houseGuests = selectHouseGuests.value.toString();

    var filteredArray = function (element) {
      var isType = true;
      var isRooms = true;
      var isGuests = true;
      var isPrice = true;
      var isFeatures = true;

      var checkedFeatures = document.querySelectorAll('input[name="features"]:checked');
      if (checkedFeatures.length) {
        checkedFeatures.forEach(function (feature) {
          if (element.offer.features.indexOf(feature.value) === -1) {
            isFeatures = false;
          }
        });
      }

      if (houseType !== ANY) {
        isType = element.offer.type === houseType;
      }
      if (houseRooms !== ANY) {
        isRooms = element.offer.rooms.toString() === houseRooms;
      }
      if (houseGuests !== ANY) {
        isGuests = element.offer.guests.toString() === houseGuests;
      }
      if (housePrice !== ANY) {
        var elementPrice = element.offer.price.toString();
        var price;
        if (elementPrice < window.data.price.min) {
          price = HousePriceValue.LOW;
        }
        if (elementPrice > window.data.price.max) {
          price = HousePriceValue.HIGH;
        }
        if (elementPrice < window.data.price.max && elementPrice > window.data.price.min) {
          price = HousePriceValue.MIDDLE;
        }
        isPrice = price === housePrice;
      }
      return isType && isRooms && isGuests && isPrice && isFeatures;
    };
    render(loadedPins.filter(filteredArray));
    removeCard();
  });

  mapFilters.addEventListener('change', onChangeHandler);

  var form = document.querySelector('.ad-form');

  var submitHandler = function (evt) {

    window.backend.save(new FormData(form), function () {
      pageReset();
      formMessage();

    }, errorHandler);
    evt.preventDefault();
  };
  form.addEventListener('submit', submitHandler);
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
