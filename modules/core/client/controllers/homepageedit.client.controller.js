'use strict';

angular.module('core').controller('HomepageEditController', ['$scope', '$http', '$window', function ($scope, $http, $window) {
    $scope.homepageData = {};
    $scope.contactData = {};
    $scope.socialmediaData = {};
    $scope.esm = {};

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
        $http.post('/api/homepage/socialmedia', $scope.esm).success(function (res) {
            $window.location.reload();
        });
    };

    $scope.socialmediaDelete = function (sm) {
        $http.delete('/api/homepage/socialmedia/' + sm._id).success(function (res) {
            $window.location.reload();
        });
    };

    $scope.socialmediaUpdate = function (sm) {
        delete sm.hasIcon;
        $http.put('/api/homepage/socialmedia/' + sm._id, sm).success(function (err) {
            $window.location.reload();
        });
    };

    $scope.toggleEditable = function (sm) {
        sm.isEditting = !sm.isEditting;
    };
}]);
