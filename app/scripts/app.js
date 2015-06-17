'use strict';

angular
  .module('frontendApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'angularFileUpload',
    'ngTouch',
    'MainController',
    'MainDirective'
  ])
  .run(function($rootScope, $http, $window, $location, AuthFactory, PictureFactory) {
    if(AuthFactory.isLoggedIn()){
      var data = $window.localStorage.getItem('gl-user-token');
      $http.defaults.headers.common.Authorization = 'Token token=' + data;
    } else {
      $location.path('/login');
    }

    $rootScope.$on('$routeChangeStart', function(){
        if ($location.path() === '/') {
            PictureFactory.getFeed();
        } else if ($location.path() === '/pictures') {
            var id = $location.hash();
            PictureFactory.getPicture(id);
        } else if ($location.path() === '/discover') {
            PictureFactory.getPictures();
        };
    });
});



