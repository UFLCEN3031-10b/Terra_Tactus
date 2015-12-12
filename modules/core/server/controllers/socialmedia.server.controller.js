'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    socialmedia = mongoose.model('SocialMedia'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

// route for listing the social media links
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

// add an individual link to the social media list
exports.add = function (req, res) {
    // create a new object
    var sm = new socialmedia({
        linkText: req.body.linkText,
        iconLink: req.body.iconLink,
        hasIcon: (req.body.iconLink !== '')
    });

    // save it to the database
    sm.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }

        res.json(sm);
    });
};

// route to update the social media link in the database
exports.update = function (req, res) {
    if (!req.socialmedia) {
        return res.status(400).send({
            message: 'socialmedia not found'
        });
    }

    // if it was found, update the values
    req.socialmedia.linkText = req.body.linkText;
    req.socialmedia.iconLink = req.body.iconLink;
    req.socialmedia.hasIcon = (req.body.iconLink !== '');

    // save it back into the database
    req.socialmedia.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }

        res.json(req.socialmedia);
    });
};

// route to delete the given link from the database
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

// middleware to find the social media link by id
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
