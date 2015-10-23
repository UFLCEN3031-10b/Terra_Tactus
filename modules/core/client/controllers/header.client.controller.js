'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$state', '$http', 'Authentication', 'Menus',
  function ($scope, $state, $http, Authentication, Menus) {
    // Expose view variables
    $scope.$state = $state;
    $scope.authentication = Authentication;

    // Get the topbar menu
    $scope.menu = Menus.getMenu('topbar');

    // Toggle the menu items
    $scope.isCollapsed = false;
    $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    };

    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = false;
    });

    var sm = $scope.socialmedia = {};
    $http.get('/api/homepage/socialmedia').success(function (res) {
        if (res === null) console.log();
        else {
            sm.facebook = res.facebook;
            sm.twitter = res.twitter;
            sm.linkedin = res.linkedin;
            sm.googleplus = res.googleplus;
        }
    });
  }
]);
