'use strict';

var payment = require('../controllers/payment.server.controller');

module.exports = function (app) {
    // route for creating a new order, makes call to paypal api
    // and for pulling order from session data
    app.route('/api/order').get(payment.getCompletedOrder)
        .post(payment.openOrder);

    // route that handles execution of paypal order
    app.route('/api/order/execute/:orderId').get(payment.executeOrder);

    // route that handles cancelation of paypal order
    app.route('/api/order/cancel/:orderId').get(payment.cancelOrder);

    app.param('orderId', payment.orderById);
};
