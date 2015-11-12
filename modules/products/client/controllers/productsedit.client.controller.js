'use strict';

// editProducts controller
angular.module('core').controller('editProductsController', ['$window','$http','$scope','$rootScope', '$stateParams', '$location', 'Authentication', 'Products',
  function ($window, $http, $scope, $rootScope, $stateParams, $location, Authentication, Products) {
    $scope.authentication = Authentication;

    $scope.products = [];
    $scope.editProduct = null;

    $scope.delete = function (productID) {
      var conf = confirm("Are you sure you want to delete this product?");
      console.log(conf);
      if(conf){
        $http.delete('/api/product/' + productID).success(function (res) {
            $window.location.reload();
        });
      }
    };

    $scope.takeToEdit = function(eProduct){
      $scope.editProduct = eProduct;
      $location.path('product-edit');
      console.log('changed edit product!');
      //console.log(eProduct.proTitle);
      //console.log($scope.editProduct.proTitle);
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
