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



    //Array for holding current editing products features
    $scope.editFeatures = [];

    // Find existing Products
    $scope.findOne = function () {
      $scope.product = Products.get({
        productId: $stateParams.productId
      });
    };

    //editting features
    $scope.editingFeatures = false;
    $scope.decideToEdit = true;

    $scope.startFeaturesEdit = function(product){
      //alert($scope.editFeatures.length);
      //alert(product.features);
      for (var i in $scope.product.features) {
          $scope.editFeatures.push($scope.product.features[i]);
      }
      //alert($scope.editFeatures.length);
      $scope.editingFeatures = true;
      $scope.decideToEdit = false;
    };

    $scope.addFeature_edit = function(){
      var itemCopy = {};
      //console.log($scope.newFt_edit);
      if ($scope.newFt_edit !== undefined ){
      itemCopy = $scope.newFt_edit;
      $scope.editFeatures.push(itemCopy);
      $scope.newFt_edit = undefined;
    }
    else {
      alert("Please enter a feature");
    }
    };

    $scope.deleteFeature_edit = function(item){
    //console.log("in delete");
    var index = $scope.editFeatures.indexOf(item);
    $scope.editFeatures.splice(index, 1);
    };

    $scope.edits = false;

    $scope.showEdits_edit = function(item){
      var index = $scope.editFeatures.indexOf(item);
      $scope.editBox_edit = item;
      $scope.edits = true;
      $scope.editItem_edit = function(){
        if($scope.editBox_edit !== undefined){
          $scope.editFeatures[index] = $scope.editBox_edit;
          $scope.edits = false;
          $scope.editBox_edit = undefined;
          }
          else{
          alert("Please enter a feature");
          }
        };
      };


    //Code to Update Product
   $scope.updateProd = function (edited_product,isValid) {

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'updateProductForm');
        return false;
      }

      if($scope.editFeatures.length!==0)
      {
      edited_product.features = $scope.editFeatures.slice();
      }

      edited_product.$update(function () {
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
      $location.path('products-edit');

    };

    $scope.cancelEdit = function(){
    $location.path('products-edit');
    };



    //Get all the products
    $http.get('/api/products').success(function (res) {
        $scope.products = res;
    });


  }
]);
