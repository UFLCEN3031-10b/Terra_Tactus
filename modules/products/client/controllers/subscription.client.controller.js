/**
 * Created by memamdie on 11/23/15.
 */
'use strict';
angular.module('core').controller('SubscriptionProdController', function ($scope, $http) {
    $http.get('/api/subscription/data').success(function (res) {
        console.log(res);
        $scope.subscriptionData = res;
    });
});
