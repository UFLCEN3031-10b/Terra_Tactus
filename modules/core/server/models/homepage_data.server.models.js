'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var HomepageDataSchema = new Schema({
    aboutUsText: {
        type: String,
        default: '',
        trim: true
    },
    aboutUsImage: {
        type: String,
        default: '',
        trim: true
    },
    subscribeText: {
        type: String,
        default: '',
        trim: true
    },
    subscribeImage: {
        type: String,
        default: '',
        trim: true
    },
    individualProdText: {
        type: String,
        default: '',
        trim: true
    },
    individualProdImage: {
        type: String,
        default: '',
        trim: true
    },
    commercialText: {
        type: String,
        default: '',
        trim: true
    },
    commercialImage: {
        type: String,
        default: '',
        trim: true
    },
    retailText: {
        type: String,
        default: '',
        trim: true
    },
    retailImage: {
        type: String,
        default: '',
        trim: true
    }
});

mongoose.model('HomepageData', HomepageDataSchema);
