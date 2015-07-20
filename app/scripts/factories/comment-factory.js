(function IFFEE(){

'use strict';

function CommentFactory($http, appSettings) {
  var comment = {};
  var comments = [];

  var createComment = function(body, pictureId){
    var comment = { comment: {
      body: body
    }};

    return $http.post(appSettings.apiUrl + '/pictures/' + pictureId + '/comments', comment).success(function(response){
      angular.copy(response.comment, comment);
    });
  };

  return {
    comment: comment,
    comments: comments,
    createComment: createComment
  };

};

angular.module('frontendApp').factory('CommentFactory', CommentFactory);

CommentFactory.$inject = ['$http', 'appSettings'];

})();
