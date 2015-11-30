/**
 * Created by memamdie on 11/23/15.
 */
'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    subscriptionData = mongoose.model('SubscriptionData'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.find = function (req, res) {
    subscriptionData.findOne().exec(function (err, data) {
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
    subscriptionData.findOne().exec(function (err, data) {
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

    var d = new subscriptionData();
    d.pictureUrl = req.body.pictureUrl;
    d.quote = req.body.quote;
    d.description = req.body.description;
    d.grabber = req.body.grabber;

    d.typeOne = req.body.typeOne;
    d.typeOneData = req.body.typeOneData;
    d.typeTwo = req.body.typeTwo;
    d.typeTwoData = req.body.typeTwoData;

    d.modelOne = req.body.modelOne;
    d.modelOneBtn = req.body.modelOneBtn;
    d.modelOneDesc = req.body.modelOneDesc;
    d.modelOnePrice = req.body.modelOnePrice;

    d.modelTwo = req.body.modelTwo;
    d.modelTwoBtn = req.body.modelTwoBtn;
    d.modelTwoDesc = req.body.modelTwoDesc;
    d.modelTwoPrice = req.body.modelTwoPrice;

    d.modelThree = req.body.modelThree;
    d.modelThreeBtn = req.body.modelThreeBtn;
    d.modelThreeDesc = req.body.modelThreeDesc;
    d.modelThreePrice = req.body.modelThreePrice;

    console.log(d);

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
