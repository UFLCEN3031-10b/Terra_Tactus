'use strict';

angular.module('payment').controller('AdminOrderController', ['$scope', '$http', function ($scope, $http) {
    $scope.activeState = 0;
    $scope.isLoading = true;
    $scope.orders = [];

    $scope.setActive = function (n) {
        $scope.isLoading = true;
        $scope.orders = [];
        $scope.activeState = n;
        $http.get('/api/order/list').success(function (res) {
            $scope.orders = res;
            $scope.isLoading = false;
        });
    };

    $http.get('/api/order/list').success(function (res) {
        $scope.orders = res;
        $scope.isLoading = false;
    });
}]);
