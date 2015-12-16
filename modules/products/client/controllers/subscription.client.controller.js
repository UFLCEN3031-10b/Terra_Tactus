'use strict';
angular.module('core').controller('SubscriptionProdController', function ($scope, $http, $location) {
    //Gets the subscription data from the DB
    $http.get('/api/subscription/data').success(function (res) {
        console.log(res);
        $scope.subscriptionData = res;
    });
    //Updates the subscription data when changed in the subscription editing view
    $scope.subscriptionUpdate = function () {
        var req = $scope.subscriptionData;

        $http.put('/api/subscription/data', req).success(function (res) {
            $location.path('subscriptions');
        }).error(function (res) {
            console.log(res);
        });
    };

});
