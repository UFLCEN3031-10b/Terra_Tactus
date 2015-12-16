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
            console.log('found suppName');
            $scope.sendSupplement(order.cart[i].product, sendUser);
          }
        }
      });
    });

    $scope.sendSupplement = function(sendProduct, sendUser){
      var product = sendProduct;
      $http.post('/api/mail/sendSupp', product).success(function(response){
        console.log(response);
      });
    };

    // make sure to close the order so it can't be accessed again
    /*$http.delete('/api/order/close/' + $stateParams.orderId).error(function (err) {
        $location.path('/');
    });*/
}]);
