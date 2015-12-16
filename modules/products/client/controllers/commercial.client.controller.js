'use strict';
angular.module('core').controller('CommercialProdController', function ($scope, $location, $http) {
    $scope.commercialData = {};

    //Gets the commercial data from the DB

    $http.get('/api/commercial/data').success(function (res) {
        $scope.commercialData = res;
    });
    //Updates the commercial data when changed in the commercial editing view

    $scope.commercialUpdate = function () {
        var req = $scope.commercialData;

        $http.put('/api/commercial/data', req).success(function (res) {
            $location.path('commercial');
        }).error(function (res) {
            console.log(res);
        });
    };

});
