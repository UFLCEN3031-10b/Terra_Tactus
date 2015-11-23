/**
 * Created by memamdie on 11/23/15.
 */
'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    retailData = mongoose.model('RetailData'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.find = function (req, res) {
    retailData.findOne().exec(function (err, data) {
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
    retailData.findOne().exec(function (err, data) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            //data.remove(function (err) {
            //    if (err) {
            //        return res.status(400).send({
            //            message: errorHandler.getErrorMessage(err)
            //        });
            //    }
            //});
        }
    });

    var d = new retailData();
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
