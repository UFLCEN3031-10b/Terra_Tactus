'use strict';

console.log('[*] Beginning contact generation.');

var path = require('path'),
    mongoose = require('mongoose'),
    c = require(path.resolve('./modules/core/server/models/contact.server.models.js')),
    contact = mongoose.model('Contact');

console.log('[*] Connecting to database.');

mongoose.connect('mongodb://cen3031:c075d4a58daf9601d1907db40098e1a9@ds045622.mongolab.com:45622/terratactus');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    console.log('[+] Connected to database.\n[*] Generating data.');
    var c = new contact();
    c.contactName = 'Terra Tactus';
    c.address = '1 Address Street';
    c.citystatezip = 'Gainesville, Fla. 32603';
    c.phone = '(123) 456-7890';
    c.fax = '(123) 456-7891';

    c.save(function (err) {
        if (err) {
            console.log('[-] Failed to save data.');
        } else {
            console.log('[+] Data saved.');
        }
    });
});
