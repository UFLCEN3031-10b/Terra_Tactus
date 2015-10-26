'use strict';

angular.module('products').controller('CartController', ['$scope', '$http', function($scope, $http) {
    $scope.cart = [];

    $http.get('/api/cart').success(function (res) {
        console.log(res);
        $scope.cart = res;
    });
}]);
