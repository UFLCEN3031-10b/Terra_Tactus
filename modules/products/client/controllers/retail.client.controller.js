'use strict';
/**
 * Created by memamdie on 10/28/15.
 */
angular.module('core').controller('RetailProdController', function ($scope, $location, $http) {
    $scope.retailData = {};
    //Gets the retail data from the DB

    $http.get('/api/retail/data').success(function (res) {
        $scope.retailData = res;
    });

    //Updates the retail data when changed in the retail editing view
    $scope.retailUpdate = function () {
        var req = $scope.retailData;

        $http.put('/api/retail/data', req).success(function (res) {
            $location.path('retail');
        }).error(function (res) {
            console.log(res);
        });
    };
});
