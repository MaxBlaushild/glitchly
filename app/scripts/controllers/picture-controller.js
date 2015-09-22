'use strict';

(function(){

  angular.module('MainController').controller('PictureCtrl', PictureCtrl);

  PictureCtrl.$inject = ['$routeParams','$location', 'PictureFactory', 'CommentFactory', 'LikeFactory', '$timeout'];

  function PictureCtrl($routeParams, $location, PictureFactory, CommentFactory, LikeFactory, $timeout){
    var vm = this;
    var pictureId = $routeParams.pictureId;
    vm.picture = PictureFactory.picture;
    vm.comment = PictureFactory.comment;
    vm.commentPage = 1;
    vm.hasMoreComments = true;

    vm.createComment = function(id){
      CommentFactory.createComment(vm.comment, $routeParams.pictureId).then(function(response){
        addCommentToPicture(response.data.comment);
        vm.comment = '';
      });
    }

    function addCommentToPicture(comment) {
      vm.picture.comments.unshift(comment);
      if (vm.picture.comments.length > 5){
        vm.picture.comments.pop();
      }
    }

    function switchLikeStatus(id, flag){
      flag ? vm.picture.likes-- : vm.picture.likes++;
      vm.picture.liked_by_user = !vm.picture.liked_by_user;
    }

    vm.checkCommentLength = function(response){
      if (response.data.comments.length === 0) {
        $timeout(function(){
          vm.hasMoreComments = false;
        });
      }
    }

    vm.getMoreComments = function(){
      vm.commentPage++;
      CommentFactory.getMoreComments(vm.commentPage, vm.picture.id).then(function(response){
        vm.checkCommentLength(response);
        response.data.comments.forEach(function(comment){
          vm.picture.comments.push(comment);
        });
      });
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
