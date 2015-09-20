'use strict';

(function(){

  angular.module('MainController').controller('NavbarCtrl', NavbarCtrl);


  NavbarCtrl.$inject = ['$location', 'UserFactory', 'AuthFactory', '$scope', 'NotificationFactory'];

  function NavbarCtrl($location, UserFactory, AuthFactory, $scope, NotificationFactory){
    var vm = this;
    vm.searchString = '';
    vm.currentUser = AuthFactory.currentUser;

    function findNotificationIndexById(id){
      for (var i = 0; i < vm.currentUser.notifications.length; i++) {
        if (vm.currentUser.notifications[i].id === id) {
           return i;
        }
      }
    }

    vm.isLoggedIn = function(){
      return AuthFactory.isLoggedIn();
    }

    vm.logOut = function(){
      AuthFactory.logOut();
    }

    vm.searchUsers = function(searchString){
      UserFactory.getUsers(searchString).then(function(response){
        $location.path('/users');
        $location.search('username', searchString);
        vm.searchString = '';
      });
    }

    vm.followNotification = function(notificationId, pictureId){
      NotificationFactory.deactivateNotification(notificationId).then(function(){
        var index = findNotificationIndexById(notificationId);
        getProfile();
        $location.path('/pictures/' + pictureId);
      });
    }

    var getProfile = function(){
      AuthFactory.getProfile();
    }


    $scope.$watch(function () { return self.currentUser; }, function(user){
        if (!user && simpleStorage.get('gl-user-token')) {
          getProfile();
        }
    });


  }

})();

