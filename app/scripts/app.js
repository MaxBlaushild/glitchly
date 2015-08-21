'use strict';

angular
  .module('frontendApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'MainController',
    'MainDirective'
  ])
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('fourOhOneInterceptor');
  })
  .run(function($rootScope, $http, $window, $location, $routeParams, AuthFactory, UserFactory, PictureFactory) {

    if(AuthFactory.isLoggedIn()){
      var data = simpleStorage.get('gl-user-token');
      $http.defaults.headers.common.Authorization = 'Token token=' + data;
    }

    var routesThatDontRequireAuth = ['/login', '/try-glitchly', '/sign-up'];

    var routeClean = function (route) {
      return (routesThatDontRequireAuth.indexOf(route) > -1);
    };

    $rootScope.$on('$routeChangeStart', function(){

      if (!routeClean($location.url()) && !AuthFactory.isLoggedIn()) {
        // redirect back to login
        $location.path('/try-glitchly');
      }

      if ($location.path() === '/users') {
        UserFactory.getUsers($location.search().username);
      } else if ($location.path() === '/followers') {
        UserFactory.getFollowers();
      } else if ($location.path() === '/following') {
        UserFactory.getFollowing();
      }

    });

  });



