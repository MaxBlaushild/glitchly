'use strict';

(function(){

  angular
  .module('frontendApp')
  .service('AuthService', AuthService);

  AuthService.$inject = ['$http', '$location', 'appSettings'];

   function AuthService($http, $location, appSettings) {

    var login = function(credentials){
      return $http.post(appSettings.apiUrl + '/login', credentials).success(function(response){
        simpleStorage.set('gl-user-token', response.token);
        $http.defaults.headers.common.Authorization = 'Token token=' + response.token;
        $location.path('');
      });
    };

    var logOut = function(){
      simpleStorage.flush();
      $location.path('/try-glitchly');
    };

     var isLoggedIn = function(){
      return simpleStorage.get('gl-user-token');
    };

    return {
      login: login,
      logOut: logOut,
      isLoggedIn: isLoggedIn
    };

  };

})();


