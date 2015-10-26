'use strict';

angular.module('products').config(['$stateProvider',
    function ($stateProvider) {
        $stateProvider
            .state('products', {
                url: '/products',
                templateUrl: 'modules/products/client/views/products.html'
            })
            .state('subscriptions', {
                url: '/subscriptions',
                templateUrl: 'modules/products/client/views/subscriptions.html'
            })
            .state('cart', {
                url: '/cart',
                templateUrl: 'modules/products/client/views/cart.client.view.html'
            });
    }
]);
