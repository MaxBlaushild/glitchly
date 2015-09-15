'use strict';

(function(){

  var UsersController = function(UserFactory, $location, AuthFactory){
    var vm = this;
    vm.users = UserFactory.users;

    function findUserIndexById(id){
      for (var i = 0; i < vm.users.length; i++){
        if (vm.users[i].id === id) {
          return i;
        }
      }
    }

    function toggleFollowStatus(id){
      var index = findUserIndexById(id);
      vm.users[index].followed_by_user = !vm.users[index].followed_by_user;
    }


    vm.followUser = function(id){
      UserFactory.followUser(id);
      toggleFollowStatus(id);
    }

    vm.isCurrentUser = function(id){
      return (AuthFactory.currentUser.id === id);
    }

    vm.unfollowUser = function(id){
      UserFactory.unfollowUser(id);
      toggleFollowStatus(id);
    }


    function init(){
      UserFactory.getUsers($location.search().username);
    }

    init();
  }


  UsersController.$inject = ['UserFactory', '$location', 'AuthFactory'];

  angular.module('frontendApp').controller('usersController', UsersController);

})();
