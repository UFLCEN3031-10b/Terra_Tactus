'use strict';

var products = require('../controllers/products.server.controller'),
	productspolicy = require('../policies/products.server.policy.js');


module.exports = function (app) {

/*	// routing for products data, needs user restriction
  app.route('/api/products/data').all(productspolicy.isAllowed)
    .get(products.find)
    .put(products.update);
*/

};
