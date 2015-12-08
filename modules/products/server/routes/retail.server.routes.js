/**
 * Created by memamdie on 11/23/15.
 */
'use strict';
var retailData = require('../controllers/retail.server.controller');

//Route for retail data
module.exports = function (app) {
    app.route('/api/retail/data')
        .get(retailData.find)
        .put(retailData.update);
};
