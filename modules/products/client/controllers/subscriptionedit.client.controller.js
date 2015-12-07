/**
 * Created by memamdie on 11/23/15.
 */
'use strict';

angular.module('core').controller('SubscriptionEditController', ['$scope', '$http', '$window', function ($scope, $http, $window) {
    $scope.subscriptionData = {};

    $http.get('/api/subscription/edit').success(function (res) {
        $scope.subscriptionData = res;
        console.log(res);
    });

    $scope.subscriptionUpdate = function () {
        var req = $scope.subscriptionData;

        $http.put('/api/subscription/edit', req).success(function (res) {
            $window.location.reload();
        }).error(function (res) {
            console.log(res);
        });
    };

}]);
