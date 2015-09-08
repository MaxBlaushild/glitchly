'use strict';

(function(){

    angular
        .module('MainDirective')
        .directive('glPictureList', glPictureList);


    function glPictureList() {
        return {
            restrict: 'E',
            templateUrl: 'views/picture-list.html',
            controller: 'FeedCtrl',
            controllerAs: 'FeedCtrl',
            bindToController: true
        };
    };

})();



