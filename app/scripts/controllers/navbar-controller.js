'use strict';
angular.module('MainController').controller('NavbarCtrl', NavbarCtrl);


NavbarCtrl.$inject = ['$location', 'UserFactory', 'AuthFactory'];

function NavbarCtrl($location, UserFactory, AuthFactory){
  var vm = this;
  vm.searchString = '';
  vm.currentUser = {};

  vm.isLoggedIn = function(){
    return AuthFactory.isLoggedIn();
  }

  vm.searchUsers = function(searchString){
    UserFactory.getUsers(searchString).then(function(response){
      $location.path('/users');
      vm.searchString = '';
    });
  };
}
