'use strict';

angular.module('payment').controller('AdminOrderController', ['$scope', '$http', function ($scope, $http) {
    // variable for which status to show
    $scope.activeState = 0;

    // should there be a loading icon
    $scope.isLoading = true;

    // orders list
    $scope.orders = [];

    // function which determines state and then queries
    // the server for the proper list
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
            console.log($scope.orders);
            $scope.isLoading = false;
        });
    };

    // change the active state
    $scope.setActive = function (n) {
        $scope.isLoading = true;
        $scope.orders = [];
        $scope.activeState = n;
        getList();
    };

    // update an order to a new state
    // must have an up or down input and the order
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

    // update when it's done
    getList();
}]);
