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
        };
    //     TournamentFactory.getTournament(id);
    //     OutcomeFactory.getOutcomes(id);
    //     RoundFactory.getRounds(id);
    //     TeamFactory.getMyTeam(id);
    //   } else if ($location.path() === '/new-tournament') {
    //     TournamentFactory.setTournament({});
    //   } else if ($location.path() === '/invitations') {
    //     InvitationFactory.getInvitations();
    //   } else if ($location.path() === '/profile') {
    //     var id = $location.hash();
    //     UserFactory.getUser(id);
    //   } else if ($location.path() === '/teams') {
    //     var id = $location.hash();
    //     TeamFactory.getTeams(id);
    //   } else if ($location.path() === '/team') {
    //     var id = $location.hash();
    //     TeamFactory.getTeam(id);
    //   }
    });
  });



