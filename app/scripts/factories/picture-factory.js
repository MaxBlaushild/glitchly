'use strict';

    angular
        .module('frontendApp')
        .factory('PictureFactory', PictureFactory);

    PictureFactory.$inject = ['$http', '$upload', '$window', '$location', 'appSettings'];

    function PictureFactory($http, $upload, $window,  $location, appSettings) {
        var picture = {};
        picture.sliderFilters = {};
        picture.sliderFilters.paint = 0;
        picture.sliderFilters.swirl = 0;
        picture.sliderFilters.implode = 0;
        picture.sliderFilters.powerleak = 0;
        picture.sliderFilters.tapestry = 0;
        picture.sliderFilters.posterize = 0;
        picture.filters = {};
        var pictures = [];


        function setPicture(newPicture) {
            angular.copy(newPicture, picture);
        };

        function getFeed(id) {
            return $http.get(appSettings.apiUrl)
                .then(function(response) {
                    angular.copy(response.data.pictures, pictures);
            });
        };

        function getPicture(id) {
            return $http.get(appSettings.apiUrl + '/pictures/' + id)
                .then(function(response) {
                    angular.copy(response.data.picture, picture);
            });
        };

        function getPictures(id) {
            return $http.get(appSettings.apiUrl + '/pictures')
                .then(function(response) {
                    angular.copy(response.data.pictures, pictures);
            });
        };

        function deletePicture(id){
            return $http.delete(appSettings.apiUrl + '/pictures/' + id).then(function(reponse){
                $location.path('/new-picture');
            });
        };

        function createPicture(picture) {
            var picture = { picture: picture };
            return $http.post(appSettings.apiUrl + '/pictures', picture).then(function(response){
                angular.copy(response.data.picture, picture);
            });
        };

        function findPictureIndexById(id) {
            for (var i = 0; i < pictures.length; i++) {
                if (pictures[i].id === id) {
                    return i;
                }
            };
        };

        return {
            picture: picture,
            pictures: pictures,
            getFeed: getFeed,
            deletePicture: deletePicture,
            setPicture: setPicture,
            createPicture: createPicture,
            getPictures: getPictures,
            getPicture: getPicture
        };
    }
