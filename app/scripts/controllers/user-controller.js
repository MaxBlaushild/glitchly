'use strict';

(function(){

    angular.module('MainController').controller('UserCtrl', UserCtrl);

    UserCtrl.$inject = ['$routeParams','UserFactory', 'AuthFactory'];

    function UserCtrl($routeParams, UserFactory, AuthFactory) {
        var vm = this;
        var userId = $routeParams.userId;
        vm.users = UserFactory.users;
        vm.user = UserFactory.user;
        vm.search = UserFactory.search;
        vm.editMode = false;


        vm.upsertUser = function(user) {
            UserFactory.upsertUser(user).then(function() {
                resetForm();
            }, function(response) {
                resetForm();
                vm.serverErrors = true;
                vm.serverErrorMsg = "You must fill out all of the fields!!!!";
            });
        };

        vm.toggleEditMode = function(){
            vm.user.avatar = '';
            vm.editMode = !vm.editMode;
        };

        vm.showProfile = function(){
          UserFactory.getProfile();
        };

        vm.followUser = function(id){
            UserFactory.followUser(id);
        };

        vm.renderPreview = function(){
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#profile').attr('src', e.target.result);
            };

            reader.readAsDataURL($('#profile-preview')[0].files[0]);
        };



        vm.isCurrentUser = function(id){
            if (AuthFactory.currentUser.id === id) {
                return true;
            } else {
                return false;
            }
        };

        vm.unfollowUser = function(id){
            UserFactory.unfollowUser(id);
        };

        vm.showUser = function(){
          UserFactory.getUser(userId);
        };

        vm.searchUsers = function(){
            UserFactory.getUsers(search);
        };

        vm.removeUser = function(user){
            UserFactory.removeUser(user);
        };

        function resetForm() {
            vm.user = {};
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
        };

    };

})();

