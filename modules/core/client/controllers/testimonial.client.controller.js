'use strict';

// Testimonials controller
angular.module('core').controller('TestimonialsController', ['$window','$http','$scope','$rootScope', '$stateParams', '$location', 'Authentication', 'Testimonials',
    function ($window, $http, $scope, $rootScope, $stateParams, $location, Authentication, Testimonials) {
        $scope.authentication = Authentication;

        // Create new Testimonial
        $scope.create = function (isValid) {
            $scope.error = null;
            //Check if our producForm was valid, if not create function is canceled and errors show on GUI
            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'testimonialDataForm');
                return false;
            }

            // Create new Testimonial object
            var testimonial = new Testimonials({
                from: this.from,
                quote: this.quote,
                pictureUrl: this.pictureUrl,
                creditUrl: this.creditUrl
            });

            // Redirect after save
            testimonial.$save(function (response) {
                $location.path('testimonials');

            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });

            console.log('Testimonial has been created');
        };

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
