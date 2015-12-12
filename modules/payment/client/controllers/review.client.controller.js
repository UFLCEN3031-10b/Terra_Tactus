'use strict';

angular.module('payment').controller('OrderReviewController', ['$scope', '$http', '$location', '$stateParams', '$rootScope', function ($scope, $http, $location, $stateParams, $rootScope) {
    $scope.order = null;
    $scope.disabledConfirm = false;

    // get the order information from the database
    $http.get('/api/order/find/' + $stateParams.orderId).success(function (res) {
        if (res === null) {
            // if we get null then there isn't an open order
            $location.path('/');
        } else {
            $scope.order = res;
        }
    });

    // if you navigate away from the page, it will cancel the order
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if (fromState.name === 'order-review' && toState.name !== 'order-complete') {
            $http.get('/api/order/cancel/' + $stateParams.orderId);
        }
    });

    // execute the order when confirm is pressed
    $scope.confirmButton = function () {
        // disable confirm button so you can only click once
        $scope.disabledConfirm = true;
        
        $http.get('/api/order/execute/' + $stateParams.orderId).success(function (res) {
            if (res.redirect_url) {
                $location.path(res.redirect_url);
            }
        });
    };
}]);
