'use strict';

(function(){

  angular.module('MainController').controller('NavbarCtrl', NavbarCtrl);


  NavbarCtrl.$inject = ['$location', 'UserFactory', 'AuthService', '$scope', '$timeout', 'NotificationFactory', 'CurrentUserFactory'];

  function NavbarCtrl($location, UserFactory, AuthService, $scope, $timeout, NotificationFactory, CurrentUserFactory){
    var vm = this;
    vm.searchString = '';
    vm.currentUser = CurrentUserFactory.currentUser;
    vm.notifications = NotificationFactory.notifications;
    vm.notificationPage = 1;
    vm.hasMoreNotifications = true;

    vm.isLoggedIn = function(){
      return AuthService.isLoggedIn();
    }

    vm.logOut = function(){
      AuthService.logOut();
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
        getProfile();
        $location.path('/pictures/' + pictureId);
      });
    }

    vm.checkNotificationLength = function(response){
      if (response.data.notifications.length === 0) {
        $timeout(function(){
          vm.hasMoreNotifications = false;
        });
      }
    }

    vm.getMoreNotifications = function(){
      vm.notificationPage++;
      NotificationFactory.getMoreNotifications(vm.notificationPage).then(function(response){
        vm.checkNotificationLength(response);
        response.data.notifications.forEach(function(notification){
          vm.currentUser.notifications.push(notification);
        });
      });
    }

    var getProfile = function(){
      CurrentUserFactory.getCurrentUser();
    }

    $scope.$watch(function () { return self.currentUser; }, function(user){
        if (!user && simpleStorage.get('gl-user-token')) {
          getProfile();
        }
    });

  }

})();

