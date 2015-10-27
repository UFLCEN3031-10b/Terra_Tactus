'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CarouselDataSchema = new Schema({
    content: {
        type: String,
        default: ''
    },
    iflink: Boolean,
    linktext: {
        type: String,
        default: ''
    },
    imglink: {
        type: String,
        default: '',
        required: 'Image link required'
    }
});

mongoose.model('CarouselData', CarouselDataSchema);
