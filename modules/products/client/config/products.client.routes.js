'use strict';

angular.module('products').config(['$stateProvider',
    function ($stateProvider) {
        $stateProvider
            .state('products', {
                url: '/products',
                templateUrl: 'modules/products/client/views/list-products.client.view.html'
            })
            .state('product', {
                url: '/product',
                templateUrl: 'modules/products/client/views/individual-product.client.view.html'
            })
            .state('product.view', {
                url: '/:productId',
                templateUrl: 'modules/products/client/views/individual-product.client.view.html'
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
            .state('review-comments', {
              url: '/review-comments',
              templateUrl: '/modules/products/client/views/review-comments.client.view.html',
              data: {
                roles: ['admin']
              }
            })
            .state('retail', {
                url: '/retail',
                templateUrl: 'modules/products/client/views/retail.html',
            });
    }
]);
