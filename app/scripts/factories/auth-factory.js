'use strict';

angular
  .module('frontendApp')
  .factory('AuthFactory', AuthFactory);

  AuthFactory.$inject = ['$http', '$location', '$window'];

   function AuthFactory($http, $location, $window) {
    var currentUser = {};

    function getProfile() {
      return $http.get('http://localhost:3000/refresh-navbar')
        .success(function(response) {
          angular.copy(response.user, currentUser);
      });
    };

    var login = function(credentials){
      return $http.post('http://localhost:3000/login', credentials).success(function(response){
        angular.copy(response.user, currentUser);
        $window.localStorage.setItem('gl-user-token', response.user.token);
        $http.defaults.headers.common.Authorization = 'Token token=' + response.user.token;
        $location.path('');
      });
    };

    var logOut = function(){
      $window.localStorage.removeItem('gl-user-token');
      $location.path('/login');
    };

     var isLoggedIn = function(){
      var data = $window.localStorage.getItem('gl-user-token');
      if (data) {
        return true;
      } else {
        return false;
      };
    };

    return {
      login: login,
      logOut: logOut,
      getProfile: getProfile,
      currentUser: currentUser,
      isLoggedIn: isLoggedIn
    };

  };
