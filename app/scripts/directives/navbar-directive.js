'use strict';

angular.module('MainDirective').directive('glNavBar', glNavBar);


  function glNavBar(){

    return {
      restrict: 'E',
      templateUrl: 'views/navbar.html',
      controller: AuthCtrl,
      controllerAs: 'AuthCtrl',
      bindToController: true
    };
  }
