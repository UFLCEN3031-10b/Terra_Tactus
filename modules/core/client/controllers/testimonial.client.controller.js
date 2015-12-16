'use strict';

angular.module('core').controller('TestimonialController', ['$window','$http','$scope','$rootScope', '$stateParams', '$location', 'Authentication', 'Testimonials',
    function ($window, $http, $scope, $rootScope, $stateParams, $location, Authentication, Testimonials) {

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

            $http.get('/api/testimonials').success(function (res) {
                console.log(res);
                $scope.testimonials = res;
            });
        };

        //Holds boolean values of whether or not we are editing this testimonial
        $scope.editingData = {};

        //Initialize all the testimonials to not being edited
        for (var i in $scope.testimonials) {
          $scope.editingData[$scope.testimonials[i]._id] = false;
        }

        //When you begin editing set editing for that testimonial to true so that the appearance changes for the user
        $scope.modify = function(testimonial){
            $scope.editingData[testimonial._id] = true;
        };

        //Update existing testimonials
        $scope.update = function(testimonial, isValid){
          if (!isValid) {
            $scope.$broadcast('show-errors-check-validity', 'updateTestimonial');
            return false;
          }
          //Update is entered as soon as modify is clicked
          //So make sure we have actually clicked update and there is a testimonial we want to update
          if (typeof(testimonial) !== 'undefined') {
            //  Grab the values for the testimonial
            var req = {
                from: testimonial.from,
                quote: testimonial.quote,
                pictureUrl: testimonial.pictureUrl,
                creditUrl: testimonial.creditUrl
            };
            //  Save the data
            $http.put('/api/testimonials/' + testimonial._id, req).success(function (res) {
                // set editing variables to false
                $scope.editingData[testimonial._id] = false;
            });
          }
        };



        // Create new Testimonial
        $scope.create = function (isValid) {
            if (!isValid) {
              $scope.$broadcast('show-errors-check-validity', 'testimonialDataForm');
              return false;
            }
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

            // Redirect after save
            testimonial.$save(function (response) {
            $location.path('testimonials');

            }, function (errorResponse) {
              $scope.error = errorResponse.data.message;
            });

            console.log('Testimonial has been created');
        };

        $scope.headers = ["From", "Quote", "Picture", "Link"];


    }
]);
