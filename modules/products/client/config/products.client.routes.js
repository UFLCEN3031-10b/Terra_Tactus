'use strict';

angular.module('products').config(['$stateProvider',
    function ($stateProvider) {
        $stateProvider
            .state('products', {
                url: '/products',
                templateUrl: 'modules/products/client/views/products.client.view.html'
            })
            .state('products-edit', {
                url: '/products-edit',
                templateUrl: 'modules/products/client/views/products-edit.html'
            })
            .state('create-product', {
                url: '/create-product',
                templateUrl: 'modules/products/client/views/create-product.client.view.html'
            })
            .state('subscriptions', {
                url: '/subscriptions',
                templateUrl: 'modules/products/client/views/subscriptions.html'
            });
    }
]);
