'use strict';

(function(){

  angular.module('MainController').controller('PictureFormCtrl', PictureFormCtrl);

  PictureFormCtrl.$inject = ['$location', 'PictureFactory'];

  function PictureFormCtrl($location, PictureFactory){
    var vm = this;
    vm.picture = {};
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

    vm.relativity = [
      { name: "Relative", id: 0 },
      { name: "Absolute", id: 1 }
    ];

    vm.orders = [
      { name: "Ascending", id: 0 },
      { name: "Descending", id: 2 }
    ];

    vm.polarities = [
      { name: "Positive", id: 0 },
      { name: "Negative", id: 4 }
    ];

    vm.hues = [
      { name: "Red", id: 1, hex: "#FF0000"},
      { name: "Orange", id: 2, hex: "#FF6600"},
      { name: "Yellow", id: 3, hex: "#FFFF00"},
      { name: "Green", id: 4, hex: "#00FF00"},
      { name: "Cyan", id: 5, hex: "#00FFFF"},
      { name: "Blue", id: 6, hex: "#0000FF"},
      { name: "Magenta", id: 7, hex: "#FF00FF"},
      { name: "Pink", id: 8, hex: "#FF0080"}
    ];

    vm.directions = [
      { name: "Left", id: 37 },
      { name: "Right", id: 39 },
      { name: "Up", id: 101 },
      { name: "Bottom", id: 102 }
    ];

    vm.createPicture = function() {
      var canvas = document.getElementById("image-preview");
      vm.picture.image = canvas.toDataURL();
      PictureFactory.createPicture(vm.picture).then(function() {
        $location.path('/');
      }, function(response) {
        vm.serverErrors = true;
        vm.serverErrorMsg = handleErrors(response.data);
      });
    };

    function toggleInProgressView(){
      $('#progress-view').toggle();
      $('#form-view').toggle();
    };

    vm.glitchPicture = function(){
      var pjs = Processing.getInstanceById('image-preview');
      var sorts = [];
      var polarities = [];
      var orders = [];
      var relativities = [];
      var hues = [];
      var directions = [];
      var intensities = [];
      vm.recipes.forEach(function(recipe){
        sorts.push(recipe.sort.id);
        relativities.push(recipe.relativity.id);
        polarities.push(recipe.polarity.id);
        orders.push(recipe.order.id);
        hues.push(recipe.hue);
        intensities.push(Number(recipe.intensity));
        directions.push(recipe.direction.id);
      });
      resetForm();
      toggleInProgressView();
      pjs.uploadImage(vm.picture.image, sorts, polarities, orders, relativities, hues, intensities, directions);
    };

    vm.addRecipe = function(recipe){
      vm.recipes.push(recipe);
      vm.newRecipe = {};
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

})();
