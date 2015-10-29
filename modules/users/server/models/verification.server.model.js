'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var verificationRequest = new Schema({
  validRequest: {
    type: Boolean,
    default: false
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  }
});
