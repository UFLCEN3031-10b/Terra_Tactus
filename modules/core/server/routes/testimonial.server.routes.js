/**
 * Created by memamdie on 12/8/15.
 */
'use strict';

var testimonials = require('../controllers/testimonial.server.controller'),
    testimonialpolicy = require('../policies/testimonials.server.policy.js');


//Route for testimonial data
module.exports = function (app) {

    app.route('/api/testimonials/data').all(testimonialpolicy.isAllowed)
        .get(testimonials.find)
        .put(testimonials.update)
        .post(testimonials.create)
        .delete(testimonials.delete);

};
