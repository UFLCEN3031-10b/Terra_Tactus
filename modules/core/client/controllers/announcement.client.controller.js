'use strict';

// Announcements controller
angular.module('core').controller('AnnouncementsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Announcements',
  function ($scope, $stateParams, $location, Authentication, Announcements) {
    $scope.authentication = Authentication;

    //check for a link
    $scope.isThere = function (item) {
      console.log(item);
      if (item !== "") {
        return true;
      }
      return false;
    };

    //editting shows
    $scope.isEditing = false;

    // Create new Announcement
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'announcementForm');

        return false;
      }

      // Create new Announcement object
      var announcement = new Announcements({
        title: this.title,
        username: this.username,
        content: this.content,
        link: this.link,
        picture: this.picture
      });

      // Redirect after save
      announcement.$save(function (response) {
        //$location.path('announcements/' + response._id);

      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Announcement
    $scope.remove = function (announcement) {
      if (announcement) {
        announcement.$remove();

        for (var i in $scope.announcements) {
          if ($scope.announcements[i] === announcement) {
            $scope.announcements.splice(i, 1);
          }
        }
      } else {
        $scope.announcement.$remove(function () {
          $location.path('announcements');
        });
      }
    };

    // Update existing Announcement
    $scope.update = function (isValid, announcement) {
      $scope.error = null;
      $scope.isEditing = false;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'announcementForm');

        return false;
      }

      announcement.$update(function () {
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    //edit it and then update it
    $scope.edit = function (announcement) {
      $scope.isEditing = true;
    };

    // Find a list of Announcements
    $scope.find = function () {
      $scope.announcements = Announcements.query();
    };

    // Find existing Announcement
    $scope.findOne = function () {
      $scope.announcement = Announcements.get({
        announcementId: $stateParams.announcementId
      });
    };
  }
]);
