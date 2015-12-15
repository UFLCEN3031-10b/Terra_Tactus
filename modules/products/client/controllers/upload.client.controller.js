'use strict';

angular.module('core').controller('UploadController', ['$scope', '$state', '$http', 'Authentication', '$window', '$timeout', 'FileUploader',
  function($scope, $state, $http, Authentication, $window, $timeout, FileUploader){
    //BELOW THIS IS FOR SUBMITTING PDF FILES
    $scope.success = false;
    $scope.pdfName = 'none';
    // Create file uploader instance
    $scope.uploader = new FileUploader({
      url: '/api/upload'
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


      // Clear upload buttons
      $scope.cancelUpload();
      //create the requests in $scope.submit()
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
