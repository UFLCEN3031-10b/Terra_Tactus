'use strict';

angular.module('core').controller('SecondaryHeaderController', ['$scope', '$state', '$http', 'Authentication', 'Menus',
    function ($scope, $state, $http, Authentication, Menus) {

    $scope.authentication = Authentication;

        // Get the topbar menu
        $scope.menu = Menus.getMenu('secondbar');

        // Toggle the menu items
        $scope.isCollapsed = false;
        $scope.toggleCollapsibleMenu = function () {
            $scope.isCollapsed = !$scope.isCollapsed;
        };

        // Collapsing the menu after navigation
        $scope.$on('$stateChangeSuccess', function () {
            $scope.isCollapsed = false;
        });
    }
]);
