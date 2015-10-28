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
            .state('commercial', {
                url: '/commercial',
                templateUrl: 'modules/products/client/views/commercial.html',
                controller: 'CommercialController',
            })
            .state('retail', {
                url: '/retail',
                templateUrl: 'modules/products/client/views/reatil.html',
                controller: 'RetailController',
            });
    }
]);
