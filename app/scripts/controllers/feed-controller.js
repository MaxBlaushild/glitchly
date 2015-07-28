(function(){

angular.module('frontendApp').controller('FeedCtrl', FeedCtrl);

FeedCtrl.$inject = ['$location', 'PictureFactory', 'CommentFactory', 'LikeFactory'];

function FeedCtrl($location, PictureFactory, CommentFactory, LikeFactory){
  var vm = this;

    vm.toggleLike = function(id, likedByUser){
    var lessLikes;
    likedByUser ? lessLikes = true : lessLikes = false;
    (likedByUser ? LikeFactory.unlike(id) : LikeFactory.like(id)).then(function(response){
      switchLikeStatus(id, lessLikes);
    })
  };

}
})();
