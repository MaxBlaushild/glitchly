    'use strict';

    angular
        .module('MainDirective')
        .directive('glPictureGrid', glPictureGrid);


    function glPictureGrid() {
        return {
            restrict: 'E',
            templateUrl: 'views/picture-grid.html',
            controller: PictureCtrl,
            controllerAs: 'PictureCtrl',
            bindToController: true,
            link: function(scope){
                scope.PictureCtrl.showPictures();
            }
        };
    };

