'use strict';
(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_POINTER = 22;

  var mapPinMain = document.querySelector('.map__pin--main');
  var locationXMainPin = Math.round(parseFloat(mapPinMain.style.left) + MAIN_PIN_WIDTH / 2);
  var locationYCenterMainPin = Math.round(parseFloat(mapPinMain.style.top) + MAIN_PIN_HEIGHT / 2);
  var locationYMainPin = parseFloat(mapPinMain.style.top) + MAIN_PIN_HEIGHT + MAIN_PIN_POINTER;
  var inputAddress = document.querySelector('#address');


  inputAddress.value = locationXMainPin + ', ' + locationYCenterMainPin;

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      evt.preventDefault();
      var pinAddWidth = Math.round(MAIN_PIN_WIDTH / 2);
      var pinAddHeight = MAIN_PIN_HEIGHT + MAIN_PIN_POINTER;

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var mouseMoveHandler = function (moveEvt) {
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


        if (pinX > window.data.pinLocation.x.max - pinAddWidth) {
          pinX = window.data.pinLocation.x.max - pinAddWidth;
        } else if (pinX < window.data.pinLocation.x.min - pinAddWidth) {
          pinX = window.data.pinLocation.x.min - pinAddWidth;
        }
        if (pinY > window.data.pinLocation.y.max - pinAddHeight) {
          pinY = window.data.pinLocation.y.max - pinAddHeight;
        } else if (pinY < window.data.pinLocation.y.min - pinAddHeight) {
          pinY = window.data.pinLocation.y.min - pinAddHeight;
        }

        mapPinMain.style.top = pinY + 'px';
        mapPinMain.style.left = pinX + 'px';

        inputAddress.value = ((pinX + pinAddWidth) + ', ' + (pinY + pinAddHeight));

      };
      var mouseUpHandler = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
      };
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    }
  });

  window.pinMain = {
    mapPinMain: mapPinMain,
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    MAIN_PIN_POINTER: MAIN_PIN_POINTER,
    locationXMainPin: locationXMainPin,
    locationYCenterMainPin: locationYCenterMainPin,
    locationYMainPin: locationYMainPin,
    inputAddress: inputAddress

  };
})();
