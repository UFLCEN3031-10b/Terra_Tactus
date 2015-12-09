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
            .state('product-edit', {
                url: '/product-edit/:productId',
                templateUrl: 'modules/products/client/views/single-product-edit.client.view.html',
                data: {
                  roles: ['admin']
                }
            })

            .state('cart', {
                url: '/cart',
                templateUrl: 'modules/products/client/views/cart.client.view.html'
            })

            .state('review-comments', {
              url: '/review-comments',
              templateUrl: '/modules/products/client/views/review-comments.client.view.html',
              data: {
                roles: ['admin']
              }
            })

            //adding a commercial page
            .state('commercial', {
                url: '/commercial',
                templateUrl: 'modules/products/client/views/commercial.product.client.view.html',
            })
            //adding an edit-commercial page
            .state('commercial-edit', {
                url: '/commercial/edit',
                templateUrl: 'modules/products/client/views/commercialedit.product.client.view.html',
                data: {
                    roles: ['admin']
                }
            })

            //adding a retail page
            .state('retail', {
                url: '/retail',
                templateUrl: 'modules/products/client/views/retail.product.client.view.html',
            })

            //adding an edit-retail page
            .state('retail-edit', {
                url: '/retail/edit',
                templateUrl: 'modules/products/client/views/retailedit.product.client.view.html',
                data: {
                    roles: ['admin']
                }
            })

            //adding a subscriptions page
            .state('subscriptions', {
                url: '/subscriptions',
                templateUrl: 'modules/products/client/views/subscriptions.product.client.view.html'
            })

            //adding an edit-subscription page
            .state('subscription-edit', {
                url: '/subscription/edit',
                templateUrl: 'modules/products/client/views/subscriptionedit.product.client.view.html',
                data: {
                    roles: ['admin']
                }
            });
    }
]);
