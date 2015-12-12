'use strict';

angular.module('core').controller('CarouselHomeController',['$scope', '$http', function ($scope, $http) {
    // how quick the slides change
    $scope.myInterval = 5000;

    // should slides wrap around
    $scope.noWrapSlides = false;

    // array of slides
    $scope.slides = [];

    // function for adding slides
    $scope.addSlide = function (slide) {
        $scope.slides.push(slide);
    };

    // get a list of the slides and add each one
    $http.get('/api/homepage/carousel').success(function (res) {
        res.forEach(function (slide) {
            $scope.addSlide(slide);
        });
    });
}]);
