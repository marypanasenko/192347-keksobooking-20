'use strict';
(function () {
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  cardTemplate.querySelector('.popup__features').innerHTML = '';
  var renderCard = function (array) {

    var cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = array.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = array.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = array.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = window.data.offerTypeAndPrice[array.offer.type].type;
    cardElement.querySelector('.popup__text--capacity').textContent = array.offer.rooms + ' комнаты для ' + array.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + array.offer.checkin + ', выезд до ' + array.offer.checkout;

    if (array.offer.features.length >= 1) {
      for (var j = 0; j < array.offer.features.length; j++) {
        var cardLiElement = document.createElement('li');
        cardLiElement.classList.add('popup__feature');
        cardLiElement.classList.add('popup__feature--' + array.offer.features[j]);
        cardElement.querySelector('.popup__features').appendChild(cardLiElement);
      }
    }

    cardElement.querySelector('.popup__description').textContent = array.offer.description;

    cardElement.querySelector('.popup__photo').src = array.offer.photos[0];
    if (array.offer.photos.length > 1) {
      for (var i = 1; i < array.offer.photos.length; i++) {
        var cardImgElement = cardTemplate.querySelector('.popup__photo').cloneNode();
        cardImgElement.src = array.offer.photos[i];
        cardElement.querySelector('.popup__photos').appendChild(cardImgElement);
      }
    }

    cardElement.querySelector('.popup__avatar').src = array.author.avatar;

    return cardElement;
  };
  window.card = {
    renderCard: renderCard
  };
})();

