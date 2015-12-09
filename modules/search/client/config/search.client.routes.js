'use strict';

angular.module('search').config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('search', {
            url: '/search?q',
            templateUrl: 'modules/search/client/views/search.client.view.html'
        })
        .state('suggestion', {
            url: '/suggestion',
            templateUrl: 'modules/search/client/views/suggestion.client.view.html'
        })
        .state('admin-suggestions', {
            url: '/suggestion/admin',
            templateUrl: 'modules/search/client/views/admin-suggestions.client.view.html',
            data: {
                roles: ['admin']
            }
        });
}]);
