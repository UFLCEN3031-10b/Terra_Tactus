'use strict';

angular.module('users').controller('WholesaleVerifyController', ['$scope', '$state', '$http', 'Authentication',
  function($scope, $state, $http, Authentication){
    $scope.verify = false;
    $scope.user = Authentication.user;

    $scope.submit = function (isValid) {
      if(!isValid){
        $scope.$broadcast('show-errors-check-validity', 'userForm');
        return false;
      }
      $scope.vRequest = {validRequest: true, user: $scope.user};
      $http.post('/api/auth/verify', $scope.vRequest).success(function(response){
        $scope.sendMail();
        console.log("Submitted successfully!");
      }).error(function (response){
        $scope.error = response.message;
      });

    };

    $scope.sendMail = function(){
      var mailData = {
        info: $scope.credentials,
        user: $scope.vRequest.user
      };

      $http.post('/api/mail/sendVReq', mailData).success(function(){
        $state.go('verificationSuccess');
      });
    };
  }
]);
