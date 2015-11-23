/**
 * Created by memamdie on 11/23/15.
 */
'use strict'
var retailData = require('../controllers/retail.server.controller');

module.exports = function (app) {
    // routing for homepage data, needs user restriction
    app.route('/api/retail/data')
        .get(retailData.find)
        .put(retailData.update);
};
