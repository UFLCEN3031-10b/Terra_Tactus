'use strict';

//Announcements service used for communicating with the announcements REST endpoints
angular.module('core').factory('Announcements', ['$resource',
  function ($resource) {
    return $resource('api/announcements/:announcementId', {
      announcementId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
