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
      $scope.userUpdate();
    }).error(function (res){
      console.log('YOU FUCKED UP');
    });

    $scope.userUpdate = function(){
      var userToUpdate = $scope.confirmation.user[0];
      console.log(userToUpdate);
      userToUpdate.verified = true;
      $http.put('/api/auth/confirm/' + userToUpdate._id).success(function(res){
        console.log('I\'M THE BEST');
      }).error(function(res){
        console.log('I\'M THE WORST');
      });
    };
  }
]);