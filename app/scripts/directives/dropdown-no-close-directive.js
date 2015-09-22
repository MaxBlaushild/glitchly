'use strict';

(function(){

  angular.module('MainDirective').directive('glDropdownNoClose', glDropdownNoClose);

  function glDropdownNoClose(){

    return {
      restrict: 'A',
      link: function (scope, element) {
        element.on('click', function (event) {
          $(this).unbind();
        });
      }
    }
  }

})();

