'use strict';

(function(){

  angular.module('MainController').controller('AuthCtrl', AuthCtrl);


  AuthCtrl.$inject = ['$location', 'AuthFactory', '$scope'];

  function AuthCtrl($location, AuthFactory, $scope){
    var vm = this;
    vm.currentUser = AuthFactory.currentUser;
    vm.credentials = {};

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
    };

  };

})();
