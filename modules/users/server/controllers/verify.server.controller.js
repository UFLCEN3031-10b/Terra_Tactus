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

exports.remove = function(req, res){
  var deleteVReq = req.vRequest;

  deleteVReq.remove(function (err) {
      if (err) {
          return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
          });
      } else {
          res.json(deleteVReq);
      }
  });
};

exports.update = function(req, res){
  var request = req.vRequest;

  //For security purposes only merge these parameters
  request.validRequest = req.body.validRequest;

  request.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(request);
  });
};

exports.vReqByID = function(req, res, next, id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'VReq is invalid'
        });
    }

    VerificationRequest.findById(id).exec(function (err, vReq) {
        if (err) {
            return next(err);
        } else if(!vReq) {
            return res.status(404).send({
                message: 'vReq ID not found'
            });
        }

        req.vRequest = vReq;
        next();
    });
};
