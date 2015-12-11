'use strict';

angular.module('payment').controller('OrderCompleteController', ['$scope', '$http', '$stateParams', '$rootScope', '$location', function ($scope, $http, $stateParams, $rootScope, $location) {
    // tell the system that the cart has updated
    $rootScope.$broadcast('cartChange');

    // make sure to close the order so it can't be accessed again
    $http.delete('/api/order/close/' + $stateParams.orderId).error(function (err) {
        $location.path('/');
    });
}]);
