'use strict';

angular.module('search').controller('SuggestionController', ['$scope', '$stateParams', '$http', '$location',
  function ($scope, $stateParams, $http, $location) {
    $scope.firstName = '';
    $scope.lastName = '';
    $scope.emailAddress = '';
    $scope.subject = 'Choose One:';
    $scope.message = '';

    $scope.create = function () {
      var suggestion = {
        firstName: $scope.firstName,
        lastName: $scope.lastName,
        emailAddress: $scope.emailAddress,
        subject: $scope.subject,
        message: $scope.message
      };

      $http.post('/api/suggestion', suggestion).success(function (res) {
        $location.path('');
      });
    };
  }
]);
