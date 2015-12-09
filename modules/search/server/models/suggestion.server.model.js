'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SuggestionSchema = new Schema({
    created: {
      type: Date,
      default: Date.now
    },
    firstName: {
      type: String,
      default: ''
    },
    lastName: {
      type: String,
      default: ''
    },
    emailAddress: {
      type: String,
      default: ''
    },
    subject: {
      type: String,
      enum: ['General Customer Service', 'Suggestions', 'Product Support']
    },
    message: {
      type: String,
      default: ''
    }
});

mongoose.model('Suggestion', SuggestionSchema);
