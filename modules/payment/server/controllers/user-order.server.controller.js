'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    Order = mongoose.model('Order'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

// function for listing the orders associated with a user
exports.list = function (req, res) {
    // ensure the user is logged in
    if (!req.user) {
        return res.status(400).send({
            message: 'User not logged in.'
        });
    }

    // search database for the user id and sort by created
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
