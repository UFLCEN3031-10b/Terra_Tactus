'use strict';

angular.module('users').controller('VerifyController', ['$scope', '$state', '$http', 'Authentication', '$window', '$timeout', 'FileUploader',
  function($scope, $state, $http, Authentication, $window, $timeout, FileUploader){
    $scope.verify = false;
    $scope.user = Authentication.user;
    //initialize display variables

    $scope.submit = function (isValid) {
      if(!isValid){
        $scope.$broadcast('show-errors-check-validity', 'userForm');
        return false;
      }
      if($state.current.name === 'wholesale'){
        $scope.vRequest = {validRequest: true, user: $scope.user};
        //create request for reduced prices
      }
      else if($state.current.name === 'teacher'){
        $scope.user.eduEmail = $scope.credentials.eduEmail;
        if($scope.user.eduEmail !== $scope.user.email){
          $scope.vRequest = {validRequest: false, user: $scope.user};
          $scope.createNewConfirmation();
          //user must confirm that their .edu email is legitimate
          //therefore, we create another confirmation hoop for the user to jump through
        }
        else{
          $scope.vRequest = {validRequest: true, user: $scope.user};
        }
      }
      console.log($scope.vRequest);
      $http.post('/api/auth/verify', $scope.vRequest).success(function(response){
        $scope.userUpdate();
        //update the user
        $scope.sendMail();
        //send admin the email
        console.log("Submitted successfully!");
      }).error(function (response){
        $scope.error = response.message;
      });

    };

    $scope.sendMail = function(){
      var mailData = $scope.vRequest;
      if(mailData.user.priceRoles.toString() === 'education'){
        $http.post('/api/mail/sendVReqT', mailData).success(function(){
          $state.go('verificationSuccess');
        });
      }
      //wholesalers are taken care of elsewhere
    };

    $scope.userUpdate = function(){
      var updateUser = $scope.user;
      updateUser.verifySent = true;
      $http.put('/api/auth/confirm/' + updateUser._id, updateUser).success(function(){
        console.log('updated successfully');
      }).error(function(){
        console.log('user not updated');
      });
      //save that the user has sent in their verification materials
      //hides the link to verify from the secondary navbar
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
        console.log('new confirmation not created');
      });
      //create the new confirmation, send that email address the confirmation link
    };


    //BELOW THIS IS FOR SUBMITTING PDF FILES
    $scope.success = false;
    $scope.pdfName = 'none';
    // Create file uploader instance
    $scope.uploader = new FileUploader({
      url: '/api/mail/verifyPDF'
    });

    // Set file uploader image filter
    $scope.uploader.filters.push({
      name: 'pdfFilter',
      fn: function (item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|pdf|'.indexOf(type) !== -1;
      }
    });

    // Called after the user selected a new picture file
    $scope.uploader.onAfterAddingFile = function (fileItem) {
      $scope.pdfName = fileItem._file.name;
    };

    // Called after the user has successfully uploaded a new picture
    $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
      // Show success message
      $scope.success = true;
      console.log('pdf uploaded');

      // Populate user object
      $scope.user = Authentication.user = response;

      // Clear upload buttons
      $scope.cancelUpload();
      $scope.submit(true);
      //create the requests in $scope.submit()
      alert('Thank you for submitting your tax information! You will now be taken back to the homepage.');
      $state.go('home');
    };

    // Called after the user has failed to uploaded a new picture
    $scope.uploader.onErrorItem = function (fileItem, response, status, headers) {
      // Clear upload buttons
      $scope.cancelUpload();

      // Show error message
      $scope.error = response.message;
    };

    // Change user profile picture
    $scope.uploadPDF = function () {
      // Clear messages
      $scope.success = $scope.error = null;

      // Start upload
      $scope.uploader.uploadAll();
    };

    // Cancel the upload process
    $scope.cancelUpload = function () {
      $scope.uploader.clearQueue();
      $scope.pdfName ='none';
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
  //used for routing, poor coding practice but the views will be combined for the final build
]);
