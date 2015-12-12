'use strict';

angular.module('core').controller('SecondaryHeaderController', ['$scope', '$location', 'Authentication', function ($scope, $location, Authentication) {
        $scope.authentication = Authentication;

        // redirect to the search page on click
        $scope.searchButton = function () {
            // calculate search string
            var s = (!$scope.searchValue) ? '' : $scope.searchValue;

            // redirect to search with string as the query
            $location.path('/search').search('q',s);

            // reset the value to an empty string when done
            $scope.searchValue = '';
        };
    }
]);
