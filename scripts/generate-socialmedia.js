'use strict';

console.log('[*] Beginning contact generation.');

var path = require('path'),
    mongoose = require('mongoose'),
    c = require(path.resolve('./modules/core/server/models/socialmedia.server.models.js')),
    socialmedia = mongoose.model('SocialMedia');

console.log('[*] Connecting to database.');

mongoose.connect('mongodb://cen3031:c075d4a58daf9601d1907db40098e1a9@ds045622.mongolab.com:45622/terratactus');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    console.log('[+] Connected to database.\n[*] Generating data.');
    var c = new socialmedia();
    c.facebook = '';
    c.twitter = '';
    c.linkedin = '';
    c.googleplus = '';

    c.save(function (err) {
        if (err) {
            console.log('[-] Failed to save data.');
        } else {
            console.log('[+] Data saved.');
        }
    });
});
