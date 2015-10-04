'use strict';

(function(){

  angular.module('frontendApp').factory('CurrentUserFactory', CurrentUserFactory);

  function CurrentUserFactory($http, appSettings){

    var currentUser = {};

    function getCurrentUser() {
      return $http.get(appSettings.apiUrl + '/refresh-navbar')
        .then(function(response) {
          angular.copy(response.data.user, currentUser);
      });
    };

    return {
      currentUser: currentUser,
      getCurrentUser: getCurrentUser
    }


  }

  CurrentUserFactory.$inject = ['$http', 'appSettings', 'NotificationFactory'];

})();


