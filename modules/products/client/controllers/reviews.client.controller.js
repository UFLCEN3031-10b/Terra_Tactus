'use strict';

angular.module('products').controller('ReviewController', ['$scope',
  function ($scope) {

    $scope.openComments = false;

    $scope.showComments = function () {
      openComments = !openComments;
    };
  }
]);
