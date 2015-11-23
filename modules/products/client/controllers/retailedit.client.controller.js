/**
 * Created by memamdie on 11/23/15.
 */
'use strict';

angular.module('core').controller('RetailEditController', ['$scope', '$http', '$window', function ($scope, $http, $window) {
    $scope.retailData = {};

    $http.get('/api/retail/data').success(function (res) {
        $scope.retailData = res;
    });
    $scope.retailUpdate = function () {
        var req = $scope.retailData;

        $http.put('/api/retail/data', req).success(function (res) {
            $window.location.reload();
        }).error(function (res) {
            console.log(res);
        });
    };

}]);
