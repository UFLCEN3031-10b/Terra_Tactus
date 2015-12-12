'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$state', '$http', 'Authentication', 'Menus',
  function ($scope, $state, $http, Authentication, Menus) {
    // Expose view variables
    $scope.$state = $state;
    $scope.authentication = Authentication;

    // cart length is 0 initially so it doesn't show
    $scope.cartLength = 0;

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

    // delcare social media json
    $scope.socialmedia = {};

    // fill social media json
    $http.get('/api/homepage/socialmedia').success(function (res) {
        if (res === null) console.log();
        else {
            $scope.socialmedia = res;
        }
    });

    // get new cart length
    $http.get('/api/cart/length').success(function (res) {
        $scope.cartLength = res.length;
    });

    // listen for cart change and update length if received
    $scope.$on('cartChange', function (event) {
        $http.get('/api/cart/length').success(function (res) {
            $scope.cartLength = res.length;
        });
    });
  }
]);
