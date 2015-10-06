'use strict';

angular.module('core').controller('CarouselPortalController', function ($scope) {
    $scope.myInterval = 3000;
    $scope.noWrapSlides = false;
    $scope.slides = [{
        image: 'http://www.bls.gov/fls/chinamap.png',
        text: 'China',
        link: 'China'
    }, {
        image: 'http://www.papillon.com/acc_img/vault/papillon/img/canyon-hero.jpg',
        text: 'Grand Canyon',
        link: '#'
    }];

    $scope.addSlide = function (newImage, newText) {
        $scope.slides.push({
            image: newImage,
            text: newText
        });
    };
});
