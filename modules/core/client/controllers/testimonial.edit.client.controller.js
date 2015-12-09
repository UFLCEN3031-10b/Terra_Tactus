/**
 * Created by memamdie on 12/8/15.
 */
'use strict';

angular.module('core').controller('TestimonialEditController', ['$scope', '$http', '$window', function ($scope, $http, $window) {
    $scope.testimonialData = {};

    $http.get('/api/testimonial/data').success(function (res) {
        $scope.testimonialData = res;
    });

    $scope.testimonialUpdate = function () {
        var req = $scope.testimonialData;

        $http.put('/api/testimonial/data', req).success(function (res) {
            $window.location.reload();
        }).error(function (res) {
            console.log(res);
        });
    };

}]);
