'use strict';
(function () {
  var NUMBER_OF_ROOMS = '100';
  var NOT_FOR_GUESTS = '0';
  var roomNumber = document.querySelector('#room_number');
  var capacityGuests = document.querySelector('#capacity');
  var inputPrice = document.querySelector('#price');
  var inputType = document.querySelector('#type');
  var inputTitle = document.querySelector('#title');
  var textareaDescription = document.querySelector('#description');
  var checkboxFeature = document.querySelectorAll('.feature__checkbox');

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

  var startValues = {
    inputType: inputType.value,
    inputPrice: inputPrice.min,
    timeIn: inputTimeIn.value,
    timeOut: inputTimeOut.value,
    roomNumber: roomNumber.value,
    capacityGuests: capacityGuests.value
  };

  var resetValues = function () {

    inputTitle.value = '';
    inputPrice.value = '';
    inputPrice.placeholder = startValues.inputPrice;
    inputPrice.min = startValues.inputPrice;
    textareaDescription.value = '';
    inputType.value = startValues.inputType;
    inputTimeIn.value = startValues.timeIn;
    inputTimeOut.value = startValues.timeOut;
    roomNumber.value = startValues.roomNumber;
    capacityGuests.value = startValues.capacityGuests;

    for (var j = 0; j < checkboxFeature.length; j++) {
      checkboxFeature[j].checked = false;
    }
  }

  window.form = {
    onRoomsForGuestsValidationCheck: onRoomsForGuestsValidationCheck,
    onPriceForTypeValidationCheck: onPriceForTypeValidationCheck,
    roomNumber: roomNumber,
    capacityGuests: capacityGuests,
    inputPrice: inputPrice,
    inputType: inputType,
    resetValues: resetValues
  };


})();

