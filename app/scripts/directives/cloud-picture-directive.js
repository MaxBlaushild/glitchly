'use strict';

angular
    .module('MainDirective')
    .directive('glCloudPicture', glCloudPicture);


function glCloudPicture($location) {
  return function (scope, element) {

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };

    var startX = getRandomInt(100,1400);
    var startY = getRandomInt(100,600);
    var x = 0;
    var y = 0;

    element.css({
      top : startY,
      left : startX
    });

    element.on('dblclick', function(event){
      scope.$apply(function() {
        $location.path('/pictures/' + element.data("id"));
      });
    });

    element.on('mousedown', function(event) {
        event.preventDefault();
        $(document).on('mousemove', mousemove);
        $(document).on('mouseup', mouseup);
      });

      function mousemove(event) {
        y = event.pageY;
        x = event.pageX;
        element.css({
          top: y + 'px',
          left:  x + 'px'
        });
      }

      function mouseup() {
        $(document).off('mousemove', mousemove);
        $(document).off('mouseup', mouseup);
      }
  };
};

