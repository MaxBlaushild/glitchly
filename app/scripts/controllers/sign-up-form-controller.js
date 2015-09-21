'use strict';

(function(){

    angular.module('MainController').controller('SignUpFormCtrl', SignUpFormCtrl);

    SignUpFormCtrl.$inject = ['UserFactory', 'CurrentUserFactory'];

    function SignUpFormCtrl(UserFactory, CurrentUserFactory) {
      var vm = this;
      vm.user = UserFactory.user;

      vm.createUser = function(user) {
        UserFactory.createUser(user).then(function() {
          resetForm();
          CurrentUserFactory.getCurrentUser();
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

    }


  })();
