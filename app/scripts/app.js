'use strict';

angular
  .module('frontendApp', [
    'ngRoute',
    'MainController',
    'infinite-scroll',
    'MainDirective'
  ])
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('fourOhOneInterceptor');

    var authToken = simpleStorage.get('gl-user-token');
    if (authToken) {
      $httpProvider.defaults.headers.common.Authorization = 'Token token=' + authToken;
    }

  })
  .run(function($rootScope, $http, $window, $location, $routeParams, AuthService) {

    var routesThatDontRequireAuth = ['/login', '/try-glitchly', '/sign-up'];

    var routeClean = function (route) {
      return (routesThatDontRequireAuth.indexOf(route) > -1);
    };

    $rootScope.$on('$routeChangeStart', function(){

      if (!routeClean($location.url()) && !AuthService.isLoggedIn()) {
        // redirect back to login
        $location.path('/try-glitchly');
      }

    });

  });



