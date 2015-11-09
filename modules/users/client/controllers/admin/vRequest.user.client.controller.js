'use strict';

angular.module('users').controller('VerifyRequestsController', ['$scope', '$state', '$http', '$stateParams',
  function($scope, $state, $http, $stateParams){
    $scope.vRequest = $stateParams.vReqID;
  }
]);
