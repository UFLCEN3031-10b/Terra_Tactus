'use strict';

angular.module('core').controller('TestimonialEditController', ['$window','$http','$scope','$rootScope', '$stateParams', '$location', 'Authentication', 'Testimonials',
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
        $scope.findOne = function () {
            $scope.testimonial = Testimonials.get({
                testimonialId: $stateParams.testimonialId
            });
        };

        //
        //Code to Update Testimonial
        $scope.updateTest = function (edited_testimonial,isValid) {
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

        //If we cancel an edit, redirect to the general edit page
        $scope.cancelEdit = function(){
            $location.path('testimonials-edit');
        };

        //Get all the testimonials
        $http.get('/api/testimonials').success(function (res) {
            $scope.testimonials = res;
        });

        // Create new Testimonial
        $scope.create = function (isValid) {
            $scope.error = null;
            //Check if our testimonial form was valid, if not create function is canceled and errors show on GUI
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
    }
]);
