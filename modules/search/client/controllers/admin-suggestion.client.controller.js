'use strict';

angular.module('search').controller('ReviewSuggestionsController', ['$scope', '$stateParams', '$http', '$location',
  function ($scope, $stateParams, $http, $location) {
    $scope.suggestions = [];
    $scope.selection = 'Suggestions';

    $scope.find = function() {
      $http.get('/api/admin/suggestion').success(function (res) {
        $scope.suggestions = res;
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
