'use strict';

(function(){

  angular
    .module('MainDirective')
    .directive('glPictureForm', glPictureForm);


  function glPictureForm() {
      return {
          restrict: 'E',
          templateUrl: 'views/picture-form.html',
          controller: 'PictureFormCtrl',
          controllerAs: 'PictureFormCtrl',
          bindToController: true
      };
  };

})();



