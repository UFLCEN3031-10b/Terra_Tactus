/**
 * Created by memamdie on 11/23/15.
 */
'use strict';
var subscriptionData = require('../controllers/subscription.server.controller'),
    whoareyoupolicy = require('../policies/variousUsers.server.policy.js');
//Who are you policy makes sure you can only put if you have proper credentials
//Route for subscription data
module.exports = function (app) {
    app.route('/api/subscription/data').all(whoareyoupolicy.isAllowed)
        .get(subscriptionData.find)
        .put(subscriptionData.update);
};
