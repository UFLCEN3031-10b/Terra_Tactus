'use strict';

// Products controller
angular.module('core').controller('ProductsController', ['$window','$http','$scope','$rootScope', '$stateParams', '$location', 'Authentication', 'Products',
  function ($window, $http, $scope, $rootScope, $stateParams, $location, Authentication, Products) {
    $scope.authentication = Authentication;
    $scope.displayType = false; //initialized cultural

    $scope.displayCultural = function () {
      $scope.displayType = true;
    };

    $scope.displayGeological = function () {
      $scope.displayType = false;
    };

    // Create new Product
    $scope.create = function (isValid) {

      var prodType = null;
      var teachType = null;
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'productForm');
        return false;
      }

      if(document.getElementById("proType-cb").checked) {
        prodType = true;
      }
      else {
        prodType = false;
      }

      if(document.getElementById("teacher-cb").checked) {
        teachType = true;
      }
      else {
        teachType = false;
      }


      // Create new Product object
      var product = new Products({
        proType: prodType,
        proTitle: this.proTitle,
        longDes: this.longDes,
        shortDes: this.shortDes,
        imageUrl: this.imageUrl,
        imageOne: this.imageOne,
        imageTwo: this.imageTwo,
        imageThree: this.imageThree,
        imageFour: this.imageFour,
        indvPrice: this.indvPrice,
        eduPrice: this.eduPrice,
        wholePrice: this.wholePrice,
        teacher: teachType
      });

      // Redirect after save
      product.$save(function (response) {
      $location.path('products');

      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });

      console.log('Product has been created');
    };

    //editting shows
    $scope.isEditing = false;

    // Find a list of Products
    $scope.find = function () {
      $scope.products = Products.query();
    };

    // Find existing Products
    $scope.findOne = function () {
      $scope.product = Products.get({
        productId: $stateParams.productId
      });
    };

    //Add one product to Cart
    $scope.addOnetoCart = function(productID){
      $http.post('/api/cart/product/' + productID , {quantity:1}).success(function (res) {
          $rootScope.$broadcast('cartChange');
          $location.path('cart');
      });
    };

  }
]);
