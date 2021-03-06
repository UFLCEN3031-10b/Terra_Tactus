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
        ref: 'User',
        default: null
    },
    cart: {
        type: []
    },
    paypal_create_res: {
        type: []
    },
    paypal_get_res: {
        type: []
    },
    paypal_execute_res: {
        type: []
    },
    status: {
        type: String,
        default: 'Pending...'
    },
    description: {
        type: String,
        default: ''
    },
    total: {
        type: String,
        default: '0.00'
    },
    open: Boolean
});

mongoose.model('Order', OrderSchema);
