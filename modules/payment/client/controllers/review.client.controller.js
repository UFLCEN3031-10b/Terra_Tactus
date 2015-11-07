'use strict';

angular.module('payment').controller('OrderReviewController', ['$scope', '$http', '$location', '$stateParams', function ($scope, $http, $location, $stateParams) {
    $scope.order = null;

    $http.get('/api/order/find/' + $stateParams.orderId).success(function (res) {
        if (res === null) {
            $location.path('/');
        } else {
            $scope.order = res;
        }
    });

    $scope.confirmButton = function () {
        $http.get('/api/order/execute/' + $stateParams.orderId).success(function (res) {
            if (res.redirect_url) {
                $location.path(res.redirect_url);
            }
        });
    };
}]);
