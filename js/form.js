'use strict';
(function () {
  var NUMBER_OF_ROOMS = '100';
  var NOT_FOR_GUESTS = '0';
  var roomNumber = document.querySelector('#room_number');
  var capacityGuests = document.querySelector('#capacity');

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

  var inputPrice = document.querySelector('#price');
  var inputType = document.querySelector('#type');

  var onPriceForTypeValidationCheck = function () {
    inputPrice.min = window.data.offerTypeAndPrice[inputType.value].price;
    inputPrice.placeholder = window.data.offerTypeAndPrice[inputType.value].price;
  };
  inputType.addEventListener('change', onPriceForTypeValidationCheck);

  var inputTimeIn = document.querySelector('#timein');
  var inputTimeOut = document.querySelector('#timeout');

  var onTimeInForTimeOutValidationCheck = function () {
    inputTimeOut.value = inputTimeIn.value;
  };
  var onTimeOutForTimeInValidationCheck = function () {
    inputTimeIn.value = inputTimeOut.value;
  };
  inputTimeIn.addEventListener('change', onTimeInForTimeOutValidationCheck);
  inputTimeOut.addEventListener('change', onTimeOutForTimeInValidationCheck);
  window.form = {
    onRoomsForGuestsValidationCheck: onRoomsForGuestsValidationCheck,
    roomNumber: roomNumber,
    capacityGuests: capacityGuests
  };
})();

