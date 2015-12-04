'use strict';

var should = require('should'),
    request = require('supertest'),
    path = require('path'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Product = mongoose.model('Product'),
    express = require(path.resolve('./config/lib/express'));

var app, agent, credentials, user, product;

describe('Cart CRUD tests', function () {
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
            provider: 'local'
        });

        product = new Product({
            proTitle: 'test product',
            shortDes: 'description',
            indvPrice: '1.00',
            eduPrice: '2.00',
            wholePrice: '3.00'
        });

        user.save(function () {
            product.save(done);
        });
    });

    it('should allow you to add a product when not logged in', function (done) {
        agent.post('/api/cart/product/' + product._id)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }

                should(res).be.ok();
                done();
            });
    });

    it('should allow you to add a product when logged in', function (done) {
        agent.post('/api/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function () {
                agent.post('/api/cart/product/' + product._id)
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

    it('should respond with the length of the cart', function (done) {
        agent.get('/api/cart/length')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }

                should(JSON.parse(res.text)).have.property('length');
                done();
            });
    });

    afterEach(function (done) {
        User.remove().exec(function () {
            Product.remove().exec(function () {
                agent.delete('/api/cart')
                    .expect(200)
                    .end(done);
            });
        });
    });
});
