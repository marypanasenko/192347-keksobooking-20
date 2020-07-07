'use strict';
(function () {
  var NUMBER_OF_PINS = 5;
  var loadedPins = [];

  var offerTypeAndPrice = {
    flat: {
      'type': 'Квартира',
      'price': 1000
    },
    bungalo: {
      'type': 'Бунгало',
      'price': 0
    },
    house: {
      'type': 'Дом',
      'price': 5000
    },
    palace: {
      'type': 'Дворец',
      'price': 10000
    }
  };
  var price = {
    min: 10000,
    max: 50000
  };
  window.data = {
    offerTypeAndPrice: offerTypeAndPrice,
    NUMBER_OF_PINS: NUMBER_OF_PINS,
    price: price,
    loadedPins: loadedPins
  };
})();
