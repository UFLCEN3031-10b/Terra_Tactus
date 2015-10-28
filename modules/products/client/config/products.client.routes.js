'use strict';

angular.module('products').config(['$stateProvider',
    function ($stateProvider) {
        $stateProvider
            .state('products', {
                url: '/products',
                templateUrl: 'modules/products/client/views/products.client.view.html'
            })
            .state('subscriptions', {
                url: '/subscriptions',
                templateUrl: 'modules/products/client/views/subscriptions.html'
            });
    }
]);
