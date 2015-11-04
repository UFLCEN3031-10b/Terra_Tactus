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
                templateUrl: 'modules/products/client/views/products-edit.html',
                data: {
                  roles: ['admin']
                }
            })
            .state('create-product', {
                url: '/create-product',
                templateUrl: 'modules/products/client/views/create-product.client.view.html',
                data: {
                  roles: ['admin']
                }
            })
            .state('subscriptions', {
                url: '/subscriptions',
                templateUrl: 'modules/products/client/views/subscriptions.html'
            })
            .state('cart', {
                url: '/cart',
                templateUrl: 'modules/products/client/views/cart.client.view.html'
            })
            .state('commercial', {
                url: '/commercial',
                templateUrl: 'modules/products/client/views/commercial.html',
            })
            .state('retail', {
                url: '/retail',
                templateUrl: 'modules/products/client/views/retail.html',
            });
    }
]);
