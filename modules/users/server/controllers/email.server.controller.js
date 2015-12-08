'use strict';
var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  mongoose = require('mongoose');

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: 'tttest1114@gmail.com',
      pass: 'Dameissogr8!'
  }
});

exports.sendVReqWholesale = function(req, res) {

    var data = req.body;

    transporter.sendMail({
        from: 'admin@terratactus.com',
        to: 'damian.larson@yahoo.com',
        subject: 'Terra Tactus - New Verification Request',
        text: 'Hello! \n\nYou have a new verification request from ' + data.user.firstName + ' ' + data.user.lastName + '. \n\nDOB: ' + data.DOB + '\n\nSSN: ' + data.SSN + '\n\nPlease go to the website to review the information and approve or deny their request for reduced prices.'
    });

    res.json(data);
};

exports.sendVReqTeacher = function(req, res){
  var data = req.body;

  transporter.sendMail({
      from: 'admin@terratactus.com',
      to: 'damian.larson@yahoo.com',
      subject: 'Terra Tactus - New Verification Request',
      text: 'Hello! \n\nYou have a new verification request from ' + data.user.firstName + ' ' + data.user.lastName + '. \n\nState: ' + data.state + '\n\nTID: ' + data.TID + '\n\nPlease go to the website to review the information and approve or deny their request for reduced prices.'
  });

  res.json(data);
};
