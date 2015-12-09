'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    Product = mongoose.model('Product'),
    Announcement = mongoose.model('Announcement'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.findProd = function (req, res) {

};

exports.findAnn = function (req, res) {
    
};
