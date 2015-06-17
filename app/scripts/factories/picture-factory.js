'use strict';

    angular
        .module('frontendApp')
        .factory('PictureFactory', PictureFactory);

    PictureFactory.$inject = ['$http', '$upload', '$window', '$location'];

    function PictureFactory($http, $upload, $window,  $location) {
        var picture = {};
        var pictures = [];


        function setPicture(newPicture) {
            angular.copy(newPicture, picture);
        }

        function getFeed(id) {
            return $http.get('http://localhost:3000')
                .then(function(response) {
                    angular.copy(response.data.pictures, pictures);
            });
        }

        function getPicture(id) {
            return $http.get('http://localhost:3000/pictures/' + id)
                .then(function(response) {
                    angular.copy(response.data.picture, picture);
            });
        }

        function getPictures(id) {
            return $http.get('http://localhost:3000/pictures')
                .then(function(response) {
                    angular.copy(response.data.pictures, pictures);
            });
        }

        function createPicture(picture) {
            var file = picture.image;
            return $upload.upload({
                url: 'http://localhost:3000/pictures',
                method: 'POST',
                fields: { 'picture[caption]': picture.caption },
                file: file,
                fileFormDataName: 'picture[image]'
            }).then(function(response){
                $location.path('/pictures');
                $location.hash(response.data.picture.id);
            });
        }

        function findPictureIndexById(id) {
            for (var i = 0; i < pictures.length; i++) {
                if (pictures[i].id === id) {
                    return i;
                }
            }
        }

        return {
            picture: picture,
            pictures: pictures,
            getFeed: getFeed,
            setPicture: setPicture,
            createPicture: createPicture,
            getPictures: getPictures,
            getPicture: getPicture
        };
    }
