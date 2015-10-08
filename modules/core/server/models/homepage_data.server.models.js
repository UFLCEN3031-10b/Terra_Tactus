'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var HomepageDataSchema = new Schema({
    aboutUs: {
        type: String,
        default: '',
        trim: true
    }
});

mongoose.model('HomepageData', HomepageDataSchema);
