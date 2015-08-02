'use strict';

(function(){

  angular.module('MainDirective').directive('glNavBar', glNavBar);

  function glNavBar(){

    return {
      restrict: 'E',
      templateUrl: 'views/navbar.html',
      controller: 'NavbarCtrl',
      controllerAs: 'NavbarCtrl',
      bindToController: true
    };
  };

})();




