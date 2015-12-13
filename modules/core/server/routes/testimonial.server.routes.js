/**
 * Created by memamdie on 12/8/15.
 */
'use strict';

var testimonials = require('../controllers/testimonial.server.controller'),
    testimonialpolicy = require('../policies/testimonials.server.policy.js');


//Route for testimonial data
module.exports = function (app) {

    // routing for testimonials data, needs user restriction
    app.route('/api/testimonials/:testimonialId').all(testimonialpolicy.isAllowed)
        .get(testimonials.find)
        .put(testimonials.update)
        .delete(testimonials.delete);

    app.route('/api/testimonials').all(testimonialpolicy.isAllowed)
        .get(testimonials.list)
        .post(testimonials.create);

    // Finish by binding the testimonials middleware
    app.param('testimonialId', testimonials.testimonialByID);

};
