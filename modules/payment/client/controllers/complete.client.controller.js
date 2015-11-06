'use strict';

angular.module('payment').controller('OrderCompleteController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.order = null;

    $http.put('/api/order').success(function (res) {
        console.log(res);
        if (res === null) {
            $location.path('/');
        } else {
            $scope.order = res;
        }
    });
}]);
