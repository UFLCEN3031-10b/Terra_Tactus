'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SocialMediaSchema = new Schema({
    facebook: {
        type: String
    },
    twitter: {
        type: String
    },
    linkedin: {
        type: String
    },
    googleplus: {
        type: String
    }
});

mongoose.model('SocialMedia', SocialMediaSchema);
