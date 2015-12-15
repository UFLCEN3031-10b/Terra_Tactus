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
    it('should not be able to save a product if no title is provided', function (done) {
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
    it('should not be able to save a product if no shortDes is provided', function (done) {
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
    it('should not be able to save a product if no longDes is provided', function (done) {
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

    //Test # 9 to see is a product can be saved without an individual price
    it('should not be able to save a product if no indvPrice is provided', function (done) {
      // Invalidate field
      product.indvPrice = '';

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
              (productSaveRes.body.message).should.match('Product must have an individual price');

              // Handle product save error
              done(productSaveErr);
            });
        });
    });

    //Test # 10 to see is a product can be saved without an educational price
    it('should not be able to save a product if no eduPrice is provided', function (done) {
      // Invalidate field
      product.eduPrice = '';

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
              (productSaveRes.body.message).should.match('Product must have an educational price');

              // Handle product save error
              done(productSaveErr);
            });
        });
    });

    //Test # 11 to see is a product can be saved without a whoslesale price
    it('should not be able to save a product if no wholePrice is provided', function (done) {
      // Invalidate field
      product.wholePrice = '';

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
              (productSaveRes.body.message).should.match('Product must have a wholesale price');

              // Handle product save error
              done(productSaveErr);
            });
        });
    });

    //Test #12 to see that you can update a product if signed in as admin
    it('should be able to update a product if signed in as admin', function (done) {
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

              // Update product title
              product.proTitle = 'WHY YOU GOTTA BE SO MEAN?';

              // Update an existing product
              agent.put('/api/products/' + productSaveRes.body._id)
                .send(product)
                .expect(200)
                .end(function (productUpdateErr, productUpdateRes) {
                  // Handle product update error
                  if (productUpdateErr) {
                    return done(productUpdateErr);
                  }

                  // Set assertions
                  (productUpdateRes.body._id).should.equal(productSaveRes.body._id);
                  (productUpdateRes.body.proTitle).should.match('WHY YOU GOTTA BE SO MEAN?');

                  // Call the assertion callback
                  done();
                });
            });
        });
    });

    //Test #13 to see that you can get a single product when not signed in
    it('should be able to get a single product if not signed in', function (done) {
      // Create new product model instance
      var productObj = new Product(product);

      // Save the product
      productObj.save(function () {
        request(app).get('/api/products/' + productObj._id)
          .end(function (req, res) {
            // Set assertion
            res.body.should.be.instanceof(Object).and.have.property('proTitle', product.proTitle);

            // Call the assertion callback
            done();
          });
      });
    });

    // Test #14 to see if a proper error is returned for a single product with a bad id
    it('should return proper error for single product with an invalid Id, if not signed in', function (done) {
      // test is not a valid mongoose Id
      request(app).get('/api/products/test')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('message', 'Product is invalid');

          // Call the assertion callback
          done();
        });
    });

    //Test #15 error for a single product with a valid id but that does not exist
    it('should return proper error for single product which doesnt exist, if not signed in', function (done) {
      // This is a valid mongoose Id but a non-existent product
      request(app).get('/api/products/559e9cd815f80b4c256a8f41')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('message', 'No product with that identifier has been found');

          // Call the assertion callback
          done();
        });
    });

    //Test #16 to see that we can delete a product when signed in as an admin
    it('should be able to delete a product if signed in as admin', function (done) {
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

              // Delete an existing product
              agent.delete('/api/products/' + productSaveRes.body._id)
                .send(product)
                .expect(200)
                .end(function (productDeleteErr, productDeleteRes) {
                  // Handle product error error
                  if (productDeleteErr) {
                    return done(productDeleteErr);
                  }

                  // Set assertions
                  (productDeleteRes.body._id).should.equal(productSaveRes.body._id);

                  // Call the assertion callback
                  done();
                });
            });
        });
    });

    //Test #17 to see that a product cannot be deleted if not signed in
    it('should not be able to delete a product if not signed in', function (done) {
      // Set product user
      product.user = user;

      // Create new product model instance
      var productObj = new Product(product);

      // Save the product
      productObj.save(function () {
        // Try deleting product
        request(app).delete('/api/products/' + productObj._id)
          .expect(403)
          .end(function (productDeleteErr, productDeleteRes) {
            // Set message assertion
            (productDeleteRes.body.message).should.match('User is not authorized');

            // Handle product error error
            done(productDeleteErr);
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
