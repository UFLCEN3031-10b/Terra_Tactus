'use strict';

angular.module('payment').controller('OrderCompleteController', ['$scope', '$http', '$stateParams', '$rootScope', '$location', function ($scope, $http, $stateParams, $rootScope, $location) {
    $rootScope.$broadcast('cartChange');

    $http.delete('/api/order/close/' + $stateParams.orderId).error(function (err) {
        $location.path('/');
    });
}]);
