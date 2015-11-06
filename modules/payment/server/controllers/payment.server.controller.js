'use strict';

var paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox',
    'client_id': 'not_a_real_id',
    'client_secret': 'b67779a017ab6aeb6adb5666040b0469'
});

exports.openOrder = function (req, res) {};
