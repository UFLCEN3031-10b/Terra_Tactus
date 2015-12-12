'use strict';

var adminControl = require('../controllers/admin-payment.server.controller'),
    policy = require('../policies/payment.server.policy'),
    payment = require('../controllers/payment.server.controller');

module.exports = function (app) {
    // route for listing orders
    app.route('/api/order/adminctl').all(policy.isAllowed)
        .get(adminControl.list);

    // route for updating an open order's status
    app.route('/api/order/adminctl/:orderId').all(policy.isAllowed)
        .put(adminControl.update);

    app.param('orderId', payment.orderById);
};
