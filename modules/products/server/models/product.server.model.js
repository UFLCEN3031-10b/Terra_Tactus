'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductSchema = new Schema({
    proType: Boolean,
    proTitle: {
        type: String,
        default: '',
        required: 'Product must have a name'
    },
    longDes: {
        type: String,
        default: '',
        required: 'Product must have a description'
    },
    shortDes: {
        type: String,
        default: ''
    },
    imageUrl: {
        type: String,
        default: '',
        trim: true
    },
    imageOne: {
        type: String,
        default: '',
        trim: true
    },
    imageTwo: {
        type: String,
        default: '',
        trim: true
    },
    imageThree: {
        type: String,
        default: '',
        trim: true
    },
    imageFour: {
        type: String,
        default: '',
        trim: true
    },
    indvPrice: {
        type: String,
        default: '',
        trim: true
    },
    eduPrice: {
        type: String,
        default: '',
        trim: true
    },
    wholePrice: {
        type: String,
        default: '',
        trim: true
    },
    teacher: {
        type: Boolean,
        default: false,
        trim: true
    }


});

mongoose.model('Product', ProductSchema);
