'use strict';

angular.module('core').controller('TestimonialController', ['$window','$http','$scope','$rootScope', '$stateParams', '$location', 'Authentication', 'Testimonials',
    function ($window, $http, $scope, $rootScope, $stateParams, $location, Authentication, Testimonials) {
        $scope.authentication = Authentication;

        //Code for deleting a testimonial
        $scope.delete = function (testimonialID) {
            var conf = confirm("Are you sure you want to delete this testimonial?");
            console.log(conf);
            if(conf){
                $http.delete('/api/testimonials/' + testimonialID).success(function (res) {
                    for (var i in $scope.testimonials) {
                        if ($scope.testimonials[i]._id === testimonialID) {
                            $scope.testimonials.splice(i, 1);
                        }
                    }
                });
            }
        };


        // Find existing Testimonials
        $scope.find = function () {
          $scope.testimonials = Testimonials.query();
        };

        //Code to Update Testimonial
        $scope.update = function (edited_testimonial,isValid) {
            //Check if the updateTestimonialForm is valid, if not cancel update and display errors
            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'updateTestimonialForm');
                return false;
            }
            //update testimonial
            edited_testimonial.$update(function () {
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
            //redirect to general testimonials page
            $location.path('testimonials');

        };

        // Create new Testimonial
        $scope.create = function () {
            var req = $scope.testimonials;

            $scope.error = null;
            console.log('Entering create function');
            // Create new Testimonial object
            var testimonial = new Testimonials({
                from: this.from,
                quote: this.quote,
                pictureUrl: this.pictureUrl,
                creditUrl: this.creditUrl
            });

            $http.put('/api/testimonial/edit', req).success(function (res) {
                $window.location.reload();
            }).error(function (res) {
                console.log(res);
            });

            console.log('Testimonial has been created');
        };
    }
]);
