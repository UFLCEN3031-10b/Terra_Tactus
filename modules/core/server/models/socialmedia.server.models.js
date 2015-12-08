'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SocialMediaSchema = new Schema({
    linkText: {
        type: String,
        required: 'Must provide a link',
        trim: true
    },
    iconLink: {
        type: String,
        trim: true,
        default: ''
    },
    hasIcon: {
        type: Boolean,
        default: false
    }
});

mongoose.model('SocialMedia', SocialMediaSchema);
