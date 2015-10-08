'use strict';

angular.module('core').controller('HomeController', ['$scope', '$http', 'Authentication',
  function ($scope, $http, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $http.get('/api/homepage-data').success(function (res) {
        if (res === null) console.log('[ERROR] homepage-data does not exist yet.');
        else {
            console.log(res.aboutUs);
        }
    });
  }
]);
