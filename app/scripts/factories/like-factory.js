'use strict';

(function IFFEE(){

  function LikeFactory($http, appSettings) {

    var like = function(pictureId){
      var like = { like: {  }  };
      return $http.post(appSettings.apiUrl + '/pictures/' + pictureId + '/likes', like).success(function(response){
        angular.copy(response.like, like);
      });
    };

    var unlike = function(pictureId){
      return $http.delete(appSettings.apiUrl + '/pictures/' + pictureId + '/likes').success(function(response){
        angular.copy({}, like);
      });
    };

    return {
      like: like,
      unlike: unlike
    };

  };

  angular.module('frontendApp').factory('LikeFactory', LikeFactory);

  LikeFactory.$inject = ['$http', 'appSettings'];

})();
