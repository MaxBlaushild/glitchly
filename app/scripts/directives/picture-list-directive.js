    'use strict';

    angular
        .module('MainDirective')
        .directive('glPictureList', glPictureList);


    function glPictureList() {
        return {
            restrict: 'E',
            templateUrl: 'views/picture-list.html',
            controller: PictureCtrl,
            controllerAs: 'PictureCtrl',
            bindToController: true
        };
    };

