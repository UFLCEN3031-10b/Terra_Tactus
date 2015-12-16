'use strict';

angular.module('payment').controller('OrderCompleteController', ['$scope', '$http', '$stateParams', '$rootScope', '$location', function ($scope, $http, $stateParams, $rootScope, $location) {
    // tell the system that the cart has updated
    $rootScope.$broadcast('cartChange');
    $http.get('/api/order/find/' + $stateParams.orderId).success(function(res){
      var order = res;
      $http.get('/api/users/me').success(function(res){
        var sendUser = res;
        for(var i = 0; i < order.cart.length; i++){
          if(order.cart[i].product.suppName !== ''){
            $scope.sendSupplement(order.cart[i].product, sendUser);
            //send supplementary curriculum for products that have one
          }
        }
        // make sure to close the order so it can't be accessed again
        $http.delete('/api/order/close/' + $stateParams.orderId).error(function (err) {
            $location.path('/');
        });
      });
    });

    $scope.sendSupplement = function(sendProduct, sendUser){
      var mailData = {user: sendUser, product: sendProduct};
      $http.post('/api/mail/sendSupp', mailData).success(function(response){
        console.log(response);
      });
    };


}]);
