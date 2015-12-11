'use strict';

angular.module('core').controller('SecondaryHeaderController', ['$scope', '$state', '$http', 'Authentication', 'Menus',
    function ($scope, $state, $http, Authentication, Menus) {
    $scope.authentication = Authentication;
}
]);
