'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    CarouselData = mongoose.model('CarouselData'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.create = function (req, res) {
    var datas = new CarouselData(req.body);

    datas.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(datas);
        }
    });
};

exports.find = function (req, res) {
    CarouselData.find().exec(function (err, datas) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(datas);
        }
    });
};

exports.update = function (req, res) {
    var datas = req.carouseldata;

    datas.content = req.body.content;
    datas.iflink = req.body.iflink;
    datas.linktext = req.body.linktext;
    datas.imglink = req.body.imglink;

    datas.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(datas);
        }
    });
};

exports.remove = function (req, res) {
    var datas = req.carouseldata;

    datas.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(datas);
        }
    });
};
