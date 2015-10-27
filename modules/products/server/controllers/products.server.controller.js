'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    products = mongoose.model('Product'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.find = function (req, res) {
    products.findOne().exec(function (err, data) {
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
    products.findOne().exec(function (err, data) {
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

    var d = new products();
    d.proType = req.body.proType;
    d.proTitle = req.body.proTitle;
    d.longDes = req.body.longDes;
    d.shortDes = req.body.shortDes;
    d.imageUrl = req.body.imageUrl;
    d.imageSet = req.body.imageSet;
  d.priceSet = req.body.priceSet;

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
