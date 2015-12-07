'use strict';

var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  mongoose = require('mongoose'),
  Confirmation = mongoose.model('Confirmation');


exports.add = function(req, res){
  var confirm = new Confirmation(req.body);

  confirm.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.redirect('/');
    }
  });
};

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
