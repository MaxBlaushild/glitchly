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
            var file = picture.image;
            picture.filter = '';
            if (picture.filters) {
                $.each(picture.filters, function(key, filter){
                    picture.filter += filter;
                });
            }
            if (picture.sliderFilters) {
                $.each(picture.sliderFilters, function(key, filter){
                    if (filter > 0) {
                        switch (key) {
                            case "paint":
                                picture.filter += '-paint ';
                                picture.filter += filter;
                                picture.filter += ' ';
                                break;
                            case "swirl":
                                picture.filter += '-swirl ';
                                picture.filter += filter;
                                picture.filter += ' ';
                                break;
                            case "implode":
                                picture.filter += '-implode ';
                                picture.filter += filter;
                                picture.filter += ' ';
                                break;
                            case "posterize":
                                picture.filter += '-posterize ';
                                picture.filter += filter;
                                picture.filter += ' ';
                                break;
                            case "powerleak":
                                picture.filter += '-morphology Thicken:';
                                picture.filter += filter;
                                picture.filter += ' "3x1+2+0: 1 0 0 " ';
                                break;
                            case "tapestry":
                                picture.filter += '-resize ';
                                picture.filter += filter;
                                picture.filter += 'x';
                                picture.filter += filter;
                                picture.filter += ' -define distort:viewport=510x510 -virtual-pixel Mirror -distort SRT 0  +repage ';
                                break;
                        };
                    }
                });
            }
            $location.path('/glitch-in-progress');
            return $upload.upload({
                url: appSettings.apiUrl + '/pictures',
                method: 'POST',
                fields: {
                    'picture[caption]': picture.caption,
                    'picture[filter]' : picture.filter
                },
                file: file,
                fileFormDataName: 'picture[image]'
            }).success(function(response){
                $location.path('/preview/' + response.picture.id);
            }).error(function(data, status){
                $location.path('/glitch-error');
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
