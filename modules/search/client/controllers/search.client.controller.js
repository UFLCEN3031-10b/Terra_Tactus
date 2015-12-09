'use strict';

angular.module('search').controller('SearchController', ['$scope', '$stateParams', '$http', function ($scope, $stateParams, $http) {
    // product variables
    $scope.prodResults = [];
    $scope.prodLoading = true;

    // announcement variables
    $scope.annResults = [];
    $scope.annLoading = true;

    $http.get('/api/search/products?q=' + $stateParams.q).success(function (res) {
        $scope.prodResults = res;
        $scope.prodLoading = false;
    });

    $http.get('/api/search/announcements?q=' + $stateParams.q).success(function (res) {
        console.log(res);
        $scope.annResults = res;
        $scope.annLoading = false;
    });
}]);
