'use strict';

// Announcements controller
angular.module('core').controller('SearchController', ['$scope', '$stateParams', '$location', 'Authentication', 'Announcements', 'Products',
  function ($scope, $stateParams, $location, Authentication, Announcements, Products) {
    $scope.authentication = Authentication;
    $scope.products = undefined;
    $scope.selected = undefined;
    $scope.searchResults = [];
    $scope.tempSearch = {
      "title": "",
      "link": ""
    };

    $scope.search = function () {
      Products.query().$promise.then(function (data) {
        $scope.products = data;
        for (var searchString in $scope.products) {
          $scope.tempSearch.title = $scope.products[searchString].proTitle;
          console.log($scope.tempSearch);
          $scope.tempSearch.link = $scope.products[searchString]._id;
          $scope.searchResults.push($scope.tempSearch);
        }
        console.log($scope.searchResults);
      });
    };


  }
]);
