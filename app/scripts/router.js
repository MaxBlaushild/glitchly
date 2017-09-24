'use strict';

(function(){

  angular.module('frontendApp').config(['$routeProvider', function($routeProvider){
    $routeProvider
      // .when('/', {
      //   templateUrl: 'views/main.html'
      // })
      // .when('/login', {
      //   templateUrl: 'views/login-page.html'
      // })
      // .when('/followers', {
      //   templateUrl: 'views/user-list-view.html',
      //   controller: 'followersController',
      //   controllerAs: 'UserCtrl'
      // })
      // .when('/following', {
      //   templateUrl: 'views/user-list-view.html',
      //   controller: 'followingController',
      //   controllerAs: 'UserCtrl'
      // })
      // .when('/try-glitchly', {
      //   templateUrl: 'views/landing-page.html'
      // })
      // .when('/sign-up', {
      //   templateUrl: 'views/sign-up-view.html'
      // })
      // .when('/pictures/:pictureId', {
      //   templateUrl: 'views/picture-show-view.html'
      // })
      // .when('/discover', {
      //   templateUrl: 'views/discover-view.html'
      // })
      .when('/', {
        templateUrl: 'views/new-picture-view.html'
      })
      // .when('/users', {
      //   templateUrl: 'views/user-list-view.html',
      //   controller: 'usersController',
      //   controllerAs: 'UserCtrl'
      // })
      // .when('/users/:userId', {
      //   templateUrl: 'views/user-show-view.html'
      // })
      // .when('/glitch-in-progress', {
      //   templateUrl: 'views/glitch-in-progress-view.html'
      // })
      .otherwise({
        redirectTo: '/'
      });
  }]);

})();

