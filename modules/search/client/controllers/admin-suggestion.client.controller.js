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

          if (res[i].subject === "General Customer Service") {
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

    $scope.seekAndDestroy = function (data, index) {
      if (data.subject === "Suggestions") {
        $scope.suggestions.splice(index, 1);
      }

      if (data.subject === "General Custome Service") {
        $scope.genCustomerService.splice(index, 1);
      }

      if (data.subject === "Product Support") {
        $scope.prodSupport.splice(index, 1);
      }
    };

    $scope.remove = function(data, index) {
      var conf = confirm("Are you sure this suggestion is resolved?")
      if (!conf) {
          return;
      }
      $scope.seekAndDestroy(data, index);
      $http.delete('/api/admin/suggestion/' + data._id).success(function (res) {
        console.log("deleted bish");
      });
    };
  }
]);
