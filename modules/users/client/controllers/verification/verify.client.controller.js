'use strict';

angular.module('users').controller('VerifyController', ['$scope', '$state', '$http', 'Authentication',
  function($scope, $state, $http, Authentication){
    $scope.verify = false;
    $scope.user = Authentication.user;

    $scope.options = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

    $scope.submit = function (isValid) {
      if(!isValid){
        $scope.$broadcast('show-errors-check-validity', 'userForm');
        return false;
      }
      if($state.current.name === 'wholesale'){
        var dateOfBirth = $scope.credentials.month + '/' + $scope.credentials.day + '/' + $scope.credentials.year;
        $scope.vRequest = {validRequest: true, user: $scope.user, SSN: $scope.credentials.SSN, DOB: dateOfBirth};
      }
      else if($state.current.name === 'teacher'){
        $scope.user.eduEmail = $scope.credentials.eduEmail;
        $scope.vRequest = {validRequest: true, user: $scope.user};
      }
      console.log($scope.vRequest);
      $http.post('/api/auth/verify', $scope.vRequest).success(function(response){
        $scope.userUpdate();
        $scope.sendMail();
        if($scope.user.eduEmail !== $scope.user.email){
          $scope.createNewConfirmation();
        }
        console.log("Submitted successfully!");
      }).error(function (response){
        $scope.error = response.message;
      });

    };

    $scope.sendMail = function(){
      var mailData = $scope.vRequest;
      if(mailData.user.priceRoles.toString() === 'wholesale'){
        $http.post('/api/mail/sendVReqW', mailData).success(function(){
          $state.go('verificationSuccess');
        });
      }
      else if(mailData.user.priceRoles.toString() === 'education'){
        $http.post('/api/mail/sendVReqT', mailData).success(function(){
          $state.go('verificationSuccess');
        });
      }
    };

    $scope.userUpdate = function(){
      var updateUser = $scope.user;
      updateUser.verifySent = true;
      $http.put('/api/auth/confirm/' + updateUser._id).success(function(){
        console.log('updated successfully');
      }).error(function(){
        console.log('you\'re a fucking idiot');
      });
    };

    $scope.createNewConfirmation = function(){
      var confirmUser = {user: $scope.user};

      $http.post('/api/auth/confirm', confirmUser).success(function(res) {
        $scope.confirmation = res;
        $http.post('/api/mail/eduConfirmation', $scope.confirmation).success(function(){
          console.log('edu email sent');
        }).error(function(){
          console.log('edu email not sent');
        });
      }).error(function (res)  {
        console.log('you fucking suck noob');
      });
    };

  }
]);

angular.module('users').controller('VerifyRouteController', ['$state', 'Authentication',
  function($state, Authentication){
    if(Authentication.user.priceRoles.toString() === 'education'){
      $state.go('teacher');

    }
    else if(Authentication.user.priceRoles.toString() === 'wholesale'){
      $state.go('wholesale');
    }
  }
]);
