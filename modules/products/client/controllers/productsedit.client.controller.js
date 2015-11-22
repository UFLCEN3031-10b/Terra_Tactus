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

      alert(product.features);
      for (var i in $scope.product.features) {
          $scope.editFeatures.push($scope.product.features[i]);
      }
      //alert($scope.editFeatures.length);
      $scope.editingFeatures = true;
      $scope.decideToEdit = false;

    };

    $scope.addFeature_edit = function(){
      var itemCopy = {};
      console.log($scope.newFt_edit);
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
    console.log("in delete");
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
  /*  $scope.update = function (edited_product) {

      if($scope.editFeatures.length==0)
      {
      for (var i in $scope.product.features) {
          $scope.editFeatures.push($scope.product.features[i]);
      }
      }


        var req = {
            proType: edited_product.proType,
            proTitle: edited_product.proTitle,
            longDes: edited_product.longDes,
            shortDes: edited_product.shortDes,
            imageUrl: edited_product.imageUrl,
            imageOne: edited_product.imageOne,
            imageTwo: edited_product.imageTwo,
            imageThree: edited_product.imageThree,
            imageFour: edited_product.imageFour,
            indvPrice: edited_product.indvPrice,
            eduPrice: edited_product.eduPrice,
            wholePrice: edited_product.wholePrice,
            teacher: edited_product.teacher,
            features: this.editFeatures
        };

        $http.put('/api/homepage/carousel/' + slide._id, req).success(function (res) {
            makeNull();
            $window.location.reload();
        });
    };*/

    //Get all the products
    $http.get('/api/products').success(function (res) {
        $scope.products = res;
    });


  }
]);
