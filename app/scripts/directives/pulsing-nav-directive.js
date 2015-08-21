'use strict';

(function(){

    angular.module('MainDirective').directive("pulsingNav", [function () {

      return {
        restrict: 'A',
        link: function(scope, element){
          function pulsate(){
             element.css({'background-color': '#0652ff'}).animate({ opacity: 0.2}, 1200, 'linear')
                     .animate({ opacity: 1 }, 1200, 'linear', pulsate)
          }
          pulsate(element);
        }
      };
    }]);

})();
