'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    contact = mongoose.model('Contact'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

// route for listing the contact data
exports.find = function (req, res) {
    // should only be one item in the database at a time
    // so we only need to findOne
    contact.findOne().exec(function (err, info) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(info);
        }
    });
};

// route to update the data that is in the database
exports.update = function (req, res) {
    // first we find the item
    contact.findOne().exec(function (err, data) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            // if successful we can then remove it
            data.remove(function (err) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                }
            });
        }
    });

    // then we can create a new one
    var i = new contact();
    i.contactName = req.body.contactName;
    i.address = req.body.address;
    i.citystatezip = req.body.citystatezip;
    i.phone = req.body.phone;
    i.fax = req.body.fax;

    // and save it into the database
    i.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(i);
        }
    });
};
