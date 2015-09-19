'use strict';

(function(){

    angular.module('MainController').controller('SignUpFormCtrl', SignUpFormCtrl);

    SignUpFormCtrl.$inject = ['UserFactory', 'AuthFactory'];

    function SignUpFormCtrl(UserFactory, AuthFactory) {
      var vm = this;
      vm.user = UserFactory.user;

      vm.createUser = function(user) {
        UserFactory.createUser(user).then(function() {
          resetForm();
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
