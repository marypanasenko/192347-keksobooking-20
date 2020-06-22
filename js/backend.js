'use strict';
(function () {
  var URL_LOAD = 'https://javascript.pages.academy/keksobooking/data.';
  // var TIMEOUT_IN_MS = 10000;
  var StatusCode = {
    OK: 200
  };
  var makeRequest = function (method, url, onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      }
    });
    xhr.open(method, url);
    xhr.send();
  };

  var load = function (onLoad) {
    makeRequest('GET', URL_LOAD, onLoad);
  };
  console.log(load());
  window.backend = {
    load: load
  };

})();
