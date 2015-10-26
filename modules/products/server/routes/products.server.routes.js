'use strict';

var products = require('../controllers/products.server.controller'),
    cart = require('../controllers/cart.server.controller');

module.exports = function (app) {
    app.route('/api/cart').all(cart.cartChecker)
        .get(cart.list)
        .delete(cart.remove);

    app.route('/api/cart/:productId')
        .put(cart.update)
        .delete(cart.removeProduct);
};
