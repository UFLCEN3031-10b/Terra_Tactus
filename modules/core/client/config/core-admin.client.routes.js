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
        controller: 'AnnouncementsController',
        data: {
            roles: ['admin']
        }
      })
      .state('edit-carousel', {
          url: '/edit/carousel',
          templateUrl: '/modules/core/client/views/carouseledit.client.view.html',
          controller: 'CarouselEditController',
          data: {
              roles: ['admin']
          }
      })
      .state('edit-homepage', {
          url: '/edit/homepage',
          templateUrl: '/modules/core/client/views/homepageedit.client.view.html',
          controller: 'HomepageEditController',
          data: {
              roles: ['admin']
          }
      });
  }
]);
