'use strict';
angular.module('MainController').controller('UserCtrl', UserCtrl);

UserCtrl.$inject = ['UserFactory'];

function UserCtrl(UserFactory) {
        var vm = this;
        vm.users = UserFactory.users;
        vm.user = UserFactory.user;
        vm.search = UserFactory.search;

        vm.upsertUser = function(user) {
            UserFactory.upsertUser(user).then(function() {
                resetForm();
            }, function(response) {
                vm.serverErrors = true;
                vm.serverErrorMsg = handleErrors(response.data);
            });
        };

        vm.showProfile = function(){
          UserFactory.getProfile();
        }

        vm.showUser = function(id){
          UserFactory.getUser(id);
        }

        vm.showUsers = function(search){
            UserFactory.getUsers(search);
        }

        vm.removeUser = function(user){
            UserFactory.removeUser(user);
        }

        function resetForm() {
            UserFactory.setUser({});
            vm.serverErrors = false;
        }

        vm.cancel = function() {
            resetForm();
        };

        function handleErrors(errObj) {
            var errString = '';

            angular.forEach(errObj, function(value, key) {
                errString += key + ': ' + value;
            });

            return errString;
        }

    }
