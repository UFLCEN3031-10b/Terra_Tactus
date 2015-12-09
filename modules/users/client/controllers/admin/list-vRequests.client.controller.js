'use strict';

angular.module('users').controller('VerifyListController', ['$scope', '$state', '$http', '$stateParams',
  function($scope, $state, $http, $stateParams){
    $scope.vRequestsList = function() {
      $http.get('/api/auth/vList').success(function (res){
        $scope.vRequests = res;
        $scope.wholesales = [];
        $scope.educations = [];
        $scope.displayRequests = [];
        $scope.showWholesale = true;
        $scope.showEducation = true;
        //initialize variables

        if($stateParams.vReqID === undefined){
          for(var j = 0; j < $scope.vRequests.length; j++){
            if($scope.vRequests[j].validRequest){
              $scope.displayRequests.push($scope.vRequests[j]);
              if($scope.vRequests[j].user[0].priceRoles.toString() === 'wholesale'){
                $scope.wholesales.push($scope.vRequests[j]);
              }
              else if($scope.vRequests[j].user[0].priceRoles.toString() === 'education'){
                $scope.educations.push($scope.vRequests[j]);
              }
            }
          }
        }
        //load in valid requests only and load them into their respective arrays
        //inefficient filtering method, but will fix to use ng-filter in final build
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
          //setting variables for filtering and display
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
      //updating user as verified, therefore they get the reduced prices
    };

    $scope.deleteVReq = function(){
      $http.delete('/api/auth/vList/' + $scope.vRequest._id).success(function (res) {
        $state.go('admin.requests');
      });
    };
    //delete the request to clean up the database a bit
  }
]);
