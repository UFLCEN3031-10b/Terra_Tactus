'use strict';

// editProducts controller
angular.module('core').controller('editProductsController', ['$window','$http','$scope','$rootScope', '$stateParams', '$location', 'Authentication', 'Products',
  function ($window, $http, $scope, $rootScope, $stateParams, $location, Authentication, Products) {
    $scope.authentication = Authentication;

    $scope.delete = function (productID) {
      var conf = confirm("Are you sure you want to delete this product?");
      console.log(conf);
      if(conf){
        $http.delete('/api/products/' + productID).success(function (res) {
          for (var i in $scope.products) {
            if ($scope.products[i]._id === productID) {
              $scope.products.splice(i, 1);
            }
          }
        });
      }
    };

    //editting shows
    $scope.isEditing = false;

    // Find existing Products
    $scope.findOne = function () {
      $scope.product = Products.get({
        productId: $stateParams.productId
      });
    };

    //Get all the products
    $http.get('/api/products').success(function (res) {
        $scope.products = res;
    });


  }
]);
