'use strict';

angular.module('products').controller('CartController', ['$scope', '$rootScope', '$http', 'Authentication', '$window', function($scope, $rootScope, $http, Authentication, $window) {
    // cart array
    $scope.cart = [];

    // total price to be shown, floating point
    $scope.totalPrice = 0.0;

    // state variable to determine if checkout button is clickable
    $scope.checkoutState = 0;

    // helper function to calculate price and update respective variables
    var updatePrice = function () {
        if ($scope.cart.length !== 0) {
            $scope.checkoutState = 1;
        } else {
            $scope.checkoutState = 0;
        }

        // look through each item and add the correct
        // price to totalPrice
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

    // update state and http post to api/order
    // redirect when done
    $scope.checkout = function () {
        $scope.checkoutState = 2;
        $http.post('/api/order').success(function (res) {
            $window.location.href = res.redirect_url;
        });
    };

    // function called to update quantity
    $scope.updateQuantity = function (prodWrap) {
        var id = prodWrap.product._id,
            quan = prodWrap.editQuantity;

        if (quan === '0') { // if quantity is 0, same as removing from cart
            $http.delete('/api/cart/product/' + id).success(function (res) {
                $scope.cart = res;

                // must update price
                updatePrice();

                // cart length has changed
                $rootScope.$broadcast('cartChange');
            });
        } else {
            $http.put('/api/cart/product/' + id, {quantity: quan}).success(function (res) {
                $scope.cart = res;
                updatePrice();
            });
        }
    };

    // only allowed to toggle one description at a time
    $scope.toggleInfo = function (prodWrap) {
        $scope.cart.forEach(function (pw) {
            if (pw === prodWrap) {
                pw.showDesc = (pw.showDesc) ? false : true;
            } else {
                pw.showDesc = false;
            }
        });
    };

    // remove a product from the cart
    $scope.deleteProd = function (prodWrap) {
        $http.delete('/api/cart/product/' + prodWrap.product._id).success(function (res) {
            $scope.cart = res;

            // need to recalculate price
            updatePrice();

            // cart length has changed
            $rootScope.$broadcast('cartChange');
        }).error(function (err) {
            console.log(err);
        });
    };

    // remove everything from cart
    $scope.clearCart = function () {
        $http.delete('/api/cart').success(function (res) {
            $scope.cart = res;

            // recalculate price
            updatePrice();

            // cart length has changed
            $rootScope.$broadcast('cartChange');
        });
    };

    // populate cart
    $http.get('/api/cart').success(function (res) {
        $scope.cart = res;
        updatePrice();
    });
}]);
