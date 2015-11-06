'use strict';

angular.module('payment').config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('order-complete', {
            url: '/order/complete',
            templateUrl: 'modules/payment/client/views/complete.client.view.html'
        });
}]);
