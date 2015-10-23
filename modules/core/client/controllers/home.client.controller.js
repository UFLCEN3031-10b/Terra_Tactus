'use strict';

angular.module('core').controller('HomeController', ['$scope', '$http', 'Authentication',
  function ($scope, $http, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    var loader = '/modules/core/client/img/loaders/loader_black.gif';

    $scope.aboutUsText = '';
    $scope.aboutUsImage = loader;
    $scope.subscribeText = '';
    $scope.subscribeImage = loader;
    $scope.individualProdText = '';
    $scope.individualProdImage = loader;

    $http.get('/api/homepage-data').success(function (res) {
        if (res === null) console.log('[ERROR] homepage-data does not exist yet.');
        else {
            $scope.aboutUsText = res.aboutUsText;
            $scope.aboutUsImage = res.aboutUsImage;
            $scope.subscribeText = res.subscribeText;
            $scope.subscribeImage = res.subscribeImage;
            $scope.individualProdText = res.individualProdText;
            $scope.individualProdImage = res.individualProdImage;
        }
    });
  }
]);
