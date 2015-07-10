'use strict';
angular.module('MainController').controller('UserCtrl', UserCtrl);

UserCtrl.$inject = ['$routeParams','UserFactory'];

function UserCtrl($routeParams, UserFactory) {
        var vm = this;
        var userId = $routeParams.userId;
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
        };

        vm.followUser = function(id){
            UserFactory.followUser(id);

        };

        vm.unfollowUser = function(id){
            UserFactory.unfollowUser(id);
        };

        vm.showUser = function(){
          UserFactory.getUser(userId);
        };

        vm.showUsers = function(search){
            UserFactory.getUsers(search);
        };

        vm.removeUser = function(user){
            UserFactory.removeUser(user);
        };

        function resetForm() {
            UserFactory.setUser({});
            vm.serverErrors = false;
        };

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
