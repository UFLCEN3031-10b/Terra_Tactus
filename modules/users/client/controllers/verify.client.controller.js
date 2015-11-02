'use strict';

angular.module('users').controller('VerifyController', ['$scope', '$state', '$http', 'Authentication',
  function($scope, $state, $http, Authentication){
    $scope.verify = false;
    $scope.user = Authentication.user;

    $scope.submit = function (isValid) {
      if(!isValid){
        $scope.$broadcast('show-errors-check-validity', 'userForm');
        return false;
      }
      $scope.vRequest = {validRequest: true, user: $scope.user};
      $http.post('/api/auth/verify', $scope.vRequest).success(function(response){
        console.log("Submitted successfully!");
        $state.go('home');
      }).error(function (response){
        $scope.error = response.message;
      });
    };
  }
]);
