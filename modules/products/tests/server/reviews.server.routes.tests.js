'use strict';

var should = require('should'),
    request = require('supertest'),
    path = require('path'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Product = mongoose.model('Product'),
    express = require(path.resolve('./config/lib/express'));

var app, agent, credentials, user, product;

describe('Reviews CRUD tests', function () {
    before(function (done) {
        app = express.init(mongoose);
        agent = request.agent(app);

        done();
    });

    beforeEach(function (done) {
        credentials = {
            username: 'username4tests',
            password: 'M3@n.jsI$Aw3$0m3'
        };

        user = new User({
            firstName: 'firstName',
            lastName: 'lastName',
            displayName: 'firstName lastName',
            email: 'test@test.com',
            username: credentials.username,
            password: credentials.password,
            roles: ["freeUser"],
            provider: 'local'
        });

        product = new Product({
            proTitle: 'test product',
            shortDes: 'description',
            longDes: 'long description',
            indvPrice: '1.00',
            eduPrice: '2.00',
            wholePrice: '3.00',
            //longDes: 'this is a long description!',
            reviews: {
              username: 'username',
              userPicture: 'example_picture',
              verified: false,
              review: 'this_is_a_test_review',
              rating: 3
            }
        });

        user.save(function () {
            product.save(function () {
              done();
            });
        });
    });

    it('should get a list of reviews', function (done) {
        agent.get('/api/products/' + product._id)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }

                // Get articles list
                var reviews = res.body.reviews;

                // Set assertions
                (reviews[0].username).should.equal('username');
                (reviews[0].userPicture).should.equal('example_picture');
                (reviews[0].verified).should.equal(false);
                (reviews[0].review).should.equal('this_is_a_test_review');
                (reviews[0].rating).should.equal(3);
                done();
            });
    });

    it('should be able to post a review when logged in', function (done) {
      agent.post('/api/auth/signin')
          .send(credentials)
          .expect(200)
          .end(function () {
              agent.put('/api/reviews/products/' + product._id)
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
    });

    it('should return an error when trying to post a review when not logged in', function (done) {
        agent.put('/api/reviews/products/' + product._id)
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

    it('should not change anything but the reviews when submitting', function (done) {
        var mockProduct = {
            username: 'username1',
            userPicture: 'example_picture1',
            verified: false,
            review: 'this_is_a_test_review1',
            rating: 3
        };
        product.reviews.push(mockProduct);
        product.proTitle = 'changed!';
        agent.post('/api/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function () {
                agent.put('/api/reviews/products/' + product._id)
                    .send(product)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        agent.get('/api/products/' + product._id)
                            .expect(200)
                            .end(function (err, res) {
                                if (err) {
                                    return done(err);
                                }

                                // Get articles list
                                var reviews = res.body.reviews;
                                var product = res.body;

                                // Set assertions
                                (product.username).should.equal('test product');
                                (reviews[1].username).should.equal('username');
                                (reviews[1].userPicture).should.equal('example_picture');
                                (reviews[1].verified).should.equal(false);
                                (reviews[1].review).should.equal('this_is_a_test_review');
                                (reviews[1].rating).should.equal(3);
                            });
                    });
              });
          done();
    });

    afterEach(function (done) {
      User.remove().exec(function () {
        Product.remove().exec(done);
      });
    });
});
