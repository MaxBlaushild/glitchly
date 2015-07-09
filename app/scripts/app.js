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
  .run(function($http, $window, $location, AuthFactory) {
    if(AuthFactory.isLoggedIn()){
      var data = $window.localStorage.getItem('gl-user-token');
      $http.defaults.headers.common.Authorization = 'Token token=' + data;
    }
  });



