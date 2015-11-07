'use strict';

angular.module('payment').controller('OrderCompleteController', ['$scope', '$http', '$stateParams', function ($scope, $http, $stateParams) {
    $http.delete('/api/order/close/' + $stateParams.orderId).success(function (res) {
        if (!res.status || res.status !== 'OK') {
            console.log('[ERROR] unable to close order');
        }
    });
}]);
