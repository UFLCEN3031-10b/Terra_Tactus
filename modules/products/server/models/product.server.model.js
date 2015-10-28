'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        required: 'Product must have a name'
    },
    longDesc: {
        type: String,
        default: '',
        required: 'Product must have a description'
    },
    shortDesc: {
        type: String,
        default: ''
    },
    imageUrl: {
        type: String,
        default: '',
        trim: true
    }
});

mongoose.model('Product', ProductSchema);
