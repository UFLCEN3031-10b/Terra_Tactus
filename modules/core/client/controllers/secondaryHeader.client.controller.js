'use strict';

angular.module('core').controller('SecondaryHeaderController', ['$scope', '$location', 'Authentication', function ($scope, $location, Authentication) {
        $scope.authentication = Authentication;

        $scope.searchButton = function () {
            var s = (!$scope.searchValue) ? '' : $scope.searchValue;
            $location.path('/search').search('q',s);
            $scope.searchValue = '';
        };
    }
]);
