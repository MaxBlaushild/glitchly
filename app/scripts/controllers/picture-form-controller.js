'use strict';

(function(){

  angular.module('MainController').controller('PictureFormCtrl', PictureFormCtrl);

  PictureFormCtrl.$inject = ['$location', 'PictureFactory'];

  function PictureFormCtrl($location, PictureFactory){
    var vm = this;
    vm.picture = {};
    vm.recipes = [];
    vm.newRecipe = {};
    vm.filterFormGoof = false;

    vm.sorts = [
      { name: "Bubble", id: 0},
      { name: "Insertion", id: 1},
      { name: "Selection", id: 2},
      { name: "Heap", id: 3},
      { name: "Shell", id: 4},
      { name: "Merge", id: 5},
      { name: "Quick", id: 6},
      { name: "Smooth", id: 7},
      { name: "Permute", id: 8},
      { name: "One Color", id: 9},
      { name: "Roll", id: 10},
      { name: "One Color RB", id: 11}
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
      var picture = {
        image: canvas.toDataURL(),
        caption: vm.picture.caption
      };
      PictureFactory.createPicture(picture).then(function() {
        $location.path('/');
      }, function(response) {
        vm.serverErrors = true;
        vm.serverErrorMsg = handleErrors(response.data);
      });
    }

    vm.closeWarningMessage = function(){
      vm.filterFormGoof = !vm.filterFormGoof;
    }

    function toggleInProgressView(){
      $('#progress-view').toggle();
      $('#form-view').toggle();
    }

    // pjs.uploadImage is a processing method that is strongly typed, thus requiring me to split up the filters into arrays
    function glitchPicture(){
      toggleInProgressView();
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

      pjs.uploadImage(vm.picture.image, sorts, polarities, orders, relativities, hues, intensities, directions);
    }

    vm.addRecipe = function(recipe){
      var $invalidInputs = $('input.ng-invalid-required, select.ng-invalid-required');
      if ($invalidInputs.length > 0) {
        vm.filterFormGoof = !vm.filterFormGoof;
        return;
      }
      vm.recipes.push(recipe);
      vm.newRecipe = {};
      glitchPicture();
    }

    function resetForm() {
      vm.recipes = [];
      vm.newRecipe = {};
    }

    vm.cancel = function() {
        resetForm();
    }

    vm.removeFilter = function(index){
      vm.recipes.splice(index, 1);
      glitchPicture();
    }

    vm.uploadImage = function(){
      glitchPicture();
    }

    vm.resetPage = function(){
      location.reload();
    }

    function handleErrors(errObj) {
        var errString = '';

        angular.forEach(errObj, function(value, key) {
            errString += key + ': ' + value;
        });

        return errString;
    };
  };

})();
