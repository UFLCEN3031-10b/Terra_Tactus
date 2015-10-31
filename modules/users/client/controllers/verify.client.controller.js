'use strict';

angular.module('users').controller('VerifyController', ['$scope', '$state', '$http', 'Authentication',
  function($scope, $http, $state, Authentication){
    $scope.verify = false;
    $scope.user = Authentication.user;

    $scope.submit = function (isValid) {
      if(isValid){
        console.log("Submit called successfully!");
      }
    };
  }
]);
