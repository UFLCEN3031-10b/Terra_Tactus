'use strict';

angular.module('core').controller('SecondaryHeaderController', ['$scope', 'Authentication', function ($scope, Authentication) {
        $scope.authentication = Authentication;
    }
]);
