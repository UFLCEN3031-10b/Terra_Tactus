'use strict';

angular.module('payment').controller('OrderCompleteController', ['$scope', '$http', '$stateParams', '$rootScope', function ($scope, $http, $stateParams, $rootScope) {
    $rootScope.$broadcast('cartChange');

    $http.delete('/api/order/close/' + $stateParams.orderId).success(function (res) {
        if (!res.status || res.status !== 'OK') {
            console.log('[ERROR] unable to close order');
        }
    });
}]);
