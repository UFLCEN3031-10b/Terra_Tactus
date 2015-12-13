'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    testimonials = mongoose.model('Testimonial'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.find = function (req, res) {
    res.json(req.testimonial);
};

exports.testimonialByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Product is invalid'
    });
  }

  testimonials.findById(id).exec(function (err, testimonial) {
    if (err) {
      return next(err);
    } else if (!testimonial) {
      return res.status(404).send({
        message: 'No testimonial with that identifier has been found'
      });
    }
    req.testimonial = testimonial;
    next();
  });
};

exports.update = function (req, res) {
    var d = req.testimonial;
    d.from = req.body.from;
    d.quote = req.body.quote;
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


exports.create = function (req, res) {
    var d = new testimonials();
    d.from = req.body.from;
    d.quote = req.body.quote;
    d.pictureUrl = req.body.pictureUrl;
    d.creditUrl = req.body.creditUrl;
    console.log('Entering create function');

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
