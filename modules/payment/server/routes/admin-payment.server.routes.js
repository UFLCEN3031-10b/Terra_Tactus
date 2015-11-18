'use strict';

var adminControl = require('../controllers/admin-payment.server.controller'),
    policy = require('../policies/payment.server.policy');

module.exports = function (app) {
    app.route('/api/order/adminctl').all(policy.isAllowed)
        .get(adminControl.list)
        .put(adminControl.update);
};
