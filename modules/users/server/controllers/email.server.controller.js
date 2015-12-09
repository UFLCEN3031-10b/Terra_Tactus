'use strict';
var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  mongoose = require('mongoose');

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: 'terratactusbot@gmail.com',
      pass: //ASK DAME FOR IT
  }
});
//used to log in to email account

exports.sendVReqTeacher = function(req, res){
  var data = req.body;

  transporter.sendMail({
      from: 'terratactusbot@gmail.com',
      to: 'damian.larson@yahoo.com',
      subject: 'Terra Tactus - New Verification Request',
      text: 'Hello! \n\nYou have a new verification request from ' + data.user.firstName + ' ' + data.user.lastName + '. \n\nState: ' + data.state + '\n\nTID: ' + data.TID + '\n\nPlease go to the website to review the information and approve or deny their request for reduced prices.'
  });

  res.json(data);
};
//email sent to admin stating that an educator is trying to sign up

exports.sendConfirmation = function(req, res){
  var data = req.body;

  transporter.sendMail({
    from: 'terratactusbot@gmail.com',
    to: data.user[0].email,
    subject: 'Verify Your Terra Tactus Account!',
    text: 'Thank you for registering for Terra Tactus. \n\nPlease paste the link below into your browser to confirm your account.\n\nlocalhost:3000/confirmation/' + data._id
  });

  res.json(data);
};
//email sent to confirm email accounts

exports.sendEduConfirmation = function(req, res){
  var data = req.body;

  transporter.sendMail({
    from: 'terratactusbot@gmail.com',
    to: data.user[0].eduEmail,
    subject: 'Verify Your Terra Tactus Account!',
    text: 'Thank you for providing us with your educational email.\n\nPlease paste the link below into your browser to confirm that this is a real email account.\n\nlocalhost:3000/verify/' + data._id
  });

  res.json(data);
};
//email sent to confirm .edu email accounts that !== the account email
exports.sendUploadedFiles = function(req, res){
  var user = req.user;

  transporter.sendMail({
    from: 'terratactusbot@gmail.com',
    to: 'damian.larson@yahoo.com',
    subject: 'Terra Tactus Wholesaler ' + user.firstName + ' ' + user.lastName + ' Information',
    text: 'A Wholesaler is attempting to sign up for Terra Tactus. \n\nAttached is their Tax Information in PDF Form.',
    attachments:[
      {
        filename: user.firstName + ' ' + user.lastName + ' Tax Info.pdf',
        content: req.files.file.buffer
      }
    ]
  });

  res.json(user);
};
//send uploaded pdf files to admin
