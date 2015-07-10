'use strict';

    angular
        .module('frontendApp')
        .factory('UserFactory', UserFactory);

    UserFactory.$inject = ['$http', '$window', '$location', '$upload'];

    function UserFactory($http, $window, $location, $upload) {
        var users = [];
        var user = {};
        var search;

        function setUser(newUser) {
            angular.copy(newUser, user);
        };

        function getUser(id) {
            return $http.get('http://localhost:3000/users/' + id)
                .then(function(response) {
                    angular.copy(response.data.user, user);
                });
        };

        function removeUser(user) {
            users.splice(findUserIndexById(user.id), 1);
        };

        function findUserIndexById(id) {
            for (var i = 0; i < users.length; i++) {
                if (users[i].id === id) {
                    return i;
                };
            };
        };

        function getProfile() {
            var id = $window.localStorage.getItem('gl-user-id');
            return $http.get('http://localhost:3000/users/' + id)
                .then(function(response) {
                    angular.copy(response.data, user);
                });
        };

        function getUsers(search) {
            return $http.get('http://localhost:3000/users?username=' + search)
                .then(function(response) {
                    angular.copy(response.data.users, users);
                });
        };

        function followUser(id){
            return $http.get('http://localhost:3000/users/' + id + '/follow')
                .then(function(response) {
                    angular.copy(response.data.user, user);
                });
        };

        function unfollowUser(id){
            return $http.get('http://localhost:3000/users/' + id + '/unfollow')
                .then(function(response) {
                    angular.copy(response.data.user, user);
                });
        };

        function upsertUser(user) {
            var params = {
                auth: user
            };
            if (user.id) {
                return $http.put('http://localhost:3000/users' + user.id, params)
                    .success(getUsers);
            } else {
                var file = user.avatar;
                return $upload.upload({
                    url: 'http://localhost:3000/register',
                    method: 'POST',
                    fields: {
                        'auth[username]': user.username,
                        'auth[email]': user.email,
                        'auth[password]': user.password,
                        'auth[bio]': user.bio,
                         },
                    file: file,
                    fileFormDataName: 'auth[avatar]'
                }).success(function(response) {
                    $window.localStorage.setItem('gl-user-token', response.user.token);
                    $http.defaults.headers.common.Authorization = 'Token token=' + response.user.token;
                    $location.path('/');
                });
            };
        };

        function deleteUser(user) {
            return $http.delete('http://localhost:3000/users/' + user.id);
        };

        return {
            search: search,
            users: users,
            user: user,
            removeUser: removeUser,
            getUser: getUser,
            setUser: setUser,
            getProfile: getProfile,
            getUsers: getUsers,
            deleteUser: deleteUser,
            followUser: followUser,
            unfollowUser: unfollowUser,
            upsertUser: upsertUser
        };
    };
