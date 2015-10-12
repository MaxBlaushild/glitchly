'use strict';

(function(){

  angular.module('MainDirective').directive('glComment', glComment);

  function glComment(){
    return {
      restrict: 'E',
      templateUrl: 'views/comment.html'
    };
  };

})();




