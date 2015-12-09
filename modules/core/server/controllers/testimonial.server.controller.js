'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    testimonials = mongoose.model('TestimonialData'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

//Fins testimonials
exports.find = function (req, res) {
    res.json(req.testimonial);
};

//Update an existing testimonial
exports.update = function (req, res) {
    var d = req.testimonial;
    d.quote = req.body.quote;
    d.from = req.body.from;
    d.pictureUrl = req.body.pictureUrl;
    d.creditUrl = req.body.creditUrl;

    d.save(function (err) {
        if (err) {
            console.log(d);
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(d);
        }
    });
};

//Create a new testimonial
exports.create = function (req, res) {
    var d = new testimonials();
    d.quote = req.body.quote;
    d.from = req.body.from;
    d.pictureUrl = req.body.pictureUrl;
    d.creditUrl = req.body.creditUrl;

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

//List out all the testimonials
exports.list = function (req, res) {
    testimonials.find().sort('-created').exec(function (err, testimonialList) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(testimonialList);
        }
    });
};

//Add the ability to delete testimonials that are no longer wanted
exports.delete = function (req, res) {
    var d_testimonial = req.testimonial;

    d_testimonial.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(d_testimonial);
        }
    });
};
