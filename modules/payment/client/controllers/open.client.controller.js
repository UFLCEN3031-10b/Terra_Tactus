'use strict';

angular.module('payment').controller('UserOrderController', ['$scope', '$http', function ($scope, $http) {
    $scope.isLoading = true;
    $scope.orders = [];

    // get the orders for the current user
    $http.get('/api/order/list').success(function (res) {
        $scope.isLoading = false;
        $scope.orders = res;
    });
}]);
