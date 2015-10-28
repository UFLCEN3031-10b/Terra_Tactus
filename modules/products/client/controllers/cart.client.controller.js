'use strict';

angular.module('products').controller('CartController', ['$scope', '$rootScope', '$http', 'Authentication', function($scope, $rootScope, $http, Authentication) {
    $scope.cart = [];
    $scope.totalPrice = 0.0;
    $scope.editable = false;

    var updatePrice = function () {
        $scope.totalPrice = 0.0;
        $scope.cart.forEach(function (prodWrap) {
            if (Authentication.user.roles == 'wholesale') {
                prodWrap.price = prodWrap.product.wholePrice;
            } else if (Authentication.user.roles == 'education') {
                prodWrap.price = prodWrap.product.eduPrice;
            } else {
                prodWrap.price = prodWrap.product.indvPrice;
            }

            $scope.totalPrice += parseFloat(prodWrap.quantity)*parseFloat(prodWrap.price);
        });
    };

    $scope.checkout = function () {};

    $scope.toggleInfo = function (prodWrap) {
        prodWrap.showDesc = (prodWrap.showDesc) ? false : true;
    };

    $scope.deleteProd = function (prodWrap) {
        $http.delete('/api/cart/product/' + prodWrap.product._id).success(function (res) {
            $scope.cart = res;
            updatePrice();
            $rootScope.$broadcast('cartChange');
        }).error(function (err) {
            console.log(err);
        });
    };

    $scope.clearCart = function () {
        $http.delete('/api/cart').success(function (res) {
            $scope.cart = res;
            updatePrice();
            $rootScope.$broadcast('cartChange');
        });
    };

    $http.get('/api/cart').success(function (res) {
        $scope.cart = res;
        updatePrice();
    });
}]);
