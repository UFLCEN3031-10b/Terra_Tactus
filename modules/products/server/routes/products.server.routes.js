'use strict';

var products = require('../controllers/products.server.controller'),
	productspolicy = require('../policies/products.server.policy.js');


module.exports = function (app) {

	// routing for products data, needs user restriction
  app.route('/api/product/:productId').all(productspolicy.isAllowed)
    .get(products.find)
    .put(products.update);

	app.route('/api/products').all(productspolicy.isAllowed)
	  .post(products.create);


		// Finish by binding the products middleware
	  app.param('productId', products.productByID);
};
