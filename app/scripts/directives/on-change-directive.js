'use strict';

angular.module('MainDirective')
  .directive('customOnChange', [function(){

    return {
      restrict: 'A',
      link: function(scope, element, attrs){
        var pjs = Processing.loadSketchFromSources($('#image-preview')[0], ['../scripts/glitch-machine.pde']);

        var uploadImage = function(){
          var pjs = Processing.getInstanceById('image-preview');
          if (this.files && this.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
              pjs.uploadImage(e.target.result);
            };

            reader.readAsDataURL(this.files[0]);
          }
        };
        element.change(uploadImage);
      }
    };
  }]);
