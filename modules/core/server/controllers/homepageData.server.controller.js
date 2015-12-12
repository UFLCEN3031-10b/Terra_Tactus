'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    homepageData = mongoose.model('HomepageData'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

// route to list the data
exports.find = function (req, res) {
    // should only be one in the database
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

// route for updating the data in the database
exports.update = function (req, res) {
    // should only be one, so find it
    homepageData.findOne().exec(function (err, data) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            // then we remove it
            data.remove(function (err) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                }
            });
        }
    });

    // create a new one
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

    // save it to the database
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
