'use strict';

var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Confirmation = mongoose.model('Confirmation');


exports.add = function(req, res){
  var confirm = new Confirmation(req.body);

  confirm.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(confirm);
    }
  });
};
//add confirmation to database

exports.get = function(req, res, id){
  Confirmation.find().exec(function (err, confirms) {
      if (err) {
          return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
          });
      } else {
          res.json(confirms);
      }
  });
};
//find all of the confirmations and send them back to the client

exports.confirmByID = function(req, res, next, id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Confirmation is invalid'
        });
    }

    Confirmation.findById(id).exec(function (err, confirm) {
        if (err) {
            return next(err);
        } else if(!confirm) {
            return res.status(404).send({
                message: 'confirm ID not found'
            });
        }

        req.confirmation = confirm;
        next();
    });
};

exports.remove = function(req, res){
  var deleteConfirmation = req.confirmation;

  deleteConfirmation.remove(function (err) {
      if (err) {
          return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
          });
      } else {
          res.json(deleteConfirmation);
      }
  });
};
//delete the confirmation passed into the function

exports.updateUser = function(req, res){
  var user = req.model;

  //For security purposes only merge these parameters
  user.confirmed = req.body.confirmed;
  user.verifySent = req.body.verifySent;
  user.eduEmail = req.body.eduEmail;

  user.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(user);
  });
};
//update the user from the confirmation page

exports.userByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'User is invalid'
    });
  }

  User.findById(id, '-salt -password').exec(function (err, user) {
    if (err) {
      return next(err);
    } else if (!user) {
      return next(new Error('Failed to load user ' + id));
    }

    req.model = user;
    next();
  });
};
