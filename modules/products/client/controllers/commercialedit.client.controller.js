/**
 * Created by memamdie on 11/23/15.
 */
'use strict';

angular.module('core').controller('CommercialEditController', ['$scope', '$http', '$window', function ($scope, $http, $window) {
    $scope.commercialData = {};

    $http.get('/api/commercial/data').success(function (res) {
        $scope.commercialData = res;
    });
    $scope.commercialUpdate = function () {
        var req = $scope.commercialData;

        $http.put('/api/commercial/data', req).success(function (res) {
            $window.location.reload();
        }).error(function (res) {
            console.log(res);
        });
    };

}]);
