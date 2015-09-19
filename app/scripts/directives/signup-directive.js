'use strict';

(function(){

  angular
      .module('MainDirective')
      .directive('glSignUpForm', glSignUpForm);


  function glSignUpForm() {
      return {
          restrict: 'E',
          templateUrl: 'views/sign-up-form.html',
          controller: 'SignUpFormCtrl',
          controllerAs: 'SignUpFormCtrl',
          bindToController: true
      };
  };

})();

