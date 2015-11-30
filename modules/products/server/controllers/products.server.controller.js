'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    products = mongoose.model('Product'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.find = function (req, res) {
  res.json(req.product);
};

exports.update = function (req, res) {
    var d = req.product;
    d.proType = req.body.proType;
    d.proTitle = req.body.proTitle;
    d.longDes = req.body.longDes;
    d.shortDes = req.body.shortDes;
    d.imageUrl = req.body.imageUrl;
    d.imageOne = req.body.imageOne;
    d.imageTwo = req.body.imageTwo;
    d.imageThree = req.body.imageThree;
    d.imageFour = req.body.imageFour;
    d.indvPrice = req.body.indvPrice;
    d.eduPrice = req.body.eduPrice;
    d.wholePrice = req.body.wholePrice;
    d.teacher = req.body.teacher;
    d.features = req.body.features;
    d.reviews = req.body.reviews;
    d.rating = req.body.rating;
    d.numberVerified = req.body.numberVerified;

    d.save(function (err) {
        if (err) {
          console.log(d);
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(d);
        }
    });
};

exports.productByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Product is invalid'
    });
  }

  products.findById(id).exec(function (err, product) {
    if (err) {
      return next(err);
    } else if (!product) {
      return res.status(404).send({
        message: 'No product with that identifier has been found'
      });
    }
    req.product = product;
    next();
  });
};


  exports.create = function (req, res) {
    var d = new products();
    d.proType = req.body.proType;
    d.proTitle = req.body.proTitle;
    d.longDes = req.body.longDes;
    d.shortDes = req.body.shortDes;
    d.imageUrl = req.body.imageUrl;
    d.imageOne = req.body.imageOne;
    d.imageTwo = req.body.imageTwo;
    d.imageThree = req.body.imageThree;
    d.imageFour = req.body.imageFour;
    d.indvPrice = req.body.indvPrice;
    d.eduPrice = req.body.eduPrice;
    d.wholePrice = req.body.wholePrice;
    d.teacher = req.body.teacher;
    d.features = req.body.features;

    d.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(d);
        }
    });
  };


  exports.list = function (req, res) {
    products.find().sort('-created').exec(function (err, productlist) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(productlist);
      }
    });
  };

  exports.delete = function (req, res) {
    var d_product = req.product;

    d_product.remove(function (err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(d_product);
      }
    });
  };
