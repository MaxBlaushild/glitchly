'use strict';

(function(){

  angular.module('MainDirective')
    .directive('processingCanvas', [function(){
      return {
        restrict: 'A',
        controller: 'PictureFormCtrl',
        controllerAs: 'PictureFormCtrl',
        link: function(scope, element, attrs){
          var pjs = Processing.loadSketchFromSources($('#image-preview')[0], ['../glitch-machine.pde']);

          scope.$watch('PictureFormCtrl.picture.image', function(picture){
            if (picture) {
              var pjs = Processing.getInstanceById('image-preview');
              pjs.imagePreview(picture);
            }
          });

        }
      };
    }]);

})();
