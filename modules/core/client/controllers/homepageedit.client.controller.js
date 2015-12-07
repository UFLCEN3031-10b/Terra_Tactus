'use strict';

angular.module('core').controller('HomepageEditController', ['$scope', '$http', '$window', function ($scope, $http, $window) {
    $scope.homepageData = {};
    $scope.contactData = {};
    $scope.socialmediaData = {};

    $http.get('/api/homepage/data').success(function (res) {
        $scope.homepageData = res;
    });

    $http.get('/api/homepage/contact').success(function (res) {
        $scope.contactData = res;
    });

    $http.get('/api/homepage/socialmedia').success(function (res) {
        res.forEach(function (data) {
            data.isEditting = false;
        });
        $scope.socialmediaData = res;
    });

    $scope.homepageUpdate = function () {
        var req = $scope.homepageData;

        $http.put('/api/homepage/data', req).success(function (res) {
            $window.location.reload();
        }).error(function (res) {
            console.log(res);
        });
    };

    $scope.contactUpdate = function () {
        var req = $scope.contactData;

        $http.put('/api/homepage/contact', req).success(function (res) {
            $window.location.reload();
        });
    };

    $scope.socialmediaAdd = function () {

    };

    $scope.socialmediaDelete = function () {

    };

    $scope.socialmediaUpdate = function () {
        var req = $scope.socialmediaData;

        $http.put('/api/homepage/socialmedia', req).success(function (res) {
            $window.location.reload();
        });
    };

    $scope.toggleEditable = function (sm) {
        sm.isEditting = !sm.isEditting;
    };
}]);
