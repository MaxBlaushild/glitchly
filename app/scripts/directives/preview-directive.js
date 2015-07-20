angular
    .module('MainDirective')
    .directive('glPreview', glPreview);

function glPreview(){
  return {
    restrict: 'A',
    link: function(scope, element){
      scope.PictureCtrl.showPicture();
    }
  }
}
