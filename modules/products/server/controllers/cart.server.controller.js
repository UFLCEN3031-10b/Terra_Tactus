'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

// middleware to ensure that a cart is always present
exports.cartChecker = function (req, res, next) {
    if (!req.session.cart) {
        req.session.cart = [];
    }

    next();
};

// send cart as a json object
exports.list = function (req, res) {
    res.json(req.session.cart);
};

// resets cart to an empty array
// sends the empty array back
exports.remove = function (req, res) {
    req.session.cart = [];
    res.json(req.session.cart);
};

// route to update an item in the cart
exports.update = function (req, res) {
    // if the cart is empty, return error
    if (!req.session.cart) {
        return res.status(400).send({
            message: 'no items in cart'
        });
    }

    // quantity can't be undefined or 0
    if (!req.body.quantity || req.body.quantity === "0") {
        return res.status(400).send({
            message: 'invalid quantity'
        });
    }

    // find the product
    var ind = -1;
    req.session.cart.forEach(function (pw, i) {
        if (String(req.product._id) === pw.product._id) {
            ind = i;
        }
    });

    if (ind === -1) { // item not found
        return res.status(400).send({
            message: 'Item not in cart'
        });
    } else {
        // return the new cart after updating the quantity
        req.session.cart[ind].quantity = req.body.quantity;
        res.json(req.session.cart);
    }
};

// route to add a product to the cart
exports.add = function (req, res) {
    // check if the product is already in the cart as we don't
    // want to add it again
    var alreadyInCart = false;
    req.session.cart.forEach(function (pw) {
        if (String(req.product._id) === pw.product._id) {
            alreadyInCart = true;
        }
    });

    if (alreadyInCart) {
        // return an error
        return res.status(400).send({
            message: errorHandler.getErrorMessage('Item already in cart')
        });
    } else if (req.body.quantity === "0" || !req.body.quantity) {
        // also need to check that quantity is defined and not 0
        return res.status(400).send({
            message: 'quantity cannot be 0'
        });
    } else {
        // otherwise we can add it to the cart and return the new cart
        req.session.cart.push({
            product: req.product,
            quantity: req.body.quantity
        });

        res.json(req.session.cart);
    }
};

// route to remove a product from the cart
exports.removeProduct = function (req, res) {
    // find the product in the cart
    var index = -1;
    req.session.cart.forEach(function (prodWrap, i) {
        if (String(req.product._id) === prodWrap.product._id) {
            index = i;
        }
    });

    // error if the product isn't found
    if (index === -1) {
        return res.status(400).send({
            message: errorHandler.getErrorMessage('Cannot remove product from cart')
        });
    }

    // remove it
    req.session.cart.splice(index, 1);

    // return the new cart
    res.json(req.session.cart);
};

// route for getting the length of the current cart
// used by the header
exports.getLength = function (req, res) {
    res.json({
        length: req.session.cart.length
    });
};
