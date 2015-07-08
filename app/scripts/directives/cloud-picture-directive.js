'use strict';

angular
    .module('MainDirective')
    .directive('glCloudPicture', glCloudPicture);


function glCloudPicture() {
  return function (scope, element) {
    var startX = getRandomInt(-100,600), startY = getRandomInt(-100,600), x = 0, y = 0;

    element.css({
      'top' : startX,
      // 'bottom' : getRandomInt(-100,600),
      'left' : startY,
      // 'right' : getRandomInt(-100,600)
    });

    element.on('mousedown', function(event) {
        // Prevent default dragging of selected content
        event.preventDefault();
        startX = event.pageX - x;
        startY = event.pageY - y;
        $(document).on('mousemove', mousemove);
        $(document).on('mouseup', mouseup);
      });

      function mousemove(event) {
        y = event.pageY - startY;
        x = event.pageX - startX;
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

