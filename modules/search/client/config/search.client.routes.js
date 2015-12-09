'use strict';

angular.module('search').config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('search', {
            url: '/search?q',
            templateUrl: 'modules/search/client/views/search.client.view.html'
        });
}]);
