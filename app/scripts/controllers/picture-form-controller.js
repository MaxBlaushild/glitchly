'use strict';
angular.module('MainController').controller('PictureFormCtrl', PictureFormCtrl);


PictureCtrl.$inject = ['$location', 'PictureFactory'];

function PictureFormCtrl($location, PictureFactory){
  var vm = this;
  vm.recipes = [];
  vm.newRecipe = {};
  vm.sorts = [
    { name: "Bubble", id: 0, description: "blah"},
    { name: "Insertion", id: 1, description: "blah"},
    { name: "Selection", id: 2, description: "blah"},
    { name: "Heap", id: 3, description: "Produces an echo effect"},
    { name: "Shell", id: 4, description: "blah"},
    { name: "Merge", id: 5, description: "blah"},
    { name: "Quick", id: 6, description: "blah"},
    { name: "Smooth", id: 7, description: "Creates lines in your picture"},
    { name: "Permute", id: 8, description: "Pixels are scattered to the wind, amount is not used"},
    { name: "One Color", id: 9, description: "blah"},
    { name: "Roll", id: 10, description: "blah"},
    { name: "One Color RB", id: 11, description: "blah"}
  ];

  vm.flags = [
    {name: "Default", id: 0, description: "blah"}
  ];


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
