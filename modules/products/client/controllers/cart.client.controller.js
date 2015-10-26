'use strict';

angular.module('products').controller('CartController', ['$scope', '$http', function($scope, $http) {
    $scope.cart = [];

    $http.get('/api/cart').success(function (res) {
        $scope.cart = res;
    });
}]);
