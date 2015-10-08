'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    homepageData = mongoose.model('HomepageData'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.find = function (req, res) {
    homepageData.findOne().exec(function (err, data) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(data);
        }
    });
};

exports.create = function (req, res) {
    var nd = new homepageData();
    nd.aboutUs = 'Testing...';

    nd.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(nd);
        }
    });
};

exports.update = function (req, res) {
    var d = req.data;
    d.aboutUs = req.body.aboutUs;

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
