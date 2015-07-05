'use strict';
angular.module('MainController').controller('PictureCtrl', PictureCtrl);


PictureCtrl.$inject = ['$routeParams','$location', 'PictureFactory'];

function PictureCtrl($routeParams, $location, PictureFactory){
  var vm = this;
  var pictureId = $routeParams.pictureId;
  vm.picture = PictureFactory.picture;
  vm.pictures = PictureFactory.pictures;


  vm.createPicture = function(picture) {
    PictureFactory.createPicture(picture).then(function() {
      resetForm();
    }, function(response) {
      vm.serverErrors = true;
      vm.serverErrorMsg = handleErrors(response.data);
    });
  };


  vm.showPictures = function(){
      PictureFactory.getPictures();
  };

  vm.showFeed = function(){
      PictureFactory.getFeed();
  };

  vm.showPicture = function(){
      PictureFactory.getPicture(pictureId);
  };

  function resetForm() {
      PictureFactory.setPicture({});
      vm.serverErrors = false;
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
