'use strict';

(function(){

  angular.module('MainController').controller('PictureCtrl', PictureCtrl);

  PictureCtrl.$inject = ['$routeParams','$location', 'PictureFactory', 'CommentFactory', 'LikeFactory'];

  function PictureCtrl($routeParams, $location, PictureFactory, CommentFactory, LikeFactory){
    var vm = this;
    var pictureId = $routeParams.pictureId;
    vm.picture = PictureFactory.picture;
    vm.comment = PictureFactory.comment;

    vm.createComment = function(id){
      CommentFactory.createComment(vm.comment, $routeParams.pictureId).then(function(response){
        addCommentToPicture(response.data.comment);
        vm.comment = '';
      });
    }

    function addCommentToPicture(comment) {
      vm.picture.comments.push(comment);
    }

    function switchLikeStatus(id, flag){
      flag ? vm.picture.likes-- : vm.picture.likes++;
      vm.picture.liked_by_user = !vm.picture.liked_by_user;
    }

    vm.toggleLike = function(id, likedByUser){
      var lessLikes;
      likedByUser ? lessLikes = true : lessLikes = false;
      (likedByUser ? LikeFactory.unlike(id) : LikeFactory.like(id)).then(function(response){
        switchLikeStatus(id, lessLikes);
      })
    }

    vm.deletePicture = function(){
      PictureFactory.deletePicture(pictureId);
    }

    function init(){
        PictureFactory.getPicture(pictureId);
    }

    init();

  }

})();
