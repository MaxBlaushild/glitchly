'use strict';

(function(){

  angular.module('MainController').controller('LoginFormCtrl', LoginFormCtrl);


  LoginFormCtrl.$inject = ['$location', 'AuthService', 'CurrentUserFactory'];

  function LoginFormCtrl($location, AuthService, CurrentUserFactory){
    var vm = this;
    vm.credentials = {};
    vm.serverErrors = false;

    vm.login = function(credentials){
      AuthService.login(credentials).then(function(response){
        vm.credentials = {};
        CurrentUserFactory.getCurrentUser();
        $location.path('');
      }, function(){
        vm.serverErrors = true;
      });
    };

    vm.closeWarningMessage = function(){
      vm.serverErrors = !vm.serverErrors;
    };


  };

})();
