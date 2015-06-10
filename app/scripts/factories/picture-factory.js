'use strict';

    angular
        .module('frontendApp')
        .factory('PictureFactory', PictureFactory);

    PictureFactory.$inject = ['$http', '$window', '$location'];

    function PictureFactory($http, $window, $location) {
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
                    angular.copy(response.data, pictures);
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
            getPictures: getPictures,
            getPicture: getPicture
        };
    }
