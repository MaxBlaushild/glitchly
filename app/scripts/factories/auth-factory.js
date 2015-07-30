'use strict';

angular
  .module('frontendApp')
  .factory('AuthFactory', AuthFactory);

  AuthFactory.$inject = ['$http', '$location', '$window', 'appSettings'];

   function AuthFactory($http, $location, $window, appSettings) {
    var currentUser = {};

    function getProfile() {
      return $http.get(appSettings.apiUrl + '/refresh-navbar')
        .success(function(response) {
          angular.copy(response.user, currentUser);
      });
    };

    var login = function(credentials){
      return $http.post(appSettings.apiUrl + '/login', credentials).success(function(response){
        angular.copy(response.user, currentUser);
        $window.localStorage.setItem('gl-user-token', response.token);
        $http.defaults.headers.common.Authorization = 'Token token=' + response.token;
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
