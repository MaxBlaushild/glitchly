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
            return $http.get('https://desolate-gorge-7593.herokuapp.com/users/' + id)
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
            return $http.get('https://desolate-gorge-7593.herokuapp.com/users/' + id)
                .then(function(response) {
                    angular.copy(response.data, user);
                });
        };

        function getUsers(search) {
            return $http.get('https://desolate-gorge-7593.herokuapp.com/users?username=' + search)
                .then(function(response) {
                    angular.copy(response.data.users, users);
                });
        };

        function followUser(id){
            return $http.get('https://desolate-gorge-7593.herokuapp.com/users/' + id + '/follow')
                .then(function(response) {
                    angular.copy(response.data.user, user);
                    if (users.length > 0 ){
                        users[findUserIndexById(id)] = response.data.user;
                    }
                });
        };

        function unfollowUser(id){
            return $http.get('https://desolate-gorge-7593.herokuapp.com/users/' + id + '/unfollow')
                .then(function(response) {
                    angular.copy(response.data.user, user);
                    if (users.length > 0 ){
                        users[findUserIndexById(id)] = response.data.user;
                    }
                });
        };

        function upsertUser(user) {
            var params = {
                auth: user
            };
            if (user.id) {
                return $http.put('https://desolate-gorge-7593.herokuapp.com/users' + user.id, params)
                    .success(getUsers);
            } else {
                var file = user.avatar;
                return $upload.upload({
                    url: 'https://desolate-gorge-7593.herokuapp.com/register',
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
            return $http.delete('https://desolate-gorge-7593.herokuapp.com/users/' + user.id);
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
