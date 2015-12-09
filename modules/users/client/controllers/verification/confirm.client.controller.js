'use strict';

angular.module('users').controller('ConfirmationController', ['$scope', '$state', '$http', '$stateParams',
  function ($scope, $state, $http, $stateParams) {
    $http.get('/api/auth/confirm').success(function (res){
      var confirmations = res;
      for(var i = 0; i < res.length; i++){
        if(confirmations[i]._id === $stateParams.confirmationID){
          $scope.confirmation = res[i];
        }
        else{continue;}
      }
      if($state.current.name === 'confirmation'){
        $scope.userUpdate();
      }
      else{
        $scope.vReqUpdate();
      }
    }).error(function (res){
      console.log('get request for confirmations failed');
    });

    $scope.userUpdate = function(){
      var userToUpdate = $scope.confirmation.user[0];
      userToUpdate.confirmed = true;
      $http.put('/api/auth/confirm/' + userToUpdate._id, userToUpdate).success(function(res){
        $scope.deleteConfirmation();
        console.log(res);
      }).error(function(res){
        console.log('user not updated');
      });
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
        $scope.editRequest.validRequest = true;
        console.log($scope.editRequest);
        $http.put('/api/auth/edit/' + $scope.editRequest._id, $scope.editRequest).success(function(res){
          console.log('vReq Updated');
          $scope.deleteConfirmation();
        }).error(function(res){
          console.log('vReq not updated');
        });
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
    };
  }
]);
