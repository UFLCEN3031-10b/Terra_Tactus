'use strict';

angular.module('core').controller('CarouselHomeController', function ($scope) {
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.slides = [{
        image: 'http://rock100diz.com/wp-content/uploads/2015/04/galets-5.jpg',
        text: 'These are rocks. They are interesting.',
        link: '#'
    }, {
        image: 'http://janasays.com/wp-content/uploads/2012/05/rocks.jpg',
        text: 'These are more rocks. They are more interesting.',
        link: '#'
    }];

    $scope.addSlide = function (newImage, newText) {
        $scope.slides.push({
            image: newImage,
            text: newText
        });
    };
});
