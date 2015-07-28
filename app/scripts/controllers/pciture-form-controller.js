'use strict';
angular.module('MainController').controller('PictureCtrl', PictureCtrl);


PictureCtrl.$inject = ['$location', 'PictureFactory'];

function PictureCtrl($location, PictureFactory){
  var vm = this;
  vm.picture = PictureFactory.picture;
  vm.recipes = [];
  vm.newRecipe = {};


  vm.createPicture = function(picture) {
    PictureFactory.createPicture(picture).then(function() {
      resetForm();
    }, function(response) {
      vm.serverErrors = true;
      vm.serverErrorMsg = handleErrors(response.data);
    });
  };

  vm.readPicture = function(input){
    debugger;
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          pjs.uploadImage(e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
  };

  function resetForm() {
      vm.recipes = [];
      vm.newRecipe = {};
  };

  vm.cancel = function() {
      resetForm();
  };

  function handleErrors(errObj) {
      var errString = '';

      angular.forEach(errObj, function(value, key) {
          errString += key + ': ' + value;
      });

      return errString;
  };
};
