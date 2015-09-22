'use strict';

(function(){

  angular.module('MainController').controller('NavbarCtrl', NavbarCtrl);


  NavbarCtrl.$inject = ['$location', 'UserFactory', 'AuthService', '$scope', '$timeout', 'NotificationFactory', 'CurrentUserFactory'];

  function NavbarCtrl($location, UserFactory, AuthService, $scope, $timeout, NotificationFactory, CurrentUserFactory){
    var vm = this;
    vm.searchString = '';
    vm.currentUser = CurrentUserFactory.currentUser;
    vm.notificationPage = 1;
    vm.hasMoreNotifications = true;

    vm.getNotificationIndexById = function(id) {
      for (var i=0;i < vm.currentUser.notifications.length; i++){
        if (vm.currentUser.notifications[i].id === id ) {
          return i;
        }
      }
    }

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

    vm.toggleNotification = function(index){
      vm.currentUser.notifications[index].active = false;
      vm.currentUser.active_notifications--;
    }

    vm.followNotification = function(notificationId, pictureId){
      NotificationFactory.deactivateNotification(notificationId).then(function(){
        var index = vm.getNotificationIndexById(notificationId);
        vm.toggleNotification(index);
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

