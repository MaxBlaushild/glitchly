'use strict';

(function(){

  angular
  .module('frontendApp')
  .factory('AuthFactory', AuthFactory);

  AuthFactory.$inject = ['$http', '$location', '$window', 'appSettings'];

   function AuthFactory($http, $location, $window, appSettings) {
    var currentUser = {};

    function getProfile() {
      return $http.get(appSettings.apiUrl + '/refresh-navbar')
        .then(function(response) {
          angular.copy(response.user, currentUser);
      });
    };

    var login = function(credentials){
      return $http.post(appSettings.apiUrl + '/login', credentials).success(function(response){
        angular.copy(response.user, currentUser);
        simpleStorage.set('gl-user-token', response.token);
        $http.defaults.headers.common.Authorization = 'Token token=' + response.token;
        $location.path('');
      });
    };

    var logOut = function(){
      simpleStorage.flush();
      $location.path('/login');
    };

     var isLoggedIn = function(){
      var data = simpleStorage.get('gl-user-token');
      return (data);
    };

    return {
      login: login,
      logOut: logOut,
      getProfile: getProfile,
      currentUser: currentUser,
      isLoggedIn: isLoggedIn
    };

  };

})();


