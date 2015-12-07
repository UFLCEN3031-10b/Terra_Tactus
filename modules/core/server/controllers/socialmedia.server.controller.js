'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    socialmedia = mongoose.model('SocialMedia'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.find = function (req, res) {
    socialmedia.find().exec(function (err, info) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(info);
        }
    });
};

exports.add = function (req, res) {

};

exports.update = function (req, res) {

};

exports.delete = function (req, res) {

};

exports.smById = function (req, res, next, id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Socialmedia id is invalid'
        });
    }

    socialmedia.findById(id).exec(function (err, sm) {
        if (err) {
            return next(err);
        } else if (!sm) {
            return res.status(400).send({
                message: 'Socialmedia not found'
            });
        } else {
            req.socialmedia = sm;
            next();
        }
    });
};
