'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ContactSchema = new Schema({
    contactName: {
        type: String
    },
    address: {
        type: String
    },
    citystatezip: {
        type: String
    },
    phone: {
        type: String
    },
    fax: {
        type: String
    }
});

mongoose.model('Contact', ContactSchema);
