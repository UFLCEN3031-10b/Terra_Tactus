'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    Suggestion = mongoose.model('Suggestion'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

//submit a suggestion to the DB
exports.submitSuggestion = function (req, res) {
  console.log(req.body);
  var d = new Suggestion();
  d.firstName = req.body.firstName;
  d.lastName = req.body.lastName;
  d.emailAddress = req.body.emailAddress;
  d.subject = req.body.subject;
  d.message = req.body.message;

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

exports.suggestionByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Suggestion is invalid'
    });
  }

  Suggestion.findById(id).exec(function (err, suggestion) {
    if (err) {
      return next(err);
    } else if (!suggestion) {
      return res.status(404).send({
        message: 'No suggestion with that identifier has been found'
      });
    }
    req.suggestion = suggestion;
    next();
  });
};

exports.list = function (req, res) {
  Suggestion.find().sort('-created').exec(function (err, suggestionlist) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(suggestionlist);
    }
  });
};

exports.delete = function (req, res) {
  var d_suggestion = req.suggestion;
  d_suggestion.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(d_suggestion);
    }
  });
};
