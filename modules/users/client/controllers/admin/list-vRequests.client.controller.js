'use strict';

angular.module('users').controller('VerifyListController', ['$scope', '$state', '$http', '$stateParams',
  function($scope, $state, $http, $stateParams){
    $scope.vRequestsList = function() {
      $http.get('/api/auth/vList').success(function (res){
        $scope.vRequests = res;
        $scope.wholesales = [];
        $scope.educations = [];
        $scope.showWholesale = true;
        $scope.showEducation = true;
        if($stateParams.vReqID === undefined){
          for(var j = 0; j < $scope.vRequests.length; j++){
            if($scope.vRequests[j].user[0].priceRoles.toString() === 'wholesale'){
              $scope.wholesales.push($scope.vRequests[j]);
            }
            else if($scope.vRequests[j].user[0].priceRoles.toString() === 'education'){
              $scope.educations.push($scope.vRequests[j]);
            }
          }
        }
        else{
          for(var i = 0; i < $scope.vRequests.length; i++){
            if($stateParams.vReqID === $scope.vRequests[i]._id){
              $scope.vRequest = $scope.vRequests[i];
              if($scope.vRequest.user[0].priceRoles.toString() === 'wholesale'){
                $scope.showWholesale = true;
                $scope.showEducation = false;
              }
              else if($scope.vRequest.user[0].priceRoles.toString() === 'education'){
                $scope.showWholesale = false;
                $scope.showEducation = true;
              }
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
        alert('User approved! They will now place orders automatically.');
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
