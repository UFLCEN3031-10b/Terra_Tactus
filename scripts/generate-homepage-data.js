'use strict';

console.log('[*] Beginning homepage data generation.');

var path = require('path'),
    mongoose = require('mongoose'),
    hd = require(path.resolve('./modules/core/server/models/homepage_data.server.models.js')),
    homepageData = mongoose.model('HomepageData');

console.log('[*] Connecting to database.');

mongoose.connect('mongodb://cen3031:c075d4a58daf9601d1907db40098e1a9@ds045622.mongolab.com:45622/terratactus');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    console.log('[+] Connected to database.\n[*] Generating data.');
    var nd = new homepageData();
    nd.aboutUs = 'Test Data.';

    nd.save(function (err) {
        if (err) {
            console.log('[-] Failed to save data.');
        } else {
            console.log('[+] Data saved.');
        }
    });
});
