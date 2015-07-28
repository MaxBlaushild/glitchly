'use strict';

angular.module('MainDirective')
  .directive('processingCanvasChange', [function(){

    return {
      restrict: 'A',
      link: function(scope, element, attrs){
        var pjs = Processing.loadSketchFromSources($('#image-preview')[0], ['../scripts/glitch-machine.pde']);
      }
    };
  }]);
