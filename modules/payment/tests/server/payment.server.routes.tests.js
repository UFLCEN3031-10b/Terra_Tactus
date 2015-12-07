'use strict';

var should = require('should'),
    request = require('supertest'),
    path = require('path'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Order = mongoose.model('Order'),
    Product = mongoose.model('Product'),
    express = require(path.resolve('./config/lib/express'));

var app, agent, credentials, user, order, product;

describe('Payment CRUD tests', function () {
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

        order = new Order({
            user: user._id,
            cart: [],
            paypal_create_res: [],
            paypal_get_res: [],
            paypal_execute_res: [],
            open: true
        });

        product = new Product({
            proTitle: 'test product',
            shortDes: 'description',
            indvPrice: '1.00',
            eduPrice: '2.00',
            wholePrice: '3.00'
        });

        user.save(function () {
            order.save(function () {
                product.save(done);
            });
        });
    });

    it('should not list orders when not logged in', function (done) {
        agent.get('/api/order/list')
            .expect(400)
            .end(done);
    });

    it('should list orders when logged in', function (done) {
        agent.post('/api/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function (signinErr, signinRes) {
                if (signinErr) {
                    return done(signinErr);
                }

                agent.get('/api/order/list')
                    .expect(200)
                    .end(done);
            });
    });

    it('should return 400 when cart is empty', function (done) {
        agent.post('/api/order')
            .expect(400)
            .end(done);
    });

    it('should return 400 when quantity is 0 for all products in cart', function (done) {
        agent.post('/api/cart/product/' + product._id)
            .expect(200)
            .end(function () {
                agent.post('/api/order')
                    .expect(400)
                    .end(function () {
                        agent.delete('/api/cart')
                            .expect(200)
                            .end(done);
                    });
            });
    });

    it('should return a redirect url when cart has an item', function (done) {
        agent.post('/api/cart/product/' + product._id)
            .send({ quantity: 1 })
            .expect(200)
            .end(function () {
                agent.post('/api/order')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }

                        should(JSON.parse(res.text)).have.property('redirect_url');

                        done();
                    });
            });
    });

    it('should be able to close an order', function (done) {
        agent.delete('/api/order/close/' + order._id)
            .expect(200)
            .end(done);
    });

    it('should not close an order if the order is not open', function (done) {
        order.open = false;
        order.save(function () {
            agent.delete('/api/order/close/' + order._id)
                .expect(400)
                .end(done);
        });
    });

    it('should cancel an order when the api is called', function (done) {
        agent.get('/api/order/cancel/' + order._id)
            .expect(302)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }

                should(res.header.location).equal('/cart');
                done();
            });
    });

    it('should return the order information when the order is open', function (done) {
        agent.get('/api/order/find/' + order._id)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }

                should(JSON.parse(res.text)).have.property('_id');
                done();
            });
    });

    it('should not return order information when the order is closed', function (done) {
        order.open = false;
        order.save(function (err) {
            agent.get('/api/order/find/' + order._id)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }

                    should(JSON.parse(res.text)).not.be.ok();
                    done();
                });
        });
    });

    afterEach(function (done) {
        User.remove().exec(function () {
            Order.remove().exec(function () {
                Product.remove().exec(done);
            });
        });
    });
});
