'use strict';

angular.module('frontendApp').config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html'
    })
    .when('/login', {
      templateUrl: 'views/login.html'
    })
    .when('/sign-up', {
      templateUrl: 'views/sign-up-view.html'
    })
    .when('/new-tournament', {
      templateUrl: 'views/tourney-form-view.html'
    })
    .when('/profile', {
      templateUrl: 'views/user-show.html'
    })
    .when('/tournament', {
      templateUrl: 'views/tourney-view.html'
    })
    .when('/team', {
      templateUrl: 'views/team-show-view.html'
    })
    .when('/teams', {
      templateUrl: 'views/team-list-view.html'
    })
    .when('/invitations', {
      templateUrl: 'views/invitation-view.html'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);

