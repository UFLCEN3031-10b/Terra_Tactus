'use strict';
/**
 * Created by memamdie on 10/28/15.
 */
angular.module('core').controller('RetailProdController', function ($scope, $http) {
    $http.get('/api/retail/data').success(function (res) {
        console.log(res);
        $scope.retailData = res;
    });
});
