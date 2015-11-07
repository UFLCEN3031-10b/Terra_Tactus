'use strict';

angular.module('payment').config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('order-review', {
            url: '/order/review/:orderId',
            templateUrl: 'modules/payment/client/views/review.client.view.html'
        })
        .state('order-complete', {
            url: '/order/complete/:orderId',
            templateUrl: 'modules/payment/client/views/complete.client.view.html'
        });
}]);
