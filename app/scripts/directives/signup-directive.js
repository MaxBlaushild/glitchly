    'use strict';

    angular
        .module('MainDirective')
        .directive('glSignUpForm', glSignUpForm);


    function glSignUpForm() {
        return {
            restrict: 'E',
            templateUrl: 'views/sign-up-form.html',
            controller: UserCtrl,
            controllerAs: 'UserCtrl',
            bindToController: true
        };
    };

