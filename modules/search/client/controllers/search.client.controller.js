'use strict';

angular.module('search').controller('SearchController', ['$scope', '$stateParams', '$http', function ($scope, $stateParams, $http) {
    // product variables
    $scope.prodResults = [];
    $scope.prodLoading = true;

    // announcement variables
    $scope.annResults = [];
    $scope.annLoading = true;

    $http.get('/api/search/products?q=' + $stateParams.q).success(function (res) {
        $scope.prodLoading = false;
        $scope.prodResults = res;
    });

    $http.get('/api/search/announcements?q=' + $stateParams.q).success(function (res) {
        $scope.annLoading = false;
        $scope.annResults = res;
    });
}]);
