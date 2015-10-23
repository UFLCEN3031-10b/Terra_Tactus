'use strict';

angular.module('core').controller('CarouselEditController', ['$scope', '$http', '$location', '$window', function ($scope, $http, $location, $window) {
    $scope.slides = [];
    $scope.editslide = null;

    var makeNull = function () {
        $scope.imglink = '';
        $scope.linktext = '';
        $scope.content = '';
    };

    makeNull();

    $scope.setEditSlide = function (slide) {
        $scope.editslide = slide;
    };

    $scope.update = function (slide) {
        var linkexists = (slide.linktext !== '');
        var req = {
            imglink: slide.imglink,
            iflink: linkexists,
            linktext: slide.linktext,
            content: slide.content
        };

        $http.put('/api/homepage/carousel/' + slide._id, req).success(function (res) {
            makeNull();
            $window.location.reload();
        });
    };

    $scope.delete = function (slide) {
        $http.delete('/api/homepage/carousel/' + slide._id).success(function (res) {
            $window.location.reload();
        });
    };

    $scope.create = function () {
        var linkexists = ($scope.linktext !== '');
        var req = {
            imglink: $scope.imglink,
            iflink: linkexists,
            linktext: $scope.linktext,
            content: $scope.content
        };

        $http.post('/api/homepage/carousel', req).success(function (res) {
            $location.path('');
        });
    };

    $scope.cancel = function () {
        makeNull();
        $scope.editslide = null;
    };

    $http.get('/api/homepage/carousel').success(function (res) {
        $scope.slides = res;
    });
}]);
