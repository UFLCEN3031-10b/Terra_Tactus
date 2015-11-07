'use strict';

angular.module('payment').controller('OrderCompleteController', ['$scope', '$http', '$location', '$stateParams', function ($scope, $http, $location, $stateParams) {
    $scope.order = null;

    $http.get('/api/order/find/' + $stateParams.orderId).success(function (res) {
        if (res === null) {
            $location.path('/');
        } else {
            $scope.order = res;
        }
    });
}]);
