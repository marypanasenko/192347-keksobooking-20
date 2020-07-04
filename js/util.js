'use strict';
(function () {
  var getRandomIntInclusive = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomStringElement = function (array) {
    return array[window.util.getRandomIntInclusive(0, array.length - 1)];
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
  var disableForm = function (elementClass, trueOrFalse) {
    var formElements = elementClass.children;
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].disabled = trueOrFalse;
    }
  };
  var DEBOUNCE_INTERVAL = 500; // ms

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

  window.util = {
    getRandomIntInclusive: getRandomIntInclusive,
    getRandomStringElement: getRandomStringElement,
    shuffleArray: shuffleArray,
    disableForm: disableForm,
    debounce: debounce
  };
})();

