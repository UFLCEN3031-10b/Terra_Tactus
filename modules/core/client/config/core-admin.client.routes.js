'use strict';

// Setting up route
angular.module('core.admin.routes').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('admin', {
        abstract: true,
        url: '/admin',
        template: '<ui-view/>',
        data: {
          roles: ['admin']
        }
      })
      .state('create-announcement', {
        url: '/create-announcement',
        templateUrl: '/modules/core/client/views/create-announcement.client.view.html',
        controller: 'AnnouncementsController'
      });
  }
]);
