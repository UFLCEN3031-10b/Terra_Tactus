'use strict';

angular.module('users').controller('VerifyListController', ['$scope', '$state', '$http',
  function($scope, $state, $http){

    $http.get('/api/auth/vList').success(function (res){
      $scope.vRequests = res;
    }).error(function (response){
      $scope.error = response.message;
    });
  }
]);
