'use strict';

angular.module('payment').controller('OrderReviewController', ['$scope', '$http', '$location', '$stateParams', '$rootScope', function ($scope, $http, $location, $stateParams, $rootScope) {
    $scope.order = null;

    $http.get('/api/order/find/' + $stateParams.orderId).success(function (res) {
        if (res === null) {
            $location.path('/');
        } else {
            $scope.order = res;
        }
    });

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if (fromState.name === 'order-review') {
            $http.get('/api/order/cancel/' + $stateParams.orderId);
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
