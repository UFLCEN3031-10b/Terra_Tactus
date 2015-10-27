'use strict';

var products = require('../controllers/products.server.controller'),
    cart = require('../controllers/cart.server.controller'),
	productspolicy = require('../policies/products.server.policy.js');

module.exports = function (app) {
    app.route('/api/cart').all(cart.cartChecker)
        .get(cart.list)
        .delete(cart.remove);

    app.route('/api/cart/:productId').all(cart.cartChecker)
        .put(cart.update)
        .delete(cart.removeProduct);

    app.route('/api/cart/length').all(cart.cartChecker)
        .get(cart.getLength);

    // routing for products data, needs user restriction
    app.route('/api/product/:productId').all(productspolicy.isAllowed)
        .get(products.find)
        .put(products.update);

    app.route('/api/products').all(productspolicy.isAllowed)
        .post(products.create);


    // Finish by binding the products middleware
    app.param('productId', products.productByID);
};
