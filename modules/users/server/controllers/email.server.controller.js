'use strict';
var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));
var mongoose = require('mongoose'),
    _ = require('lodash');

var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var gfs = new Grid(mongoose.connection.db);

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: 'terratactusbot@gmail.com',
      pass: 'dentist lion wearing toupee'
  }
});
//used to log in to email account

exports.sendVReqTeacher = function(req, res){
  var data = req.body;

  transporter.sendMail({
      from: 'terratactusbot@gmail.com',
      to: 'damian.larson@yahoo.com',
      subject: 'Terra Tactus - New Verification Request',
      text: 'Hello! \n\nYou have a new verification request from ' + data.user.firstName + ' ' + data.user.lastName + '. \n\nEducational Email: ' + data.user.eduEmail + '\n\nPlease go to the website to review the information and approve or deny their request for reduced prices.'
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

exports.sendSupplements = function(req, res){
  var data = req.body;
  gfs.files.find({ filename: data.product.suppName }).toArray(function (err, files) {
    //find filestream in the database
 	    if(files.length===0){
  			return res.status(400).send({
  				message: 'File not found'
  			});
 	    }

      transporter.sendMail({
        from: 'terratactusbot@gmail.com',
        to: data.user.email,
        subject: 'Terra Tactus Educational Supplement - ' + data.product.proTitle,
        text: 'Attached is the complementary supplement that comes with your Terra Tactus Order!',
        attachments:[
          {
            filename: data.product.proTitle + ' Supplement.pdf',
            content: gfs.createReadStream({
                filename: files[0].filename
            })
            //send filestream as email attachment
          }
        ]
      });
	});

  res.json({status: "OK"});
};
