/**
 * Created by memamdie on 11/23/15.
 */
'use strict';
var subscriptionData = require('../controllers/subscription.server.controller');

module.exports = function (app) {
    app.route('/api/subscription/data')
        .get(subscriptionData.find)
        .put(subscriptionData.update);
};
