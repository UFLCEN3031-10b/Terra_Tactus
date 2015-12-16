'use strict';

//Testimonial service used for communicating with the testimonial REST endpoints
angular.module('core').factory('Testimonials', ['$resource',
    function ($resource) {
        return $resource('api/testimonials/:testimonialId', {
            testimonialId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
