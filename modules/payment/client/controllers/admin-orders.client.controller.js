'use strict';

angular.module('payment').controller('AdminOrderController', ['$scope', '$http', function ($scope, $http) {
    $scope.activeState = 0;
    $scope.isLoading = true;
    $scope.orders = [];

    var getList = function () {
        var state = '';
        switch ($scope.activeState) {
            case 0:
                state = 'Awaiting shipper confirmation';
                break;
            case 1:
                state = 'Preparing for shipment';
                break;
            case 2:
                state = 'Order shipped';
                break;
        }

        $http.get('/api/order/adminctl?state=' + state).success(function (res) {
            $scope.orders = res;
            $scope.isLoading = false;
        });
    };

    $scope.setActive = function (n) {
        $scope.isLoading = true;
        $scope.orders = [];
        $scope.activeState = n;
        getList();
    };

    $scope.update = function (upOrDown, order) {
        var n = (upOrDown) ? $scope.activeState + 1: $scope.activeState - 1;

        var state = '';
        switch (n) {
            case 0:
                state = 'Awaiting shipper confirmation';
                break;
            case 1:
                state = 'Preparing for shipment';
                break;
            case 2:
                state = 'Order shipped';
                break;
        }

        $http.put('/api/order/adminctl/' + order._id, { newStatus: state }).success(function (res) {
            getList();
        });
    };

    getList();
}]);
