/**
 * Created by memamdie on 12/8/15.
 */
'use strict';

angular.module('core').controller('TestimonialController', function ($scope, $http) {

    $http.get('/api/testimonial/data').success(function (res) {
        console.log(res);
        $scope.testimonials = res;
    });

    //// Create new Product
    //$scope.create = function (isValid) {
    //    //Declare variables for correctly getting checkbox values
    //    var prodType = null;
    //    var teachType = null;
    //    $scope.error = null;
    //    //Check if our producForm was valid, if not create function is canceled and errors show on GUI
    //    if (!isValid) {
    //        $scope.$broadcast('show-errors-check-validity', 'productForm');
    //        return false;
    //    }
    //    //set the correct value of the product type variable
    //    if(document.getElementById("proType-cb").checked) {
    //        prodType = true;
    //    }
    //    else {
    //        prodType = false;
    //    }
    //    //set the correct value of the teacher variable
    //    if(document.getElementById("teacher-cb").checked) {
    //        teachType = true;
    //    }
    //    else {
    //        teachType = false;
    //    }
    //
    //    // Create new Product object
    //    var product = new Products({
    //        proType: prodType,
    //        proTitle: this.proTitle,
    //        longDes: this.longDes,
    //        shortDes: this.shortDes,
    //        imageUrl: this.imageUrl,
    //        imageOne: this.imageOne,
    //        imageTwo: this.imageTwo,
    //        imageThree: this.imageThree,
    //        imageFour: this.imageFour,
    //        indvPrice: this.indvPrice,
    //        eduPrice: this.eduPrice,
    //        wholePrice: this.wholePrice,
    //        teacher: teachType,
    //        features: this.tempFeatures,
    //        curriculum: this.tempTable
    //    });
    //
    //    // Redirect after save
    //    product.$save(function (response) {
    //        $location.path('products');
    //
    //    }, function (errorResponse) {
    //        $scope.error = errorResponse.data.message;
    //    });
    //
    //    console.log('Product has been created');
    //};

    // Find a list of Products
    //$scope.find = function () {
    //    $scope.testimonials = Testimonials.query();
    //};


});
