'use strict';

// Products controller
angular.module('core').controller('ReviewsController', ['$scope', '$http', '$rootScope', '$stateParams', 'Authentication', 'Products',
  function ($scope, $http, $rootScope, $stateParams, Authentication, Products) {
    $scope.authentication = Authentication;
    $scope.isCollapsed = true;
    $scope.NewReview = {
      "review": "",
      "rating": 0
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

    //submit a review to be.. reviewed
    $scope.submitReview = function(isValid, product) {
      $scope.error = null;
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'reviewForm');
        return false;
      }
      if ($scope.NewReview.rating === 0) {
        alert("Please rate 1-5!");
        return false;
      }
      product.reviews.push($scope.NewReview);
      $scope.NewReview = {
        "review": "",
        "rating": 0
      };
      product.reviews[product.reviews.length - 1].username = $scope.authentication.user.username;
      product.reviews[product.reviews.length - 1].userPicture = $scope.authentication.user.profileImageURL;
      product.$update(function () {
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

  }
]);
