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

var filler_text = 'Lorem ipsum dolor sit amet, ei pri suas inimicus volutpat. Malis ornatus te his, laudem libris euismod ex his. Ne eum errem scripta nusquam, tale mucius everti cum ne. Ea aliquando instructior mel, ad mei alii erat rebum. His fastidii eligendi adversarium ei, ex sea aeque semper fierent, vim wisi accusam cu. Veniam aliquip invidunt ea pri. Per omnes qualisque ad, pri at dicam everti, et liber dignissim quaerendum sit. At impetus denique convenire has. Cu ludus dolores rationibus mel, idque maluisset cum at, per ex illud primis. Has probo concludaturque id.';

db.once('open', function () {
    console.log('[+] Connected to database.\n[*] Generating data.');
    var nd = new homepageData();
    nd.aboutUsText = filler_text;
    nd.aboutUsImage = 'http://rock100diz.com/wp-content/uploads/2015/04/galets-5.jpg';
    nd.subscribeText = filler_text;
    nd.subscribeImage = 'http://rock100diz.com/wp-content/uploads/2015/04/galets-5.jpg';
    nd.individualProdText = filler_text;
    nd.individualProdImage = 'http://rock100diz.com/wp-content/uploads/2015/04/galets-5.jpg';

    nd.save(function (err) {
        if (err) {
            console.log('[-] Failed to save data.');
        } else {
            console.log('[+] Data saved.');
        }
    });
});
