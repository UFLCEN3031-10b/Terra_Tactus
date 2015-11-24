'use strict';

var payment = require('../controllers/payment.server.controller'),
    userOrder = require('../controllers/user-order.server.controller');

module.exports = function (app) {
    // route for creating a new order, makes call to paypal api
    app.route('/api/order').post(payment.openOrder);

    // route which saves information from paypal
    app.route('/api/order/confirm/:orderId').get(payment.confirm);

    // route that handles execution of paypal order
    app.route('/api/order/execute/:orderId').get(payment.executeOrder);

    // route that handles cancelation of paypal order
    app.route('/api/order/cancel/:orderId').get(payment.cancelOrder);

    // route that makes order unreadable when confirm page is reached
    app.route('/api/order/close/:orderId').delete(payment.close);

    // route for reading order
    app.route('/api/order/find/:orderId').get(payment.read);

    // route for listing open orders for a user
    app.route('/api/order/list').get(userOrder.list);

    app.param('orderId', payment.orderById);
};
