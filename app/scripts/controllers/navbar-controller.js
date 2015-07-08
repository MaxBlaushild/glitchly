'use strict';
angular.module('MainController').controller('NavbarCtrl', NavbarCtrl);


NavbarCtrl.$inject = ['$location', 'UserFactory', 'AuthFactory'];

function NavbarCtrl($location, UserFactory, AuthFactory){
  var vm = this;
  vm.searchString = '';
  vm.currentUser = AuthFactory.currentUser;

  vm.isLoggedIn = function(){
    return AuthFactory.isLoggedIn();
  }

  vm.logOut = function(){
    AuthFactory.logOut();
  }

  vm.searchUsers = function(searchString){
    UserFactory.getUsers(searchString).then(function(response){
      $location.path('/users');
      vm.searchString = '';
    });
  };

  var getProfile = function(){
    if (!vm.currentUser.username && vm.isLoggedIn) {
      AuthFactory.getProfile();
    }
  };

  getProfile();
}
