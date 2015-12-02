'use strict';

// editProducts controller
angular.module('core').controller('editProductsController', ['$window','$http','$scope','$rootScope', '$stateParams', '$location', 'Authentication', 'Products',
  function ($window, $http, $scope, $rootScope, $stateParams, $location, Authentication, Products) {
    $scope.authentication = Authentication;

    //Code for deleting a product
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

    //values used to hide or show components used to edit the features
    $scope.editingFeatures = false; //Used to hide or show the whole GUI for editing features
    $scope.decideToEdit = true; //Used to hide or show the button that lets a user chose to edit features

    //If a user decides to edit features, initialize the editFeatures array
    //show the editing GUI while hiding the edit features button
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
    //Code for adding a feature to the editFeatures array
    $scope.addFeature_edit = function(){
      var itemCopy = {};
      //console.log($scope.newFt_edit);
      if ($scope.newFt_edit !== undefined && $scope.newFt_edit !== "" ){
      itemCopy = $scope.newFt_edit;
      $scope.editFeatures.push(itemCopy);
      $scope.newFt_edit = undefined;
    }
    else {
      alert("Please enter a feature");
    }
    };
    //Code for deleting a feature from the editFeatures array
    $scope.deleteFeature_edit = function(item){
    //console.log("in delete");
    var index = $scope.editFeatures.indexOf(item);
    $scope.editFeatures.splice(index, 1);
    };
    //value used to hide the edit field for a feature in the editing feature GUI
    $scope.edits = false;

    //function to show the edit field, within this function the Function
    //to edit a feature is embedded (editItem_edit)
    $scope.showEdits_edit = function(item){
      var index = $scope.editFeatures.indexOf(item);
      $scope.editBox_edit = item;
      $scope.edits = true;
      $scope.editItem_edit = function(){
        if($scope.editBox_edit !== undefined && $scope.editBox_edit !== "" ){
          $scope.editFeatures[index] = $scope.editBox_edit;
          $scope.edits = false;
          $scope.editBox_edit = undefined;
          }
          else{
          alert("Please enter a feature");
          }
        };
      };

    //Code for editing curriculumn
    //values used to hide or show components used to edit the curriculumn
    $scope.editingCurr = false; //Used to hide or show the whole GUI for editing features
    $scope.decideToEditCurr = true;
    //show the editing GUI while hiding the edit features button
    $scope.startCurrEdit = function(){
      $scope.editingCurr = true;
      $scope.decideToEditCurr = false;
    };

    $scope.cancelCurrEdit = function(){
      $scope.editingCurr = false;
      $scope.decideToEditCurr = true;
    };

    //end of edit curriculumn

    //Code to Update Product
   $scope.updateProd = function (edited_product,isValid) {
     //Check if the updateProductForm is valid, if not cancel update and display errors
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'updateProductForm');
        return false;
      }
      //Check the length of editFeatures array, if it has been initialized, update the features of the product
      if($scope.editFeatures.length!==0)
      {
      edited_product.features = $scope.editFeatures.slice();
      }
      //update product
      edited_product.$update(function () {
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
      //redirect to general products edit page
      $location.path('products-edit');

    };

    //If we cancel an edit, redirect
    $scope.cancelEdit = function(){
    $location.path('products-edit');
    };



    //Get all the products
    $http.get('/api/products').success(function (res) {
        $scope.products = res;
    });


  }
]);
