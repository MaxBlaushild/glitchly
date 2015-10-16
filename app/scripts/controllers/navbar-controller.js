'use strict';

(function(){

  angular.module('MainController').controller('NavbarCtrl', NavbarCtrl);


  NavbarCtrl.$inject = ['$location', 'UserFactory', 'AuthService', '$scope', '$timeout', 'NotificationFactory', 'CurrentUserFactory'];

  function NavbarCtrl($location, UserFactory, AuthService, $scope, $timeout, NotificationFactory, CurrentUserFactory){
    var vm = this;
    vm.searchString = '';
    vm.currentUser = CurrentUserFactory.currentUser;
    vm.notifications = NotificationFactory.notifications;
    vm.notificationPage = 0;
    vm.hasMoreNotifications = NotificationFactory.hasMoreNotifications;

    vm.getNotificationIndexById = function(id) {
      for (var i=0;i < vm.notifications.length; i++){
        if (vm.notifications[i].id === id ) {
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
      vm.notifications[index].active = false;
      vm.currentUser.active_notifications--;
    }

    vm.followNotification = function(notificationId, pictureId){
      NotificationFactory.deactivateNotification(notificationId).then(function(){
        var index = vm.getNotificationIndexById(notificationId);
        vm.toggleNotification(index);
        $location.path('/pictures/' + pictureId);
      });
    }


    vm.getMoreNotifications = function(){
      vm.notificationPage++;
      NotificationFactory.getMoreNotifications(vm.notificationPage);
    }


    var initUser = function(){
      CurrentUserFactory.getCurrentUser();
      vm.getMoreNotifications();
      NotificationFactory.watchForNewNotifications();
    }

    $scope.$watch(function () { return self.currentUser; }, function(user){
        if (!user && simpleStorage.get('gl-user-token')) {
          initUser();
        }
    });

    $scope.$watchCollection('NavbarCtrl.notifications', function(newNotis, oldNotis){
      if (oldNotis.length > 0 && newNotis.length == oldNotis.length) {
        vm.currentUser.active_notifications++;
      }
    });

  }

})();

