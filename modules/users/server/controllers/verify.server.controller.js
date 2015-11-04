'use strict';

var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  mongoose = require('mongoose'),
  VerificationRequest = mongoose.model('VerifyRequest');


exports.add = function(req, res){
  var vRequest = new VerificationRequest(req.body);

  vRequest.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.redirect('/');
    }
  });
};

exports.list = function(req, res){
  VerificationRequest.find().exec(function (err, vReqs) {
      if (err) {
          return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
          });
      } else {
          res.json(vReqs);
      }
  });
};
