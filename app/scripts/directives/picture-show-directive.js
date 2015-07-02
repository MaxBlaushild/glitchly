'use strict';

angular
    .module('MainDirective')
    .directive('glPictureShow', glPictureShow);


function glPictureShow() {
    return {
        restrict: 'E',
        templateUrl: 'views/picture-show.html',
        controller: PictureCtrl,
        controllerAs: 'PictureCtrl',
        bindToController: true,
        link: function(scope, element, attr){
          scope.PictureCtrl.showPicture();
        }
    };
};

