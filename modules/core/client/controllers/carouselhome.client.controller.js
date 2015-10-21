'use strict';

angular.module('core').controller('CarouselHomeController',['$scope', '$http', function ($scope, $http) {
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.slides = [{
        imglink: 'http://rock100diz.com/wp-content/uploads/2015/04/galets-5.jpg',
        content: 'These are rocks. They are interesting.',
        iflink: true,
        linktext: '#'
    }];

    $scope.addSlide = function (slide) {
        $scope.slides.push(slide);
    };

    $http.get('/api/homepage/carousel').success(function (res) {
        res.forEach(function (slide) {
            $scope.addSlide(slide);
        });
    });
}]);
