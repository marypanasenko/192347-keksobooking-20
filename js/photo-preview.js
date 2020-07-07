'use strict';

(function () {
  window.photoPreview = function (inputSelector, viewSelector) {
    var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

    var fileChooser = document.querySelector(inputSelector);
    var preview = document.querySelector(viewSelector);

    fileChooser.addEventListener('change', function () {
      var file = fileChooser.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          if (fileChooser === document.querySelector('.ad-form__upload input[type=file]')) {
            var node = document.createElement('img');
            node.style = 'width: 70px; height: 70px;';
            node.src = reader.result;
            preview.insertAdjacentElement('afterbegin', node);
          } else {
            preview.src = reader.result;
          }
        });
        reader.readAsDataURL(file);
      }
    });
  };


})();
