'use strict';

angular.module('users').controller('VerifyController', ['$scope', '$state', '$http',
  function($scope, $http, $state){
    $scope.verify = false;
  }
]);
