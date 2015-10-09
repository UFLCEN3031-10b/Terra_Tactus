'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    contact = mongoose.model('Contact'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.find = function (req, res) {
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

exports.update = function (req, res) {
    var i = req.contact;
    i.name = req.body.name;
    i.address = req.body.address;
    i.citystatezip = req.body.citystatezip;
    i.phone = req.body.phone;
    i.fax = req.body.fax;

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
