/**
 * Created by memamdie on 11/23/15.
 */
'use strict';

var commercialData = require('../controllers/commercial.server.controller');

module.exports = function (app) {
    app.route('/api/commercial/data')
        .get(commercialData.find)
        .put(commercialData.update);
};
