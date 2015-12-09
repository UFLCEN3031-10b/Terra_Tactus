'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    testimonialData = mongoose.model('TestimonialData'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.find = function (req, res) {
    testimonialData.findOne().exec(function (err, data) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(data);
        }
    });
};

exports.update = function (req, res) {
    testimonialData.findOne().exec(function (err, data) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            data.remove(function (err) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                }
            });
        }
    });

    var d = new testimonialData();
    d.pictureUrl = req.body.pictureUrl;
    d.quote = req.body.quote;
    d.description = req.body.description;

    d.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(d);
        }
    });
};
