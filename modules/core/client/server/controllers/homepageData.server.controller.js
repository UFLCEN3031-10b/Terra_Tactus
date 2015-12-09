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

exports.update = function (req, res) {
    homepageData.findOne().exec(function (err, data) {
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

    var d = new homepageData();
    d.aboutUsText = req.body.aboutUsText;
    d.aboutUsImage = req.body.aboutUsImage;
    d.subscribeText = req.body.subscribeText;
    d.subscribeImage = req.body.subscribeImage;
    d.individualProdText = req.body.individualProdText;
    d.individualProdImage = req.body.individualProdImage;
    d.commercialText = req.body.commercialText;
    d.commercialImage = req.body.commercialImage;
    d.retailText = req.body.retailText;
    d.retailImage = req.body.retailImage;

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
