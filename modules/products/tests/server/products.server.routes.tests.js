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

    //Test # 1 to see if you can access the products without being signed in as a user.
    it('Should attempt to access products without being signed in', function(done){
        agent.get('/api/products')
            .expect(200)
            .end(done);
    });

    //Test # 2 to see if you can create products without being signed in.
    it('Should expect forbidden when creating a product without being signed in', function(done){
        agent.post('/api/products')
            .send(product)
            .expect(403)
            .end(done);
    });

    //Test # 3 to see if you can create products when signed in as an admin.
    it('Should be able to create a product when signed in as an admin', function(done){
      //user.roles = ['admin'];
      //user.save(function () {
      agent.post('/api/auth/signin')
          .send(credentials)
          .expect(200)
          .end(function (signinErr, signinRes) {
            // Handle signin error
            if (signinErr) {
              return done(signinErr);
            }

              agent.post('/api/products')
                  .send(product)
                  .expect(200)
                  .end(function (err, res) {
                      if (err) {
                          return done(err);
                      }

                      should(res).be.ok();
                      done();
                  });
          });

      //  });

    });

    //Test # 4 to see if you can create products when signed in as a free user.
  /*  it('Should not be able to create a product when signed in a free user', function(done){
      user.roles = ['freeUser'];
      user.save(function () {
      agent.post('/api/auth/signin')
          .send(credentials)
          .expect(200)
          .end(function (signinErr, signinRes) {
            // Handle signin error
            if (signinErr) {
              return done(signinErr);
            }

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
    });*/


    //After each test say you're done.
    afterEach(function (done) {
        done();
    });
});
