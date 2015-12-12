'use strict';

angular.module('core').controller('HomeController', ['$scope', '$http', 'Authentication',
  function ($scope, $http, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    // default loading gif for images
    var loader = '/modules/core/client/img/loaders/loader_black.gif';

    // declare text and image variables to be filled from database
    $scope.aboutUsText = '';
    $scope.aboutUsImage = loader;
    $scope.subscribeText = '';
    $scope.subscribeImage = loader;
    $scope.individualProdText = '';
    $scope.individualProdImage = loader;
    $scope.commercialText = '';
    $scope.commercialImage = loader;
    $scope.retailText = '';
    $scope.retailImage = loader;

    // get data and fill it in
    $http.get('/api/homepage/data').success(function (res) {
        if (res === null) console.log('[ERROR] homepage-data does not exist yet.');
        else {
            $scope.aboutUsText = res.aboutUsText;
            $scope.aboutUsImage = res.aboutUsImage;
            $scope.subscribeText = res.subscribeText;
            $scope.subscribeImage = res.subscribeImage;
            $scope.individualProdText = res.individualProdText;
            $scope.individualProdImage = res.individualProdImage;
            $scope.commercialText = res.commercialText;
            $scope.commercialImage = res.commercialImage;
            $scope.retailText = res.retailText;
            $scope.retailImage = res.retailImage;
        }
    });
  }
]);
