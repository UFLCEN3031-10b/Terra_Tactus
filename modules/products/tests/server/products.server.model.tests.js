'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Product = mongoose.model('Product');

/**
 * Globals
 */
var user, product;

/**
 * Unit tests
 */
describe('Product Model Unit Tests:', function () {
  beforeEach(function (done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      roles: {
        type: ['admin']
      },
      password: 'M3@n.jsI$Aw3$0m3'
    });

    user.save(function () {
      product = new Product({
        proTitle: 'test product',
        shortDes: 'description',
        longDes: 'long description',
        indvPrice: '1.00',
        eduPrice: '2.00',
        wholePrice: '3.00'
      });

      done();
    });
  });

  describe('Method Save', function () {
    it('should be able to save a product without problems', function (done) {
      this.timeout(10000);
      return product.save(function (err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save product without title', function (done) {
      product.proTitle = '';

      return product.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save product without short description', function (done) {
      product.shortDes = '';

      return product.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save product without long description', function (done) {
      product.longDes = '';

      return product.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save product without individual price', function (done) {
      product.indvPrice = '';

      return product.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save product without educational price', function (done) {
      product.eduPrice = '';

      return product.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save product without wholesale price', function (done) {
      product.wholePrice = '';

      return product.save(function (err) {
        should.exist(err);
        done();
      });
    });



  });

  afterEach(function (done) {
    Product.remove().exec(function () {
      User.remove().exec(done);
    });
  });
});
