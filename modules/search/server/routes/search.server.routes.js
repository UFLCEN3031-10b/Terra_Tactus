'use strict';

var search = require('../controllers/search.server.controller.js');

module.exports = function (app) {
    // route for searching products
    app.route('/api/search/products')
        .get(search.findProd);

    // route for searching announcements
    app.route('/api/search/announcements')
        .get(search.findAnn);
};
