'use strict';

angular.module('users').controller('ConfirmationController', ['$scope', '$state', '$http', '$stateParams',
  function ($scope, $state, $http, $stateParams) {
    $scope.displayID = $stateParams.confirmationID;
    $http.get('/api/auth/confirm').success(function (res){
      console.log(res);
      var confirmations = res;
      for(var i = 0; i < res.length; i++){
        if(confirmations[i]._id === $stateParams.confirmationID){
          $scope.confirmation = res[i];
        }
        else{continue;}
      }
    }).error(function (res){
      console.log('YOU FUCKED UP');
    });
  }
]);
