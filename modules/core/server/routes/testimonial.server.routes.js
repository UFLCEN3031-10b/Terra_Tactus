/**
 * Created by memamdie on 12/8/15.
 */
'use strict';

var testimonials = require('../controllers/testimonial.server.controller');

//Route for testimonial data
module.exports = function (app) {

    app.route('/api/testimonials/data')
        .get(testimonials.find)
        .put(testimonials.update)
        .post(testimonials.create)
        .delete(testimonials.delete);

};
