'use strict';

var paypal = require('paypal-rest-sdk'),
    mongoose = require('mongoose'),
    Order = mongoose.model('Order');

paypal.configure({
    'mode': 'sandbox',
    'client_id': 'not_a_real_id',
    'client_secret': 'b67779a017ab6aeb6adb5666040b0469'
});

exports.openOrder = function (req, res) {};

exports.orderById = function (req, res, next, id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Order is invalid'
        });
    }

    Order.findById(id).exec(function (err, order) {
        if (err) {
            return next(err);
        } else if (!order) {
            return res.status(404).send({
                message: 'No order with that identifier has been found'
            });
        }

        req.order = order;
        next();
    });
};
