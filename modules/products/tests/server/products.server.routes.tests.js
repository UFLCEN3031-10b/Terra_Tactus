'use strict';

var should = require('should'),
    request = require('supertest'),
    path = require('path'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Product = mongoose.model('Product'),
    express = require(path.resolve('./config/lib/express'));

var app, agent, credentials, user, product;

describe('Product CRUD tests', function () {
    //Before running any tests do this stuff
    before(function (done) {
        app = express.init(mongoose);
        agent = request.agent(app);
        done();
    });
    //Before each test do this stuff
    beforeEach(function (done) {
        credentials = {
            username: 'Admin4tests',
            password: 'M3@n.jsI$Aw3$0m3'
        };
        user = new User({
            firstName: 'Admin',
            lastName: 'Test',
            displayName: 'firstName lastName',
            email: 'test@me.com',
            username: credentials.username,
            password: credentials.password,
            roles: ['admin'],
            provider: 'local'
        });

        product = new Product({
            proTitle: 'test product',
            longDes: 'long description',
            shortDes: 'description',
            indvPrice: '1.00',
            eduPrice: '2.00',
            wholePrice: '3.00'
        });

        user.save(function() {
            done();
        });

    });

    //Test # 1 to see if you can access the products when not signed in
    it('Should attempt to access products without being signed in', function(done){
        agent.get('/api/products')
            .expect(200)
            .end(done);
    });

    //Test # 2 to see if you can get a list of products when not signed in
    it('should be able to get a list of products if not signed in', function (done) {
      // Create new product model instance
      var productObj = new Product(product);

      // Save the product
      productObj.save(function () {
        // Request products
        request(app).get('/api/products')
          .end(function (req, res) {
            // Set assertion
            res.body.should.be.instanceof(Array).and.have.lengthOf(1);

            // Call the assertion callback
            done();
          });

      });
    });

    //Test # 3 to see if you can create products without being signed in.
    it('Should not be able to create a product without being signed in', function(done){
        agent.post('/api/products')
            .send(product)
            .expect(403)
            .end(done);
    });

    //Test #4 stest to see that a product is saved when signed in as an admin
    it('should be able to save a product if logged in as an admin', function (done) {
      //note our user was created with admin as its roles attribute
      agent.post('/api/auth/signin')
        .send(credentials)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Save a new product
          agent.post('/api/products')
            .send(product)
            .expect(200)
            .end(function (productSaveErr, productSaveRes) {
              // Handle product save error
              if (productSaveErr) {
                return done(productSaveErr);
              }

              // Get a list of products
              agent.get('/api/products')
                .end(function (productsGetErr, productsGetRes) {
                  // Handle products save error
                  if (productsGetErr) {
                    return done(productsGetErr);
                  }

                  // Get products list
                  var products = productsGetRes.body;

                  // Set assertions
                  (products[0].proTitle).should.match('test product');

                  // Call the assertion callback
                  done();
                });
            });
        });
    });


    //Test # 5 to see if you can create products when signed in as a free user.
    it('Should not be able to create a product when signed in a free user', function(done){
      user.roles = ['freeUser']; //we change our user role to freeUser and save
      user.save(function () {
      agent.post('/api/auth/signin')
          .send(credentials)
          .expect(200)
          .end(function (signinErr, signinRes) {
            // Handle signin error
            if (signinErr) {
              return done(signinErr);
            }
              //attempt to save a product
              agent.post('/api/products')
                  .send(product)
                  .expect(403)
                  .end(function (err, res) {
                      if (err) {
                          return done(err);
                      }

                      should(res).be.ok();
                      done();
                  });

              });
        });
    });

    //Test # 6 to see is a product can be saved without a title
    it('should not be able to save an product if no title is provided', function (done) {
      // Invalidate title field
      product.proTitle = '';

      agent.post('/api/auth/signin')
        .send(credentials)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Save a new product
          agent.post('/api/products')
            .send(product)
            .expect(400)
            .end(function (productSaveErr, productSaveRes) {
              // Set message assertion
              (productSaveRes.body.message).should.match('Product must have a name');

              // Handle product save error
              done(productSaveErr);
            });
        });
    });

    //Test # 7 to see is a product can be saved without a short description
    it('should not be able to save an product if no shortDes is provided', function (done) {
      // Invalidate field
      product.shortDes = '';

      agent.post('/api/auth/signin')
        .send(credentials)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Save a new product
          agent.post('/api/products')
            .send(product)
            .expect(400)
            .end(function (productSaveErr, productSaveRes) {
              // Set message assertion
              (productSaveRes.body.message).should.match('Product must have a short description');

              // Handle product save error
              done(productSaveErr);
            });
        });
    });

    //Test # 8 to see is a product can be saved without a long description
    it('should not be able to save an product if no longDes is provided', function (done) {
      // Invalidate field
      product.longDes = '';

      agent.post('/api/auth/signin')
        .send(credentials)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Save a new product
          agent.post('/api/products')
            .send(product)
            .expect(400)
            .end(function (productSaveErr, productSaveRes) {
              // Set message assertion
              (productSaveRes.body.message).should.match('Product must have a long description');

              // Handle product save error
              done(productSaveErr);
            });
        });
    });


    //After each test say you're done.
    afterEach(function (done) {
        User.remove().exec(function () {
          Product.remove().exec(done);
        });

    });
});
