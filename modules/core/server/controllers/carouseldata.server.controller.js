'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    CarouselData = mongoose.model('CarouselData'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

// route for creating a new slide
exports.create = function (req, res) {
    var datas = new CarouselData(req.body);

    // save data to the database, return data
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

// route for listing all of the slides
exports.list = function (req, res) {
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

// route for updating an individual slide
exports.update = function (req, res) {
    var datas = req.carouseldata;

    // update data
    datas.content = req.body.content;
    datas.iflink = req.body.iflink;
    datas.linktext = req.body.linktext;
    datas.imglink = req.body.imglink;

    // save to database
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

// removes the given slide
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

// middleware for attaching a slide based on id
exports.slideById = function(req, res, next, id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Slide is invalid'
        });
    }

    CarouselData.findById(id).exec(function (err, slide) {
        if (err) {
            return next(err);
        } else if(!slide) {
            return res.status(404).send({
                message: 'Slide ID not found'
            });
        }

        req.carouseldata = slide;
        next();
    });
};
