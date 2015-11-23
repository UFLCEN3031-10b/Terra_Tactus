'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    Order = mongoose.model('Order'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.list = function (req, res) {
    if (!req.user) {
        return res.status(400).send({
            message: 'User not logged in.'
        });
    }

    Order.find({ user: req.user._id }).sort('-created').exec(function (err, orders) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(orders);
        }
    });
};
