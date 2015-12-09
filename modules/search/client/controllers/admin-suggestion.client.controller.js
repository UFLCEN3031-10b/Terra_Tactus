'use strict';

angular.module('search').controller('ReviewSuggestionsController', ['$scope', '$stateParams', '$http', '$location',
  function ($scope, $stateParams, $http, $location) {
    $scope.suggestions = [];
    $scope.genCustomerService = [];
    $scope.prodSupport = [];
    $scope.selection = 'Suggestions';

    $scope.find = function() {
      $http.get('/api/admin/suggestion').success(function (res) {
        for (var i = 0; i < res.length; i++) {
          if (res[i].subject === "Suggestions") {
            $scope.suggestions.push(res[i]);
          }

          if (res[i].subject === "General Custome Service") {
            $scope.genCustomerService.push(res[i]);
          }

          if (res[i].subject === "Product Support") {
            $scope.prodSupport.push(res[i]);
          }
        }
      });
    };

    $scope.select = function (arg) {
      if (arg === 'cs') {
        $scope.selection = 'General Customer Service';
      }
      else if (arg === 's') {
        $scope.selection = 'Suggestions';
      }
      else if (arg === 'ps') {
        $scope.selection = 'Product Support';
      }
    };
  }
]);
