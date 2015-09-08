'use strict';

(function(){

    angular
        .module('MainDirective')
        .directive('glPictureCloud', glPictureCloud);


    function glPictureCloud() {
        return {
            restrict: 'E',
            templateUrl: 'views/picture-cloud.html',
            controller: 'PictureCloudCtrl',
            controllerAs: 'PictureCloudCtrl',
            bindToController: true,
        };
    };

})();


