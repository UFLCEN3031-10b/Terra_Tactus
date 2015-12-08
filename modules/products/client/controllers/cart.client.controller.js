'use strict';

angular.module('products').controller('CartController', ['$scope', '$rootScope', '$http', 'Authentication', '$window', function($scope, $rootScope, $http, Authentication, $window) {
    $scope.cart = [];
    $scope.totalPrice = 0.0;
    $scope.checkoutState = 0;

    var updatePrice = function () {
        if ($scope.cart.length !== 0) {
            $scope.checkoutState = 1;
        } else {
            $scope.checkoutState = 0;
        }

        $scope.totalPrice = 0.0;
        $scope.cart.forEach(function (prodWrap) {
            //to keep editQuantity value up to date also
            prodWrap.editQuantity = prodWrap.quantity;

            var tempPrice = -1;

            if (undefined !== Authentication.user.priceRoles) {
                for (var i = 0; i < Authentication.user.priceRoles.length; i++) {
                    var r = Authentication.user.priceRoles[i];
                    if (r === 'wholesale') {
                        tempPrice = prodWrap.product.wholePrice;
                    } else if (r === 'education') {
                        tempPrice = prodWrap.product.eduPrice;
                    }
                }
            }

            if (tempPrice === -1) {
                tempPrice = prodWrap.product.indvPrice;
            }

            if (tempPrice === "") {
                tempPrice = "0.00";
            }

            prodWrap.price = tempPrice;
            $scope.totalPrice += parseFloat(prodWrap.quantity)*parseFloat(tempPrice);
        });
    };

    $scope.checkout = function () {
        $scope.checkoutState = 2;
        $http.post('/api/order').success(function (res) {
            $window.location.href = res.redirect_url;
        });
    };

    $scope.updateQuantity = function (prodWrap) {
        var id = prodWrap.product._id,
            quan = prodWrap.editQuantity;

        if (quan === '0') {
            $http.delete('/api/cart/product/' + id).success(function (res) {
                $scope.cart = res;
                updatePrice();
                $rootScope.$broadcast('cartChange');
            });
        } else {
            $http.put('/api/cart/product/' + id, {quantity: quan}).success(function (res) {
                $scope.cart = res;
                updatePrice();
            });
        }
    };

    $scope.toggleInfo = function (prodWrap) {
        $scope.cart.forEach(function (pw) {
            if (pw === prodWrap) {
                pw.showDesc = (pw.showDesc) ? false : true;
            } else {
                pw.showDesc = false;
            }
        });
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
