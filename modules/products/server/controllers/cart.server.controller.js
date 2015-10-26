'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.cartChecker = function (req, res, next) {
    if (!req.session.cart) {
        req.session.cart = [{
            product: {
                _id: '1',
                title: 'test',
                imageUrl: 'http://1.bp.blogspot.com/-QuICtWHygN0/UoAlMMR9UNI/AAAAAAABYfc/rfcld52y97M/s1600/Gaineville+Trip+136.JPG',
                priceSet: {
                    individual: '1.00',
                    wholesale: '0.50',
                    educational: '2.00'
                }
            },
            quantity: 2
        }, {
            product: {
                _id: '2',
                title: 'test2',
                imageUrl: 'http://www.gatortailgating.com/files/imagecache/gt7_full_580/mike/2012/03/gators-usf.jpg',
                priceSet: {
                    individual: '2.00',
                    wholesale: '1.00',
                    educational: '4.00'
                }
            },
            quantity: 1
        }];
    }

    next();
};

exports.list = function (req, res) {
    res.json(req.session.cart);
};

exports.remove = function (req, res) {
    req.session.cart = [];
    res.json(req.session.cart);
};

exports.update = function (req, res) {
    req.session.cart.push({
        product: req.product,
        quantity: req.body.quantity
    });

    res.json(req.session.cart);
};

exports.removeProduct = function (req, res) {
    var index = req.session.cart.indexOf(req.body.toRemove);
    req.session.cart.splice(index, 1);

    res.json(req.session.cart);
};

exports.getLength = function (req, res) {
    res.json({
        length: req.session.cart.length
    });
};
