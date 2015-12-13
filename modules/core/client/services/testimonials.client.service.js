'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('testimonials').factory('Testimonials', ['$resource',
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
