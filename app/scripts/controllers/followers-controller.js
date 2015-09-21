'use strict';

(function(){

  var FollowersController = function(UserFactory, CurrentUserFactory){
    var vm = this;
    vm.users = UserFactory.followers;

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
      return (CurrentUserFactory.currentUser.id === id);
    }

    vm.unfollowUser = function(id){
      UserFactory.unfollowUser(id);
      toggleFollowStatus(id);
    }

    function init(){
      UserFactory.getFollowers();
    }

    init();
  }


  FollowersController.$inject = ['UserFactory', 'CurrentUserFactory'];

  angular.module('frontendApp').controller('followersController', FollowersController);

})();
