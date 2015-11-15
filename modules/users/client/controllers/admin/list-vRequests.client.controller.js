'use strict';

angular.module('users').controller('VerifyListController', ['$scope', '$state', '$http', '$stateParams',
  function($scope, $state, $http, $stateParams){
    $scope.vRequestsList = function() {
      $http.get('/api/auth/vList').success(function (res){
        $scope.vRequests = res;
        if($stateParams.vReqID === undefined){
          console.log("should be empty");
        }
        else{
          for(var i = 0; i < $scope.vRequests.length; i++){
            if($stateParams.vReqID === $scope.vRequests[i]._id){
              $scope.vRequest = $scope.vRequests[i];
            }
            else{continue;}
          }
        }
      }).error(function (response){
        $scope.error = response.message;
      });
    };

    $scope.userUpdate = function(){
      var saveUser = $scope.vRequest.user[0];
      saveUser.verified = true;
      $http.put('/api/users/' + saveUser._id, saveUser).success(function(res){
        $scope.deleteVReq();
      }).error(function(res){
        $scope.error = res.message;
      });
    };

    $scope.deleteVReq = function(){
      $http.delete('/api/auth/vList/' + $scope.vRequest._id).success(function (res) {
          $state.go('admin.requests');
      });
    };
  }
]);
