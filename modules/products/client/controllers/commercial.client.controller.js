'use strict';
/**
 * Created by memamdie on 10/28/15.
 */
angular.module('core').controller('CommercialProdController', function ($scope, $http) {
    $http.get('/api/products').success(function (res) {
        console.log(res);
        //res.find()
        //for(var obj in res) {
        //    console.log(obj.teacher);
        //}
    });
    $http.get('/api/commercial/data').success(function (res) {
        console.log(res);
        $scope.commercialData = res;
    });


    $scope.addProduct = function (newTitle,newImage, newText, newPrice) {
        $scope.products.push({
            title: newTitle,
            image: newImage,
            text: newText,
            price: newPrice
        });
    };

});
