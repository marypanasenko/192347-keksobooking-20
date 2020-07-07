'use strict';
(function () {

  window.pinMain.mapPinMain.addEventListener('mousedown', window.util.buttonPress, false);

  window.pinMain.mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      pageActive();
    }
  });

  var render = function (data) {
    var lengthData = data.length >= window.data.NUMBER_OF_PINS ? window.data.NUMBER_OF_PINS : data.length;
    var fragmentPin = document.createDocumentFragment();
    var pinsNode = window.util.mapPins.querySelectorAll('button:not(.map__pin--main)');
    pinsNode.forEach(function (element) {
      element.remove();
    });
    for (var i = 0; i < lengthData; i++) {
      fragmentPin.appendChild(window.pin.renderPin(data[i]));
    }
    document.querySelector('.map__pins').appendChild(fragmentPin);
    var renderedPins = window.util.mapPins.querySelectorAll('button:not(.map__pin--main)');
    for (var j = 0; j < lengthData; j++) {
      window.card.onPinClick(renderedPins[j], data[j]);
    }
  };

  var successHandler = function (data) {
    window.data.loadedPins = data;
    render(data);
    window.card.map.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');
    window.util.disableForm(window.form.mapFilters, false);
    window.util.disableForm(window.form.adForm, false);
    window.form.onRoomsForGuestsValidationCheck(window.form.roomNumber, window.form.capacityGuests);
    window.form.onRoomsForGuestsValidationCheck(window.form.capacityGuests, window.form.roomNumber);
    window.form.adFormReset.addEventListener('click', window.form.pageReset);
    window.pinMain.inputAddress.value = window.pinMain.locationXMainPin + ', ' + window.pinMain.locationYMainPin;
    window.pinMain.mapPinMain.removeEventListener('mousedown', window.util.buttonPress);
    window.form.mapFilters.addEventListener('change', window.filter.onChangeHandler);
  };

  var pageActive = function () {
    window.backend.load(successHandler, window.error.errorHandler);
  };

  window.main = {
    render: render,
    pageActive: pageActive
  };
})();
