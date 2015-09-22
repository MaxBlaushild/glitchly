'use strict';

(function(){

  angular.module('MainController').controller('NavbarCtrl', NavbarCtrl);


  NavbarCtrl.$inject = ['$location', 'UserFactory', 'AuthService', '$scope', 'NotificationFactory', 'CurrentUserFactory'];

  function NavbarCtrl($location, UserFactory, AuthService, $scope, NotificationFactory, CurrentUserFactory){
    var vm = this;
    vm.searchString = '';
    vm.currentUser = CurrentUserFactory.currentUser;
    vm.notifications = NotificationFactory.notifications;
    vm.notificationPage = 1;

    function findNotificationIndexById(id){
      for (var i = 0; i < vm.currentUser.notifications.length; i++) {
        if (vm.currentUser.notifications[i].id === id) {
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

    vm.followNotification = function(notificationId, pictureId){
      NotificationFactory.deactivateNotification(notificationId).then(function(){
        var index = findNotificationIndexById(notificationId);
        getProfile();
        $location.path('/pictures/' + pictureId);
      });
    }

    vm.getMoreNotifications = function(){
      // console.log('hey');
      vm.notificationPage++;
      NotificationFactory.getMoreNotifications(vm.notificationPage).then(function(response){
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

