'use strict';

angular.module('payment').controller('UserOrderController', ['$scope', '$http', function ($scope, $http) {
    $http.get('/api/order/list').success(function (res) {
        console.log(res);
    });
}]);
