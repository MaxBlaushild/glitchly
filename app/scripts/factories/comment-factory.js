'use strict';

(function(){

  function CommentFactory($http, appSettings) {
    var comment = {};
    var comments = [];

    var createComment = function(body, pictureId) {

      var comment = { comment: {
        body: body
      } };

      return $http.post(appSettings.apiUrl + '/pictures/' + pictureId + '/comments', comment).success(function(response){
        angular.copy(response.comment, comment);
      });
    }

    var getMoreComments = function(page, pictureId) {
      return $http.get(appSettings.apiUrl + '/pictures/' + pictureId + '/comments?page=' + page);
    }

    return {
      comment: comment,
      comments: comments,
      getMoreComments: getMoreComments,
      createComment: createComment
    };

  };

  angular.module('frontendApp').factory('CommentFactory', CommentFactory);

  CommentFactory.$inject = ['$http', 'appSettings'];

})();
