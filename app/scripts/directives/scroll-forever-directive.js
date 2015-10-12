'use strict';

(function(){

    angular.module('MainDirective').directive("glScrollForever", [function () {

      return {
        restrict: 'A',
        link: function(scope, element, attributes, FeedCtrl){

          function getDocHeight() {
            var D = document;
            return Math.max(
                D.body.scrollHeight, D.documentElement.scrollHeight,
                D.body.offsetHeight, D.documentElement.offsetHeight,
                D.body.clientHeight, D.documentElement.clientHeight
            );
          }

         $(window).scroll(function() {

            if ($(window).scrollTop() + $(window).height() > getDocHeight() - 100) {

              if (scope.FeedCtrl.feed.length % 14 == 0) {
                scope.FeedCtrl.getMoreFeed();
              } else {
                $(window).unbind();
              }

            }
        });
      }
    }
    }]);

})();
