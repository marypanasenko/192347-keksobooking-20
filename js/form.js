'use strict';
(function () {
  var NUMBER_OF_ROOMS = '100';
  var NOT_FOR_GUESTS = '0';
  var roomNumber = document.querySelector('#room_number');
  var capacityGuests = document.querySelector('#capacity');
  var inputPrice = document.querySelector('#price');
  var inputType = document.querySelector('#type');

  var mapFilters = document.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var adFormReset = document.querySelector('.ad-form__reset');

  window.util.disableForm(mapFilters, true);
  window.util.disableForm(adForm, true);

  var roomsForGuestsCheckHandler = function (listenedElement, element) {
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

  var priceForTypeCheckHandler = function () {
    inputPrice.min = window.data.offerTypeAndPrice[inputType.value].price;
    inputPrice.placeholder = window.data.offerTypeAndPrice[inputType.value].price;
  };
  inputType.addEventListener('change', priceForTypeCheckHandler);

  var inputTimeIn = document.querySelector('#timein');
  var inputTimeOut = document.querySelector('#timeout');

  var timeInForTimeOutCheckHandler = function () {
    inputTimeOut.value = inputTimeIn.value;
  };
  var timeOutForTimeInCheckHandler = function () {
    inputTimeIn.value = inputTimeOut.value;
  };
  inputTimeIn.addEventListener('change', timeInForTimeOutCheckHandler);
  inputTimeOut.addEventListener('change', timeOutForTimeInCheckHandler);

  var pageResetHandler = function () {
    adFormReset.removeEventListener('click', pageResetHandler);
    window.card.map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.util.disableForm(mapFilters, true);
    window.util.disableForm(adForm, true);
    adForm.reset();
    mapFilters.reset();
    window.photoPreview.photoPreviewReset();
    window.pinMain.mapPinMain.style.left = window.pin.StartCoordinate.LEFT + 'px';
    window.pinMain.mapPinMain.style.top = window.pin.StartCoordinate.TOP + 'px';
    window.pinMain.inputAddress.value = window.pinMain.locationXMainPin + ', ' + window.pinMain.locationYMainPin;
    window.card.removeCard();
    window.util.deletePins();
    window.form.mapFilters.removeEventListener('change', window.filter.onChangeHandler);
    window.pinMain.mapPinMain.addEventListener('mousedown', window.util.buttonPressHandler);
  };

  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  var formMessage = function () {
    var successElement = successTemplate.cloneNode(true);
    document.querySelector('main').appendChild(successElement);

    var successPopup = document.querySelector('.success');
    var successPopupMessage = document.querySelector('.success__message');

    var successPopupOnDocumentRemoveHandler = function (evt) {
      if (evt.target !== successPopupMessage) {
        successPopup.remove();
        document.removeEventListener('mousedown', successPopupOnDocumentRemoveHandler);
      }
    };

    document.addEventListener('mousedown', successPopupOnDocumentRemoveHandler);
    document.addEventListener('keydown', function (evt) {
      window.util.escPressHandler(evt, successPopup);
    });
  };

  var form = document.querySelector('.ad-form');

  var submitHandler = function (evt) {
    window.backend.save(new FormData(form), function () {
      pageResetHandler();
      formMessage();

    }, window.error.errorHandler);
    evt.preventDefault();
  };

  form.addEventListener('submit', submitHandler);
  window.photoPreview.photoPreview('.ad-form__field input[type=file]', '.ad-form-header__preview img');
  window.photoPreview.photoPreview('.ad-form__upload input[type=file]', '.ad-form__photo');

  window.form = {
    roomsForGuestsCheckHandler: roomsForGuestsCheckHandler,
    roomNumber: roomNumber,
    capacityGuests: capacityGuests,
    inputPrice: inputPrice,
    inputType: inputType,
    adFormReset: adFormReset,
    pageResetHandler: pageResetHandler,
    adForm: adForm,
    mapFilters: mapFilters
  };
})();

