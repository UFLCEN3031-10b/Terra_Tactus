'use strict';

angular.module('payment').controller('OrderCompleteController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.order = null;

    $http.get('/api/order').success(function (res) {
        if (!res) {
            $location.path('/');
        } else {
            $scope.order = res;
        }
    });
}]);
