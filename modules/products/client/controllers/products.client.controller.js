'use strict';

// Products controller
angular.module('core').controller('ProductsController', ['$window','$http','$scope','$rootScope', '$stateParams', '$location', 'Authentication', 'Products', 'FileUploader',
  function ($window, $http, $scope, $rootScope, $stateParams, $location, Authentication, Products, FileUploader) {
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

    //Code for editing curriculumn
    //values used to hide or show components used to edit the curriculumn
    $scope.editingCurr = false; //Used to hide or show the whole GUI for editing curriculum
    $scope.decideToEditCurr = true;
    //show the editing GUI while hiding the edit curriculum button, populate tempTable with product curriculum
    $scope.startCurrEdit = function(product){
      for (var i in $scope.product.curriculum) {
          $scope.tempTable.push($scope.product.curriculum[i]);
      }
      $scope.editingCurr = true;
      $scope.decideToEditCurr = false;
    };

    //stop showing the edit curriculum GUI and clear the temp Table
    $scope.cancelCurrEdit = function(){
      $scope.editingCurr = false;
      $scope.decideToEditCurr = true;
      $scope.tempTable = [];
    };


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


    //values used to hide or show components used to edit the features
    $scope.editingFeatures = false; //Used to hide or show the whole GUI for editing features
    $scope.decideToEdit = true; //Used to hide or show the button that lets a user chose to edit features

    //If a user decides to edit features, initialize the editFeatures array
    //show the editing GUI while hiding the edit features button
    $scope.startFeaturesEdit = function(product){
      //alert($scope.editFeatures.length);
      //alert(product.features);
      for (var i in $scope.product.features) {
          $scope.tempFeatures.push($scope.product.features[i]);
      }
      //alert($scope.editFeatures.length);
      $scope.editingFeatures = true;
      $scope.decideToEdit = false;
    };

    //stop showing the edit feature GUI and clear the tempFeatures array
    $scope.cancelFeatureEdit = function(){
      $scope.editingFeatures = false;
      $scope.decideToEdit = true;
      $scope.tempFeatures = [];
    };

    //Function to add a feature to the tempFeature array
    $scope.addFeature = function(){
      var itemCopy = {};
      //console.log($scope.newFt);
      if ($scope.newFt !== undefined && $scope.newFt !== "" ){
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
    $scope.editBox = item;
    $scope.edits = true;
    $scope.editItem = function(){
        if($scope.editBox !== undefined && $scope.editBox !== "" ){
          $scope.tempFeatures[index] = $scope.editBox;
          $scope.edits = false;
          $scope.editBox = undefined;
        }
        else{
          alert("Please enter a feature");
        }
    };
  };

  //Code for deleting a product
  $scope.delete = function (product) {
    //window confirms that we want to delete
    var conf = confirm("Are you sure you want to delete this product?");
    console.log(conf);
    //if user accepts confirm prompt then proceed to delete
    if(conf){
      if (product) {
        //if valid product delete and splice from product array
        product.$delete();

        for (var i in $scope.products) {
          if ($scope.products[i] === product) {
            $scope.products.splice(i, 1);
          }
        }
      } else {
        //if no product redirect
        $scope.product.$delete(function () {
          $location.path('products');
        });
      }
    }
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

      // Create new Product object
      var product = new Products({
        proType: this.proType,
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
        teacher: this.teacher,
        features: this.tempFeatures,
        suppName: $scope.suppName,
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

    //Code to Update Product
   $scope.updateProd = function (edited_product,isValid) {
     //Check if the updateProductForm is valid, if not cancel update and display errors
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'updateProductForm');
        return false;
      }
      //Check the length of editFeatures array, if it has been initialized, update the features of the product
      if($scope.editingFeatures === true)
      {
      edited_product.features = $scope.tempFeatures.slice();
      }
      if($scope.editingCurr === true)
      {
      edited_product.curriculum = $scope.tempTable.slice();
      }

      if($scope.suppName !== ''){
        edited_product.suppName = $scope.suppName;
      }
      //update product
      edited_product.$update(function () {
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
      //redirect to general products page
      $location.path('products');

    };

    //If we cancel an edit, redirect to the general edit page
    $scope.cancelEdit = function(){
    $location.path('products-edit');
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

    //BELOW IS FOR PDF UPLOADING
    $scope.success = false;
    $scope.pdfName = 'none';
    $scope.suppName = '';
    // Create file uploader instance
    $scope.uploader = new FileUploader({
      url: '/api/upload'
    });

    // Set file uploader image filter
    $scope.uploader.filters.push({
      name: 'pdfFilter',
      fn: function (item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|pdf|'.indexOf(type) !== -1;
      }
    });

    // Called after the user selected a new picture file
    $scope.uploader.onAfterAddingFile = function (fileItem) {
      $scope.pdfName = fileItem._file.name;
      $scope.suppName = fileItem._file.name;
    };

    // Called after the user has successfully uploaded a new picture
    $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
      // Show success message
      $scope.success = true;
      console.log('pdf uploaded');


      // Clear upload buttons
      $scope.cancelUpload();
      //create the requests in $scope.submit()
    };

    // Called after the user has failed to uploaded a new picture
    $scope.uploader.onErrorItem = function (fileItem, response, status, headers) {
      // Clear upload buttons
      $scope.cancelUpload();

      // Show error message
      $scope.error = response.message;
    };

    // Change user profile picture
    $scope.uploadPDF = function () {
      // Clear messages
      $scope.success = $scope.error = null;

      // Start upload
      $scope.uploader.uploadAll();
    };

    // Cancel the upload process
    $scope.cancelUpload = function () {
      $scope.uploader.clearQueue();
      $scope.pdfName ='none';
      $scope.suppName = '';
    };
  }
]);
