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
    imageSet: {
        image: [String]
    },
    priceSet: {
        individual: {type: String, trim: true},
        wholesale : {type: String, trim: true},
        educational: {type: String, trim: true} 
    }

});

mongoose.model('Product', ProductSchema);
