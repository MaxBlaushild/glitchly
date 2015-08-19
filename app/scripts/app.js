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
  .run(function($rootScope, $http, $window, $location, $routeParams, AuthFactory, UserFactory, PictureFactory) {
    if(AuthFactory.isLoggedIn()){
      var data = simpleStorage.get('gl-user-token');
      $http.defaults.headers.common.Authorization = 'Token token=' + data;
    }

    $rootScope.$on('$routeChangeStart', function(){
      if ($location.path() === '/users') {
        UserFactory.getUsers($location.search().username);
      } else if ($location.path() === '/followers') {
        UserFactory.getFollowers();
      } else if ($location.path() === '/following') {
        UserFactory.getFollowing();
      }
    });

  });



