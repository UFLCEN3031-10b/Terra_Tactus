'use strict';

// Products controller
angular.module('core').controller('ProductsController', ['$window','$http','$scope','$rootScope', '$stateParams', '$location', 'Authentication', 'Products',
  function ($window, $http, $scope, $rootScope, $stateParams, $location, Authentication, Products) {
    $scope.authentication = Authentication;
    $scope.displayType = false; //initialized cultural
    $scope.selection = 'imageOne';
    $scope.isCollapsed = true;
    $scope.NewReview = {
      "review": "",
      "rating": 0
    };

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

    $scope.delete = function (productID) {
      var conf = confirm("Are you sure you want to delete this product?");
      console.log(conf);
      if(conf){
        $http.delete('/api/product/' + productID).success(function (res) {
            $window.location.reload();
        });
      }
    };

    //remove a certain review
    $scope.removeReview = function (product, ind_review_index) {
      var conf = confirm("Are you sure you want to delete this review?");

      if (conf) {
        product.reviews.splice(ind_review_index,1);
        product.$update(function () {
        }, function (errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      }
    };

    //check if there are any to be reviewed
    $scope.checkAnyPending = function (reviews) {
      for (var i = 0; i < reviews.length; i++) {
        if (reviews[i].verified === false) {
          return false;
        }
      }
      return true;
    };

    //accept a certain review
    $scope.acceptReview = function (product, ind_review_index) {
        product.reviews[ind_review_index].verified = true;

        var average = ((product.rating * (product.numberVerified)) + product.reviews[ind_review_index].rating) / (product.numberVerified + 1);
        product.rating = average;
        product.numberVerified++;
        product.$update(function () {
        }, function (errorResponse) {
          $scope.error = errorResponse.data.message;
        });
    };

    //editting shows
    $scope.isEditing = false;

    //submit a review to be.. reviewed
    $scope.submitReview = function(isValid, product) {
      $scope.error = null;
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'reviewForm');
        return false;
      }
      if ($scope.NewReview.rating === 0) {
        alert("Please rate 1-5!")
        return false;
      }
      product.reviews.push($scope.NewReview);
        product.reviews[product.reviews.length - 1].username = $scope.authentication.user.username;
        product.reviews[product.reviews.length - 1].userPicture = $scope.authentication.user.profileImageURL;
        product.$update(function () {
          console.log(product);
        }, function (errorResponse) {
          $scope.error = errorResponse.data.message;
        });
    };


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
