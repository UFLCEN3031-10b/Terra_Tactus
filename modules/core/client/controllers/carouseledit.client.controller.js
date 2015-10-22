'use strict';

angular.module('core').controller('CarouselEditController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.slides = [];
    $scope.editslide = null;

    $scope.imglink = '';
    $scope.linktext = '';
    $scope.content = '';

    $scope.setEditSlide = function (slide) {
        $scope.editslide = slide;
    };

    $scope.update = function (slide) {
        var linkexists = (this.linktext !== '');
        var req = {
            imglink: this.imglink,
            iflink: linkexists,
            linktext: this.linktext,
            content: this.content
        };

        $http.put('/api/homepage/carousel/' + slide._id, req).success(function (res) {
            this.imglink = '';
            this.linktext = '';
            this.content = '';
            $location.path($location.path());
        });
    };

    $scope.create = function () {
        var linkexists = (this.linktext !== '');
        var req = {
            imglink: this.imglink,
            iflink: linkexists,
            linktext: this.linktext,
            content: this.content
        };

        $http.post('/api/homepage/carousel', req).success(function (res) {
            $location.path('');
        });
    };

    $http.get('/api/homepage/carousel').success(function (res) {
        $scope.slides = res;
    });
}]);
