'use strict';

(function(){

  angular.module('MainController').controller('PictureCloudCtrl', PictureCloudCtrl);


  PictureCloudCtrl.$inject = ['PictureFactory'];

  function PictureCloudCtrl(PictureFactory){
    var vm = this;
    vm.pictures = PictureFactory.pictures;

    function init(){
      PictureFactory.getPictures();
    }

    init();
  }

})();
