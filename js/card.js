'use strict';
(function () {
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  cardTemplate.querySelector('.popup__features').innerHTML = '';
  var renderCard = function (object) {

    var cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = object.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = object.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = object.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = window.data.offerTypeAndPrice[object.offer.type].type;
    cardElement.querySelector('.popup__text--capacity').textContent = object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;

    if (object.offer.features.length >= 1) {
      for (var j = 0; j < object.offer.features.length; j++) {
        var cardLiElement = document.createElement('li');
        cardLiElement.classList.add('popup__feature');
        cardLiElement.classList.add('popup__feature--' + object.offer.features[j]);
        cardElement.querySelector('.popup__features').appendChild(cardLiElement);
      }
    }

    cardElement.querySelector('.popup__description').textContent = object.offer.description;

    cardElement.querySelector('.popup__photo').remove();
    if (object.offer.photos.length !== 0) {
      for (var i = 1; i < object.offer.photos.length; i++) {
        var cardImgElement = cardTemplate.querySelector('.popup__photo').cloneNode();
        cardImgElement.src = object.offer.photos[i];
        cardElement.querySelector('.popup__photos').appendChild(cardImgElement);
      }
    }

    cardElement.querySelector('.popup__avatar').src = object.author.avatar;

    return cardElement;
  };

  var cardEscHandler = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      removeCard();
    }
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
    document.removeEventListener('keydown', cardEscHandler);
  };
  var map = document.querySelector('.map');
  var onPinClick = function (pinOnMap, object) {
    pinOnMap.addEventListener('click', function () {
      removeCard();
      pinOnMap.classList.add('map__pin--active');
      var newCard = (window.card.renderCard(object));
      var mapFiltersContainer = document.querySelector('.map__filters-container');
      map.insertBefore(newCard, mapFiltersContainer);

      var popupClose = document.querySelector('.popup__close');

      popupClose.addEventListener('click', function (evt) {
        evt.preventDefault();
        removeCard();
      });
      document.addEventListener('keydown', cardEscHandler);
    });
  };
  window.card = {
    renderCard: renderCard,
    onPinClick: onPinClick,
    map: map,
    removeCard: removeCard
  };
})();

