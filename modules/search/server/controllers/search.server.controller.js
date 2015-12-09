'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    Product = mongoose.model('Product'),
    Announcement = mongoose.model('Announcement'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

// search database for products with the string
exports.findProd = function (req, res) {
    Product.find().exec(function (err, datas) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }

        // grab the search item from the query data
        var toFind = req.query.q.toLowerCase();

        // empty array to fill
        var results = [];

        // search through the data
        datas.forEach(function (data) {
            if (data.proTitle.toLowerCase().indexOf(toFind) > -1 || data.longDes.toLowerCase().indexOf(toFind) > -1 || data.shortDes.toLowerCase().indexOf(toFind) > -1) {
                results.push(data);
            }
        });
        // return the results
        res.json(results);
    });
};

// search database for announcements with the string
exports.findAnn = function (req, res) {
    Announcement.find().exec(function (err, datas) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }

        // grab the search item from the query data
        var toFind = req.query.q.toLowerCase();

        // empty array to fill
        var results = [];

        // search through the data
        datas.forEach(function (data) {
            if (data.title.toLowerCase().indexOf(toFind) > -1 || data.content.toLowerCase().indexOf(toFind) > -1 || data.username.toLowerCase().indexOf(toFind) > -1) {
                results.push(data);
            }
        });
        // return the results
        res.json(results);
    });
};
