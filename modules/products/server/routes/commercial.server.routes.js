/**
 * Created by memamdie on 11/23/15.
 */
'use strict';

var commercialData = require('../controllers/commercial.server.controller'),
    whoareyoupolicy = require('../policies/variousUsers.server.policy.js');

module.exports = function (app) {
    app.route('/api/commercial/data').all(whoareyoupolicy.isAllowed)
        .get(commercialData.find)
        .put(commercialData.update);
};
