'use strict';

(function(){

  angular.module('MainController').controller('NavbarCtrl', NavbarCtrl);


  NavbarCtrl.$inject = ['$location', 'UserFactory', 'AuthFactory', '$scope', '$rootScope'];

  function NavbarCtrl($location, UserFactory, AuthFactory, $scope, $rootScope){
    var vm = this;
    vm.searchString = '';
    vm.currentUser = AuthFactory.currentUser;

    vm.isLoggedIn = function(){
      return AuthFactory.isLoggedIn();
    };

    vm.logOut = function(){
      AuthFactory.logOut();
    };

    vm.searchUsers = function(searchString){
      UserFactory.getUsers(searchString).then(function(response){
        $location.path('/users');
        $location.search('username', searchString);
        vm.searchString = '';
      });
    };

    var getProfile = function(){
      AuthFactory.getProfile();
    };

    $scope.$watch(function () { return self.currentUser; }, function(user){
        if (!user && simpleStorage.get('gl-user-token')) {
          getProfile();
        }
    });


  };

})();

