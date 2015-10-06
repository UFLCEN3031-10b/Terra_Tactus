'use strict';

angular.module('core').controller('ProductsController', function ($scope) {

    $scope.products = [{
        title: 'Exploring The Swamp',
        image: 'http://1.bp.blogspot.com/-QuICtWHygN0/UoAlMMR9UNI/AAAAAAABYfc/rfcld52y97M/s1600/Gaineville+Trip+136.JPG',
        text: 'Sample Text Mauris non dui sit amet magna volutpat suscipit sed eu mi. Nam molestie, justo id egestas vulputate, leo mauris elementum turpis, eget mollis ipsum nibh et metus. Vestibulum nec ligula non felis laoreet blandit ac id erat. Integer a diam eu sem fringilla hendrerit non eget mi. Praesent mattis ultrices interdum. Phasellus vestibulum metus quis pulvinar dapibus. '

    }, {
        title: 'Exploring Gator Football',
        image: 'http://www.gatortailgating.com/files/imagecache/gt7_full_580/mike/2012/03/gators-usf.jpg',
        text: 'Sample Text Mauris non dui sit amet magna volutpat suscipit sed eu mi. Nam molestie, justo id egestas vulputate, leo mauris elementum turpis, eget mollis ipsum nibh et metus. Vestibulum nec ligula non felis laoreet blandit ac id erat.'
    
    }];

    $scope.addProduct = function (newTitle,newImage, newText) {
        $scope.products.push({
            title: newTitle,
            image: newImage,
            text: newText
        });
    };
});
