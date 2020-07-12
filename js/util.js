'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 500;
  var getRandomIntInclusive = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomStringElement = function (array) {
    return array[window.util.getRandomIntInclusive(0, array.length - 1)];
  };

  var disableForm = function (elementClass, trueOrFalse) {
    var formElements = elementClass.children;
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].disabled = trueOrFalse;
    }
  };

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var mapPins = document.querySelector('.map__pins');
  var deletePins = function () {
    var mapPin = mapPins.querySelectorAll('button:not(.map__pin--main)');
    for (var j = 0; j < mapPin.length; j++) {
      mapPin[j].remove();
    }
  };
  var buttonPressHandler = function (e) {
    if (e.button === 0) {
      window.main.pageActive();
    }
  };
  var escPressHandler = function (evt, closedElement) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closedElement.remove();
      document.removeEventListener('keydown', escPressHandler);
    }
  };

  window.util = {
    getRandomIntInclusive: getRandomIntInclusive,
    getRandomStringElement: getRandomStringElement,
    disableForm: disableForm,
    debounce: debounce,
    deletePins: deletePins,
    mapPins: mapPins,
    buttonPressHandler: buttonPressHandler,
    escPressHandler: escPressHandler
  };
})();

