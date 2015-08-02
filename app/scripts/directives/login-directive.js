'use strict';

(function(){

  angular.module('MainDirective').directive('glLoginForm', glLoginForm);

  function glLoginForm(){
    return {
      restrict: 'E',
      templateUrl: 'views/login-form.html',
      controller: 'AuthCtrl',
      controllerAs: 'AuthCtrl',
      bindToController: true,
      scope: {
        credentials: '&'
      }
    };
  };

})();




