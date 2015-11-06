'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OrderSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        default: null
    },
    cart: {
        type: []
    },
    paypal_create_res: {
        type: []
    }
});

mongoose.model('Order', OrderSchema);
