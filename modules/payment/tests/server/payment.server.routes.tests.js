'use strict';

var should = require('should'),
    request = require('supertest'),
    path = require('path'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Order = mongoose.model('Order'),
    express = require(path.resolve('./config/lib/express'));

var app, agent, credentials, user, order;

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

        user.save(function () {
            done();
        });
    });

    it('should list orders for a user', function (done) {
        agent.get('/api/order/list')
            .expect(200);
    });

    afterEach(function (done) {
        User.remove().exec(done);
    });
});
