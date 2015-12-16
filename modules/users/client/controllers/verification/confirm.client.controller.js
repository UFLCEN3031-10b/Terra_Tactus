'use strict';

angular.module('users').controller('ConfirmationController', ['$scope', '$state', '$http', '$stateParams', '$window',
  function ($scope, $state, $http, $stateParams, $window) {
    $http.get('/api/auth/confirm').success(function (res){
      var confirmations = res;
      for(var i = 0; i < res.length; i++){
        if(confirmations[i]._id === $stateParams.confirmationID){
          $scope.confirmation = res[i];
        }
        else{continue;}
      }
      //gets confirmations, sifts through them to find the one we need
      //inefficient, but a safe assumption is that people are going to confirm their email quickly
      //therefore, we won't have a million confirmation requests so the slowdown is minimal
      if($state.current.name === 'confirmation'){
        $scope.userUpdate();
        //if the user is confirming a regular email, update the user
      }
      else{
        $scope.vReqUpdate();
        /*if the user is confirming a ".edu" email SEPARATE from the one they registered with,
        make their request for reduced prices valid*/
      }
    }).error(function (res){
      console.log('get request for confirmations failed');
    });

    $scope.userUpdate = function(){
      var userToUpdate = $scope.confirmation.user[0];
      userToUpdate.confirmed = true;
      $http.put('/api/auth/confirm/' + userToUpdate._id, userToUpdate).success(function(res){
        $scope.deleteConfirmation();
        $window.location.reload();
        console.log(res);
      }).error(function(res){
        console.log('user not updated');
      });
      /*say that the user's email is legit and confirmed, update the user, delete the confirmation*/
    };

    $scope.vReqUpdate = function(){
      $http.get('/api/auth/vList').success(function(res){
        $scope.vRequests = res;
        for(var i = 0; i < $scope.vRequests.length; i++){
          if($scope.vRequests[i].user[0]._id === $scope.confirmation.user[0]._id){
            $scope.editRequest = $scope.vRequests[i];
            break;
          }
        }
        //find the request for reduced prices that correlates to the user
        $scope.editRequest.validRequest = true;
        console.log($scope.editRequest);
        $http.put('/api/auth/edit/' + $scope.editRequest._id, $scope.editRequest).success(function(res){
          console.log('vReq Updated');
          $scope.deleteConfirmation();
        }).error(function(res){
          console.log('vReq not updated');
        });
        //make their request valid
        //this will allow the admin to approve or deny them as needed
      }).error(function(res){
        console.log(res);
      });
    };

    $scope.deleteConfirmation = function(){
      $http.delete('/api/auth/confirm/' + $scope.confirmation._id).success(function(response){
        console.log('confirmation deleted successfully');
      }).error(function (response){
        console.log('confirmation not deleted');
      });
      //delete this confirmation from the database
    };
  }
]);
