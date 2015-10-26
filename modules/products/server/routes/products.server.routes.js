'use strict';

var products = require('../controllers/products.server.controller'),
    cart = require('../controllers/cart.server.controller');

module.exports = function (app) {
    app.route('/api/cart').all(cart.cartChecker)
        .get(cart.list)
        .delete(cart.remove);

    app.route('/api/cart/:productId').all(cart.cartChecker)
        .put(cart.update)
        .delete(cart.removeProduct);

    app.route('/api/cart/length').all(cart.cartChecker)
        .get(cart.getLength);
};
