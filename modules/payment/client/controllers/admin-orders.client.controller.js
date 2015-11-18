'use strict';

angular.module('payment').controller('AdminOrderController', ['$scope', '$http', function ($scope, $http) {
    $scope.activeState = 0;
    $scope.isLoading = true;
    $scope.orders = [];

    var getList = function () {
        var s = '';
        switch ($scope.activeState) {
            case 0:
                s = 'Awaiting shipper confirmation';
                break;
            case 1:
                s = 'Preparing for shipment';
                break;
            case 2:
                s = 'Order shipped';
                break;
        }

        $http.get('/api/order/adminctl', {activeState: s}).success(function (res) {
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

    getList();
}]);
