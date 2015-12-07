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
    var sm = new socialmedia({
        linkText: req.body.linkText,
        iconLink: req.body.iconLink,
        hasIcon: (req.body.iconLink !== '')
    });

    sm.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }

        res.json(sm);
    });
};

exports.update = function (req, res) {
    if (!req.socialmedia) {
        return res.status(400).send({
            message: 'socialmedia not found'
        });
    }

    req.socialmedia.linkText = req.body.linkText;
    req.socialmedia.linkText = req.body.iconLink;
    req.socialmedia.hasIcon = (req.body.iconLink !== '');
    req.socialmedia.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }

        res.json(req.socialmedia);
    });
};

exports.delete = function (req, res) {
    if (!req.socialmedia) {
        return res.status(400).send({
            message: 'socialmedia not found'
        });
    }

    req.socialmedia.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: 'Cannot remove socialmedia'
            });
        }

        res.json({ message: 'deleted' });
    });
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
