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

      console.log("Submitted successfully!");
    };
  }
]);
