'use strict';

angular
    .module('MainDirective')
    .directive('glCloudPicture', glCloudPicture);


function glCloudPicture($location) {
  return function (scope, element) {

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };

    var vpw = $(window).width();
    var vph = $(window).height();

    var startX = getRandomInt(0,vpw);
    var startY = getRandomInt(0,vph);
    var x = 0;
    var y = 0;

    element.css({
      top: startY,
      left: startX,
      height: (vph / 5) + 'px',
      width: (vph / 5) + 'px'
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

