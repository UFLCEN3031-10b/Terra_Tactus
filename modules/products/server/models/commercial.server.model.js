/**
 * Created by memamdie on 11/23/15.
 */
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//Things that are editable on the Commercial Page
var CommercialSchema = new Schema({
    pictureUrl: {
        type: String
    },
    quote: {
        type: String
    },
    description: {
        type: String
    }
});

mongoose.model('CommercialData', CommercialSchema);
