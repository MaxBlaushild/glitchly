'use strict';

(function(){

    angular.module('MainController').controller('SignUpFormCtrl', SignUpFormCtrl);

    SignUpFormCtrl.$inject = ['UserFactory', 'CurrentUserFactory', 'NotificationFactory'];

    function SignUpFormCtrl(UserFactory, CurrentUserFactory, NotificationFactory) {
      var vm = this;
      vm.user = UserFactory.user;

      vm.createUser = function(user) {
        UserFactory.createUser(user).then(function() {
          resetForm();
          initUser();
        }, function(response) {
          vm.serverErrors = true;
        });
      }

      vm.closeWarningMessage = function(){
        vm.serverErrors = !vm.serverErrors;
      }

      function resetForm() {
        vm.user = {};
        vm.serverErrors = false;
      }


      vm.cancel = function() {
        resetForm();
      }

      var initUser = function(){
        CurrentUserFactory.getCurrentUser();
        NotificationFactory.getMoreNotifications(1);
        NotificationFactory.watchForNewNotifications();
      }

    }


  })();
