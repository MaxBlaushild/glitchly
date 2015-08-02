'use strict';

(function(){

    angular
        .module('MainDirective')
        .directive('glUserShow', glUserShow);


    function glUserShow() {
        return {
            restrict: 'E',
            templateUrl: 'views/user-show.html',
            controller: 'UserCtrl',
            controllerAs: 'UserCtrl',
            bindToController: true,
            link: function(scope){
              scope.UserCtrl.showUser();
            }
        };
    };

})();
