(function IFFEE(){

'use strict';

function LikeFactory($http) {

  var like = function(pictureId){
    var like = { like: {  }  };
    return $http.post('http://localhost:3000/pictures/' + pictureId + '/likes', like).success(function(response){
      angular.copy(response.like, like);
    });
  };

  var unlike = function(pictureId){
    return $http.delete('http://localhost:3000/pictures/' + pictureId + '/likes').success(function(response){
      angular.copy({}, like);
    });
  };


  return {
    like: like,
    unlike: unlike
  };

};

angular.module('frontendApp').factory('LikeFactory', LikeFactory);

LikeFactory.$inject = ['$http'];

})();
