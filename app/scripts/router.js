'use strict';

angular.module('frontendApp').config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html'
    })
    .when('/login', {
      templateUrl: 'views/login-page.html'
    })
    .when('/sign-up', {
      templateUrl: 'views/sign-up-view.html'
    })
    .when('/pictures', {
      templateUrl: 'views/picture-show-view.html'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);

