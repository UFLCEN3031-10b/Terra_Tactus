'use strict';

angular.module('products').controller('CartController', ['$scope', '$http', 'Authentication', function($scope, $http, Authentication) {
    $scope.cart = [];
    $scope.totalPrice = 0.0;

    $scope.checkout = function () {};

    $scope.setEditable = function () {};

    $scope.clearCart = function () {};

    $http.get('/api/cart').success(function (res) {
        $scope.cart = res;
        $scope.cart.forEach(function (prodWrap) {
            if (Authentication.user.roles == 'wholesale') {
                prodWrap.price = prodWrap.product.priceSet.wholesale;
            } else if (Authentication.user.roles == 'education') {
                prodWrap.price = prodWrap.product.priceSet.education;
            } else {
                prodWrap.price = prodWrap.product.priceSet.individual;
            }

            $scope.totalPrice += parseFloat(prodWrap.quantity)*parseFloat(prodWrap.price);
        });
    });
}]);
