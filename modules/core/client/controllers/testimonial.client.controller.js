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

        $scope.editingData = {};

        for (var i in $scope.testimonials) {
          $scope.editingData[$scope.testimonials[i]._id] = false;
        }

        $scope.modify = function(testimonial){
            $scope.editingData[testimonial._id] = true;
        };


        $scope.update = function(testimonial){
          //Update is entered as soon as modify is clicked
          //So make sure we have actually clicked update and there is a testimonial we want to update
          if (typeof(testimonial) !== 'undefined') {
            var req = {
                from: testimonial.from,
                quote: testimonial.quote,
                pictureUrl: testimonial.pictureUrl,
                creditUrl: testimonial.creditUrl
            };
            $http.put('/api/testimonials/' + testimonial._id, req).success(function (res) {
                // set editing variables to null
                $scope.editingData[testimonial._id] = false;
            });
          }
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

            // Redirect after save
            testimonial.$save(function (response) {
            $location.path('testimonials');

            }, function (errorResponse) {
              $scope.error = errorResponse.data.message;
            });

            console.log('Testimonial has been created');
        };

        $scope.headers = ["From", "Quote", "Picture", "Link"];


        //value used to hide the edit field for a feature in the create products GUI
        $scope.edits = false;

        //Array used to hold features for a product we are creating
        $scope.tempTestimonials = $scope.find();


        //function to show the edit field, within this function the Function
        //to edit a feature is embedded (editItem)
        $scope.showEdits = function(item){
          var index = $scope.tempTestimonials.indexOf(item);
          $scope.editBox = item;
          $scope.edits = true;
          $scope.editItem = function(){
              if($scope.editBox !== undefined && $scope.editBox !== "" ){
                $scope.tempTestimonials[index] = $scope.editBox;
                $scope.edits = false;
                $scope.editBox = undefined;
              }
              else{
                alert("Please enter a feature");
              }
          };
        };

        //Code to delete a feature from the tempFeature array
        $scope.deleteFeature = function(item){
          //console.log("in delete");
          var index = $scope.tempTestimonials.indexOf(item);
          $scope.tempTestimonials.splice(index, 1);
        };

    }
]);
