/**
 * Created by memamdie on 12/9/15.
 */
'use strict';

//Dependencies
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//Testimonial Schema

var TestimonialSchema = new Schema({
    from: {
        type: String,
        default: 'Anonymous',
        trim: true
    },
    quote: {
        type: String,
        default: '',
        trim: true,
        required: 'Quote cannot be blank'

    },
    pictureUrl: {
        type: String,
        default: '',
        trim: true
    },
    creditUrl: {
        type: String,
        default: '',
        trim: true
    }
});

mongoose.model('TestimonialData', TestimonialSchema);
