'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    socialmedia = mongoose.model('SocialMedia'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.find = function (req, res) {
    socialmedia.findOne().exec(function (err, info) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(info);
        }
    });
};

exports.update = function (req, res) {
    var i = req.socialmedia;
    i.facebook = req.body.facebook;
    i.twitter = req.body.twitter;
    i.linkedin = req.body.linkedin;
    i.googleplus = req.body.googleplus;

    i.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(i);
        }
    });
};
