'use strict';

(function(){

  angular
      .module('MainDirective')
      .directive('glUserList', glUserList);


  function glUserList() {
      return {
          restrict: 'E',
          templateUrl: 'views/user-list.html',
          controller: 'UserCtrl',
          controllerAs: 'UserCtrl',
          bindToController: true
      };
  };

})();

