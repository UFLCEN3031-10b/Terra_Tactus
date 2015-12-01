'use strict';

// Products controller
angular.module('core').controller('ProductsController', ['$window','$http','$scope','$rootScope', '$stateParams', '$location', 'Authentication', 'Products',
  function ($window, $http, $scope, $rootScope, $stateParams, $location, Authentication, Products) {
    $scope.authentication = Authentication;
    //individual product image picker function
    $scope.displayType = false; //initialized country
    $scope.selection = 'imageOne';
    $scope.imageSelector = function (imagePick) {
      if (imagePick !== $scope.selection) {
        $scope.selection = imagePick;
      } else {
        $scope.selection = 'imageOne';
      }
    };

    //two different product types (change to ng-switch eventually)
    $scope.displayCultural = function () {
      $scope.displayType = true;
    };

    $scope.displayGeological = function () {
      $scope.displayType = false;
    };

    //array for temporary headers
    $scope.tempTable = [];
    $scope.tempNewRow = [];
    $scope.amountOfColumns = [1,2,3];
    $scope.edittingRows = false;

    //Function to add a header
    $scope.addNewRow = function() {
      if ($scope.tempNewRow.length !== $scope.amountOfColumns.length) {
        alert("err please fill out all columns of table!");
        return false;
      }
      $scope.tempTable.push($scope.tempNewRow);
      $scope.tempNewRow = [];
    };

    //deletes a row on the table
    $scope.deleteRow = function(index) {
      $scope.tempTable.splice(index,1);
    };

    //adds or removes a column in the container given args
    $scope.col = function(argument) {
      if (argument === "add") {
        $scope.amountOfColumns.push($scope.amountOfColumns.length);
      } else if (argument === "remove") {
        $scope.amountOfColumns.splice($scope.amountOfColumns.length-1,1);
      } else {
        console.log("invalid argument in col function...!");
      }
    };

    //Array used to hold features for a product we are creating
    $scope.tempFeatures = [];
    //Function to add a feature to the tempFeature array
    $scope.addFeature = function(){
      var itemCopy = {};
      //console.log($scope.newFt);
      if ($scope.newFt !== undefined ){
      itemCopy = $scope.newFt;
      $scope.tempFeatures.push(itemCopy);
      $scope.newFt = undefined;
    }
    else {
      alert("Please enter a feature");
    }
    };
    //Code to delete a feature from the tempFeature array
    $scope.deleteFeature = function(item){
    //console.log("in delete");
    var index = $scope.tempFeatures.indexOf(item);
    $scope.tempFeatures.splice(index, 1);
  };

  //value used to hide the edit field for a feature in the create products GUI
  $scope.edits = false;

  //function to show the edit field, within this function the Function
  //to edit a feature is embedded (editItem)
  $scope.showEdits = function(item){
    var index = $scope.tempFeatures.indexOf(item);
    $scope.edits = true;
    $scope.editItem = function(){
        if($scope.editBox !== undefined){
          $scope.tempFeatures[index] = $scope.editBox;
          $scope.edits = false;
          $scope.editBox = undefined;
        }
        else{
          alert("Please enter a feature");
        }
    };
  };

    // Create new Product
    $scope.create = function (isValid) {
      //Declare variables for correctly getting checkbox values
      var prodType = null;
      var teachType = null;
      $scope.error = null;
      //Check if our producForm was valid, if not create function is canceled and errors show on GUI
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'productForm');
        return false;
      }
      //set the correct value of the product type variable
      if(document.getElementById("proType-cb").checked) {
        prodType = true;
      }
      else {
        prodType = false;
      }
      //set the correct value of the teacher variable
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
        teacher: teachType,
        features: this.tempFeatures,
        curriculum: this.tempTable
      });

      // Redirect after save
      product.$save(function (response) {
      $location.path('products');

      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });

      console.log('Product has been created');
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
