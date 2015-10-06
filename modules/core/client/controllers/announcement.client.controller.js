'use strict';

angular.module('core').controller('AnnouncementController', ['$scope', function ($scope) {
        //this needs to be populated with a call to the database
        //to receive the most recent announcements
        //posted by the admin account
        $scope.announcement = [{text: 'testing... '}, {text: 'blah'}];
    }
]);
