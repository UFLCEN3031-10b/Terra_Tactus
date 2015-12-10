/**
 * Created by memamdie on 12/8/15.
 */
'use strict';
var testimonialData = require('../controllers/testimonial.server.controller');

//Route for testimonial data
module.exports = function (app) {
    app.route('/api/testimonial/data')
        .get(testimonialData.find)
        .put(testimonialData.update);
};
