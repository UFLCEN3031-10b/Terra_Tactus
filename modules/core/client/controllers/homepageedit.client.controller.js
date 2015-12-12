'use strict';

angular.module('core').controller('HomepageEditController', ['$scope', '$http', '$window', function ($scope, $http, $window) {
    // variables to hold data to modify
    $scope.homepageData = {};
    $scope.contactData = {};
    $scope.socialmediaData = {};
    $scope.esm = {};

    // get each of the corresponding data from the api
    $http.get('/api/homepage/data').success(function (res) {
        $scope.homepageData = res;
    });

    $http.get('/api/homepage/contact').success(function (res) {
        $scope.contactData = res;
    });

    $http.get('/api/homepage/socialmedia').success(function (res) {
        // need to add this so each individual one can be edited
        res.forEach(function (data) {
            data.isEditting = false;
        });
        $scope.socialmediaData = res;
    });

    // function to update homedata, reloads page when done
    $scope.homepageUpdate = function () {
        var req = $scope.homepageData;

        $http.put('/api/homepage/data', req).success(function (res) {
            $window.location.reload();
        }).error(function (res) {
            console.log(res);
        });
    };

    // function to update contact data, reloads page when done
    $scope.contactUpdate = function () {
        var req = $scope.contactData;

        $http.put('/api/homepage/contact', req).success(function (res) {
            $window.location.reload();
        });
    };

    // add a new social media link
    $scope.socialmediaAdd = function () {
        if (!$scope.esm.iconLink) {
            $scope.esm.iconLink = '';
        }

        $http.post('/api/homepage/socialmedia', $scope.esm).success(function (res) {
            $window.location.reload();
        });
    };

    // delete a social media link
    $scope.socialmediaDelete = function (sm) {
        $http.delete('/api/homepage/socialmedia/' + sm._id).success(function (res) {
            $window.location.reload();
        });
    };

    // update an individual social media link
    $scope.socialmediaUpdate = function (sm) {
        if (!sm.iconLink) {
            sm.iconLink = '';
        }

        // hasIcon is recalculated by the server
        delete sm.hasIcon;
        $http.put('/api/homepage/socialmedia/' + sm._id, sm).success(function (err) {
            $window.location.reload();
        });
    };

    // toggle editing
    $scope.toggleEditable = function (sm) {
        sm.isEditting = !sm.isEditting;
    };
}]);
