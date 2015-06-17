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
    .when('/discover', {
      templateUrl: 'views/discover-view.html'
    })
    .when('/glitch-a-pic', {
      templateUrl: 'views/new-picture-view.html'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);

