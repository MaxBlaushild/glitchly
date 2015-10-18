'use strict';

(function(){

  angular.module('MainController').controller('LoginFormCtrl', LoginFormCtrl);


  LoginFormCtrl.$inject = ['$location', 'AuthService', 'CurrentUserFactory', 'NotificationFactory'];

  function LoginFormCtrl($location, AuthService, CurrentUserFactory, NotificationFactory){
    var vm = this;
    vm.credentials = {};
    vm.serverErrors = false;

    vm.login = function(credentials){
      AuthService.login(credentials).then(function(response){
        vm.credentials = {};
        initUser();
        $location.path('');
      }, function(){
        vm.serverErrors = true;
      });
    };

    vm.closeWarningMessage = function(){
      vm.serverErrors = !vm.serverErrors;
    };

    var initUser = function(){
      CurrentUserFactory.getCurrentUser();
      NotificationFactory.getMoreNotifications(1);
      NotificationFactory.watchForNewNotifications();
    }


  };

})();
