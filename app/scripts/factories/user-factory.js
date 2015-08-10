'use strict';

(function(){

    angular
        .module('frontendApp')
        .factory('UserFactory', UserFactory);

    UserFactory.$inject = ['$http', '$window', '$location', 'appSettings'];

    function UserFactory($http, $window, $location, appSettings) {
        var users = [];
        var user = {};
        var search;

        function setUser(newUser) {
            angular.copy(newUser, user);
        };

        function getUser(id) {
            return $http.get(appSettings.apiUrl + '/users/' + id)
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
            return $http.get(appSettings.apiUrl + '/users/' + id)
                .then(function(response) {
                    angular.copy(response.data, user);
                });
        };

        function getUsers(search) {
            return $http.get(appSettings.apiUrl + '/users?username=' + search)
                .then(function(response) {
                    angular.copy(response.data.users, users);
                });
        };

        function getFollowers() {
            return $http.get(appSettings.apiUrl + '/followers')
                .then(function(response) {
                    angular.copy(response.data.users, users);
                });
        };

        function getFollowing() {
            return $http.get(appSettings.apiUrl + '/following')
                .then(function(response) {
                    angular.copy(response.data.users, users);
                });
        };

        function followUser(id){
            return $http.get(appSettings.apiUrl + '/users/' + id + '/follow')
                .then(function(response) {
                    angular.copy(response.data.user, user);
                    if (users.length > 0 ){
                        users[findUserIndexById(id)] = response.data.user;
                    }
                });
        };

        function unfollowUser(id){
            return $http.get(appSettings.apiUrl + '/users/' + id + '/unfollow')
                .then(function(response) {
                    angular.copy(response.data.user, user);
                    if (users.length > 0 ){
                        users[findUserIndexById(id)] = response.data.user;
                    }
                });
        };

        function upsertUser(user) {
            if (user.id) {
                var params = {
                    user: user
                };
                return $http.patch(appSettings.apiUrl + '/users', params).then(function(response){
                    angular.copy(response.data.user, user);
                    location.reload();
                });
            } else {
                var params = {
                    auth: user
                };
                return $http.post(appSettings.apiUrl + '/register', params).success(function(response) {
                    $window.localStorage.setItem('gl-user-token', response.token);
                    $http.defaults.headers.common.Authorization = 'Token token=' + response.token;
                    $location.path('/');
                });
            };
        };

        function deleteUser(user) {
            return $http.delete(appSettings.apiUrl + '/users/' + user.id);
        };

        return {
            search: search,
            users: users,
            user: user,
            removeUser: removeUser,
            getUser: getUser,
            setUser: setUser,
            getProfile: getProfile,
            getFollowing: getFollowing,
            getFollowers: getFollowers,
            getUsers: getUsers,
            deleteUser: deleteUser,
            followUser: followUser,
            unfollowUser: unfollowUser,
            upsertUser: upsertUser
        };
    };

})();
