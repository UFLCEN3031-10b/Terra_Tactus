'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
      $injector.get('$state').transitionTo('not-found', null, {
        location: false
      });
    });

    // Home state routing
    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'modules/core/client/views/home.client.view.html'
    })
    .state('not-found', {
      url: '/not-found',
      templateUrl: 'modules/core/client/views/404.client.view.html',
      data: {
        ignoreState: true
      }
    })

    .state('bad-request', {
      url: '/bad-request',
      templateUrl: 'modules/core/client/views/400.client.view.html',
      data: {
        ignoreState: true
      }
    })
    //adding an edit-announcement
    .state('announcements.edit', {
      url: '/:announcementId/edit',
      templateUrl: 'modules/core/client/views/edit-announcement.client.view.html',
      data: {
        roles: ['admin']
      }
    })
    //Viewing testimonials
    .state('testimonials', {
      url: '/testimonials',
      templateUrl: '/modules/core/client/views/testimonial.client.view.html',
      controller: 'TestimonialController'
    })
     //Editing testimonials
    .state('testimonials-edit', {
      url: '/testimonials/edit',
      templateUrl: '/modules/core/client/views/testimonial.edit.client.view.html',
      controller: 'TestimonialController',
      data: {
        roles: ['admin']
      }
    })
    //Attempting to access a forbidden page
    .state('forbidden', {
      url: '/forbidden',
      templateUrl: 'modules/core/client/views/403.client.view.html',
      data: {
        ignoreState: true
      }
    });
  }
]);
