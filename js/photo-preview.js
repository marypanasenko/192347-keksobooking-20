'use strict';

(function () {
  var previewName = '';
  var photoPreview = function (inputSelector, viewSelector) {
    var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
    var fileChooser = document.querySelector(inputSelector);
    var preview = document.querySelector(viewSelector);
    var previewRenderHandler = function () {
      var files = fileChooser.files;
      Array.from(files).forEach(function (file) {
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
              previewName = preview.src.split('img/')[1];
              preview.src = reader.result;
            }
          });
          reader.readAsDataURL(file);
        }
      });
    };
    fileChooser.addEventListener('change', previewRenderHandler);
  };

  var photoPreviewReset = function () {
    if (previewName !== '') {
      var avatarPhoto = document.querySelector('.ad-form-header__preview img');
      avatarPhoto.src = 'img/' + previewName;
    }
    if (document.querySelector('.ad-form__photo img')) {
      var array = document.querySelector('.ad-form__photo').children;
      Array.from(array).forEach(function (element) {
        element.remove();
      });
    }
  };
  window.photoPreview = {
    photoPreview: photoPreview,
    photoPreviewReset: photoPreviewReset
  };
})();
