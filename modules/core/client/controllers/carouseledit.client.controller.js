'use strict';

angular.module('core').controller('CarouselEditController', ['$scope', '$http', '$location', '$window', function ($scope, $http, $location, $window) {
    // array of slides, initially empty
    $scope.slides = [];

    // current slide for editting is null
    $scope.editslide = null;

    // set up empty variables for editting
    var makeNull = function () {
        $scope.imglink = '';
        $scope.linktext = '';
        $scope.content = '';
    };

    // declare these variables
    makeNull();

    // set the edit slide to the given slide
    $scope.setEditSlide = function (slide) {
        $scope.editslide = slide;
    };

    // update function which sends changes to api
    $scope.update = function (slide) {
        var linkexists = (slide.linktext !== '');
        var req = {
            imglink: slide.imglink,
            iflink: linkexists,
            linktext: slide.linktext,
            content: slide.content
        };

        $http.put('/api/homepage/carousel/' + slide._id, req).success(function (res) {
            // set editing variables to null
            makeNull();

            // reload the page
            $window.location.reload();
        });
    };

    // function to call api to remove given slide
    $scope.delete = function (slide) {
        $http.delete('/api/homepage/carousel/' + slide._id).success(function (res) {
            $window.location.reload();
        });
    };

    // this function works similarly to update
    $scope.create = function () {
        var linkexists = ($scope.linktext !== '');
        var req = {
            imglink: $scope.imglink,
            iflink: linkexists,
            linktext: $scope.linktext,
            content: $scope.content
        };

        // post new data and redirect to homepage
        $http.post('/api/homepage/carousel', req).success(function (res) {
            $location.path('');
        });
    };

    // set values back to null and edit slide to null
    $scope.cancel = function () {
        makeNull();
        $scope.editslide = null;
    };

    // fill with initial data
    $http.get('/api/homepage/carousel').success(function (res) {
        $scope.slides = res;
    });
}]);
