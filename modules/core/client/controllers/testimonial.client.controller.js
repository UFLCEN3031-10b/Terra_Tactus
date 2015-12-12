'use strict';

// Testimonials controller
angular.module('core').controller('TestimonialsController', ['$window','$http','$scope','$rootScope', '$stateParams', '$location', 'Authentication', 'Testimonials',
    function ($window, $http, $scope, $rootScope, $stateParams, $location, Authentication, Testimonials) {
        $scope.authentication = Authentication;

        // Find a list of Testimonials
        $scope.find = function () {
            $scope.testimonials = Testimonials.query();
        };

        // Find existing Testimonials
        $scope.findOne = function () {
            $scope.testimonial = Testimonials.get({
                testimonialId: $stateParams.testimonialId
            });
        };


    }
]);
