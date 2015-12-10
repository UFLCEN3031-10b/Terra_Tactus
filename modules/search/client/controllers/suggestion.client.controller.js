'use strict';

angular.module('search').controller('SuggestionController', ['$scope', '$stateParams', '$http', '$location',
  function ($scope, $stateParams, $http, $location) {
    $scope.firstName = '';
    $scope.lastName = '';
    $scope.emailAddress = '';
    $scope.items = ['General Customer Service', 'Suggestions', 'Product Support'];
    $scope.subject = $scope.items[0];
    $scope.message = '';


    $scope.create = function () {
      var suggestion = {
        firstName: $scope.firstName,
        lastName: $scope.lastName,
        emailAddress: $scope.emailAddress,
        subject: $scope.subject,
        message: $scope.message
      };

      if ($scope.message === '') {
        return;
      }

      $http.post('/api/suggestion', suggestion).success(function (res) {
        $location.path('');
      });
    };
  }
]);
