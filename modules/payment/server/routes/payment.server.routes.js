'use strict';

var payment = require('../controllers/payment.server.controller');

module.exports = function (app) {
    app.route('/api/order').get(payment.openOrder);

    app.param('orderId', payment.orderById);
};
