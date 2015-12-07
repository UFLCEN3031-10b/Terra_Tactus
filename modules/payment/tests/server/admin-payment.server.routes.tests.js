'use strict';

var should = require('should'),
    request = require('supertest'),
    path = require('path'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Order = mongoose.model('Order'),
    express = require(path.resolve('./config/lib/express'));

var app, agent, credentials, user, order;

describe('Admin Payment CRUD tests', function () {
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
            provider: 'local',
            roles: [ "admin" ]
        });

        order = new Order({
            cart: [],
            paypal_create_res: [],
            paypal_get_res: [],
            paypal_execute_res: [],
            open: true
        });

        user.save(function () {
            order.save(done);
        });
    });

    it('should not be able to get the list when not logged in to an admin acc', function (done) {
        agent.get('/api/order/adminctl')
            .expect(403)
            .end(done);
    });

    it('should be able to get the list as an admin', function (done) {
        agent.post('/api/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function (signinErr, signinRes) {
                if (signinErr) {
                    return done(signinErr);
                }

                agent.get('/api/order/adminctl')
                    .expect(200)
                    .end(done);
            });
    });

    it('should not update when not an admin', function (done) {
        agent.put('/api/order/adminctl/' + order._id)
            .expect(403)
            .end(done);
    });

    it('should update when on an admin acc', function (done) {
        agent.post('/api/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function (signinErr, signinRes) {
                if (signinErr) {
                    return done(signinErr);
                }

                agent.put('/api/order/adminctl/' + order._id)
                    .send({ newStatus: 'new status' })
                    .expect(200)
                    .end(function () {
                        agent.get('/api/order/adminctl')
                            .expect(200)
                            .end(done);
                    });
            });
    });

    afterEach(function (done) {
        User.remove().exec(function () {
            Order.remove().exec(done);
        });
    });
});
