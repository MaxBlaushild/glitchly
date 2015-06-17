'use strict';

angular
    .module('MainDirective')
    .directive('glPictureForm', glPictureForm);


function glPictureForm() {
    return {
        restrict: 'E',
        templateUrl: 'views/picture-form.html',
        controller: PictureCtrl,
        controllerAs: 'PictureCtrl',
        bindToController: true
    };
};

