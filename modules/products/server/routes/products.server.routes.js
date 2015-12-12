'use strict';

var products = require('../controllers/products.server.controller'),
    cart = require('../controllers/cart.server.controller'),
	productspolicy = require('../policies/products.server.policy.js');

module.exports = function (app) {
    // routes for getting the cart and removing the entire
    // cart at once
    app.route('/api/cart').all(cart.cartChecker)
        .get(cart.list)
        .delete(cart.remove);

    // routes for adding an individual product, updating the
    // quantity, or removing the product
    app.route('/api/cart/product/:productId').all(cart.cartChecker)
        .post(cart.add)
        .put(cart.update)
        .delete(cart.removeProduct);

    // route to get the cart length, used by the header
    app.route('/api/cart/length').all(cart.cartChecker)
        .get(cart.getLength);

    // routing for products data, needs user restriction
    app.route('/api/products/:productId').all(productspolicy.isAllowed)
        .get(products.find)
        .put(products.update)
        .delete(products.delete);

    app.route('/api/reviews/products/:productId').all(productspolicy.isAllowed)
        .put(products.submitReview);

    app.route('/api/products').all(productspolicy.isAllowed)
        .post(products.create)
        .get(products.list);

    // Finish by binding the products middleware
    app.param('productId', products.productByID);
};
