'use strict';

(function(){

  angular.module('MainDirective')
    .directive('processingCanvas', [function(){
      return {
        restrict: 'A',
        controller: 'PictureFormCtrl',
        controllerAs: 'PictureFormCtrl',
        link: function(scope, element, attrs){
          // initialize our canvas with our pde script
          var pjs = Processing.loadSketchFromSources($('#image-preview')[0], ['../glitch-machine.pde']);

          // load the image on canvas and remove all of the filters whenever a new picture is uploaded
          scope.$watch('PictureFormCtrl.picture.image', function(picture, oldPicture){
            if (picture != oldPicture) {
              scope.PictureFormCtrl.recipes = [];
              scope.PictureFormCtrl.uploadImage();
            }
          });

        }
      };
    }]);

})();
