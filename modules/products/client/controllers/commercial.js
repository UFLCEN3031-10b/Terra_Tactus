'use strict';
/**
 * Created by memamdie on 10/28/15.
 */
angular.module('core').controller('CommercialProdController', function ($scope, $http) {
    $http.get('/api/products').success(function (res) {
        console.log(res);
    });

    $scope.commProducts = [{
        title: '',
        image: '',
        text: '' ,
        price: ''
    }, {
        title: '',
        image: '',
        text: '' ,
        price: ''
    },{
        title: '',
        image: '',
        text: '' ,
        price: ''
    },{
        title: '',
        image: '',
        text: '' ,
        price: ''
    }];

    $scope.addProduct = function (newTitle,newImage, newText, newPrice) {
        $scope.products.push({
            title: newTitle,
            image: newImage,
            text: newText,
            price: newPrice
        });
    };

});
