'use strict';

angular.module('core').controller('CarouselHomeController',['$scope', '$http', function ($scope, $http) {
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.slides = [];

    $scope.addSlide = function (slide) {
        $scope.slides.push(slide);
    };

    $http.get('/api/homepage/carousel').success(function (res) {
        res.forEach(function (slide) {
            $scope.addSlide(slide);
        });
    });
}]);
