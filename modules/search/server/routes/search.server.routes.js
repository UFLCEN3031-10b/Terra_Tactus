'use strict';

var search = require('../controllers/search.server.controller.js');
var suggestion = require('../controllers/suggestion.server.controller.js');
var suggestionpolicy = require('../policies/suggestion.server.policy.js');

module.exports = function (app) {
    // route for searching products
    app.route('/api/search/products')
        .get(search.findProd);

    // route for searching announcements
    app.route('/api/search/announcements')
        .get(search.findAnn);

    //route for submitting a suggestion
    app.route('/api/suggestion').all(suggestionpolicy.isAllowed)
        .post(suggestion.submitSuggestion);

    app.route('/api/admin/suggestion').all(suggestionpolicy.isAllowed)
        .get(suggestion.list)
        .delete(suggestion.delete);

};
