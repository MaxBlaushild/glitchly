'use strict';

angular
  .module('frontendApp')
  .factory('AuthFactory', ['$http', '$location', '$window', function($http, $location, $window) {
    var profile = {};

    function getProfile() {
      var id = $window.localStorage.getItem('tl-user-id');
      return $http.get('http://localhost:3000/users/' + id)
        .success(function(response) {
          angular.copy(response, profile);
      });
    };

    var login = function(credentials){
      return $http.post('http://localhost:3000/login', credentials).success(function(response){
        $window.localStorage.setItem('gl-user-token', response.token);
        $http.defaults.headers.common.Authorization = 'Token token=' + response.token;
        $location.path('');
      });
    };

    var logout = function(){
      return $http.get('http://localhost:3000/logout').success(function(response){
        $window.localStorage.removeItem('gl-user-token');
        $location.path('sign-up');
      });
    };

     var isLoggedIn = function(){
      var data = $window.localStorage.getItem('gl-user-token');
      if (data) {
        return true;
      } else {
        return false;
      }
    };

    return {
      login: login,
      logout: logout,
      profile: profile,
      getProfile: getProfile,
      isLoggedIn: isLoggedIn
    };

  }]);
