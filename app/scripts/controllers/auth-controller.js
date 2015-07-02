'use strict';
angular.module('MainController').controller('AuthCtrl', AuthCtrl);


AuthCtrl.$inject = ['$location', 'AuthFactory'];

function AuthCtrl($location, AuthFactory){
  var vm = this;
  vm.credentials = {};
  vm.currentUser = {};

  vm.login = function(credentials){
    AuthFactory.login(credentials).then(function(response){
      vm.credentials = {};
      $location.path('');
    });
  };

  vm.logout = function(){
    AuthFactory.logout();
  };

  vm.isLoggedIn = function(){
    return AuthFactory.isLoggedIn();
  }
}
