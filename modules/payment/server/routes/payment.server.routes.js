'use strict';

var payment = require('../controllers/payment.server.controller');

module.exports = function (app) {
    // route for creating a new order, makes call to paypal api
    app.route('/api/order').post(payment.openOrder);

    // route that paypal redirects to on success
    app.route('/api/order/:orderId').get(payment.executeOrder);

    // route that paypal redirects to on cancel
    app.route('/api/order/cancel/:orderId').get(payment.cancelOrder);

    app.param('orderId', payment.orderById);
};
