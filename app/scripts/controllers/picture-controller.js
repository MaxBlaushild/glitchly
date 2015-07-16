'use strict';
angular.module('MainController').controller('PictureCtrl', PictureCtrl);


PictureCtrl.$inject = ['$routeParams','$location', 'PictureFactory', 'CommentFactory', 'LikeFactory'];

function PictureCtrl($routeParams, $location, PictureFactory, CommentFactory, LikeFactory){
  var vm = this;
  var pictureId = $routeParams.pictureId;
  vm.picture = PictureFactory.picture;
  vm.pictures = PictureFactory.pictures;
  vm.comment = PictureFactory.comment;

  vm.createComment = function(id){
    CommentFactory.createComment(vm.comment, $routeParams.pictureId).then(function(response){
      addCommentToPicture(response.data.comment, id);
      vm.comment = '';
    })
  };

  function addCommentToPicture(comment, id) {
    vm.picture.comments.push(comment);
    for (var i = 0; i < vm.pictures.length; i++) {
        if (vm.pictures[i].id === id) {
            vm.pictures[i].comments.push(comment);
        };
    };
  };

  function switchLikeStatus(id, flag){
    flag ? vm.picture.likes-- : vm.picture.likes++;
    vm.picture.liked_by_user = !vm.picture.liked_by_user;
    for (var i = 0; i < vm.pictures.length; i++) {
        if (vm.pictures[i].id === id) {
            vm.pictures[i].liked_by_user = !vm.pictures[i].liked_by_user;
        };
    };
  }

  vm.createPicture = function(picture) {
    PictureFactory.createPicture(picture).then(function() {
      resetForm();
    }, function(response) {
      vm.serverErrors = true;
      vm.serverErrorMsg = handleErrors(response.data);
    });
  };

  vm.toggleLike = function(id, likedByUser){
    var lessLikes;
    likedByUser ? lessLikes = true : lessLikes = false;
    (likedByUser ? LikeFactory.unlike(id) : LikeFactory.like(id)).then(function(response){
      switchLikeStatus(id, lessLikes);
    })
  }


  vm.showPictures = function(){
      PictureFactory.getPictures();
  };

  vm.showFeed = function(){
      PictureFactory.getFeed();
  };

  vm.showPicture = function(){
      PictureFactory.getPicture(pictureId);
  };

  function resetForm() {
      PictureFactory.setPicture({});
      vm.serverErrors = false;
  };

  vm.cancel = function() {
      resetForm();
  };

  function handleErrors(errObj) {
      var errString = '';

      angular.forEach(errObj, function(value, key) {
          errString += key + ': ' + value;
      });

      return errString;
  };
};
