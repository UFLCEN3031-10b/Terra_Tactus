'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Announcement = mongoose.model('Announcement'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a announcement
 */
exports.create = function (req, res) {
  var announcement = new Announcement(req.body);
  announcement.user = req.user;

  announcement.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(announcement);
    }
  });
};

/**
 * Show the current announcement
 */
exports.read = function (req, res) {
  res.json(req.announcement);
};

/**
 * Update a announcement
 */
exports.update = function (req, res) {
  var announcement = req.announcement;

  announcement.title = req.body.title;
  announcement.username = req.body.username;
  announcement.content = req.body.content;

  announcement.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(announcement);
    }
  });
};

/**
 * Delete an announcement
 */
exports.delete = function (req, res) {
  var announcement = req.announcement;

  announcement.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(announcement);
    }
  });
};

/**
 * List of Announcements
 */
exports.list = function (req, res) {
  Announcement.find().sort('-created').populate('user', 'displayName').exec(function (err, announcements) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(announcements);
    }
  });
};

/**
 * Announcement middleware
 */
exports.announcementByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Announcement is invalid'
    });
  }

  Announcement.findById(id).populate('user', 'displayName').exec(function (err, announcement) {
    if (err) {
      return next(err);
    } else if (!announcement) {
      return res.status(404).send({
        message: 'No announcement with that identifier has been found'
      });
    }
    req.announcement = announcement;
    next();
  });
};
